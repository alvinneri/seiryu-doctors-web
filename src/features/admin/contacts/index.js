import React, { useEffect, useState } from "react";
import { Layout, Row, Menu, Form, Input, Button, Typography } from "antd";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
const { Header, Content, Sider } = Layout;

export const ContactsPage = () => {
  const [appPercentage, setAppPercentage] = useState(0);
  const [betLimits, setBetLimits] = useState(10000);
  const [betMin, setBetMin] = useState(100);
  const [id, setDocId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [drawMultiplier, setDrawMultplier] = useState("");
  const [content, setContent] = useState(EditorState.createEmpty());

  const onSubmit = async () => {
    setSubmitting(true);
    if (!content) {
      toast.error("Write some content");
      setSubmitting(false);
      return;
    }

    const rawContentState = convertToRaw(content.getCurrentContent());

    const markup = draftToHtml(rawContentState);

    if (id) {
      const appSettingRef = db.collection("contacts_page").doc(id).update({
        content: markup,
      });
    } else {
      const contactsRef = db.collection("contacts_page").add({
        content: markup,
      });
    }

    toast.success("Contact Page Successfully Updated");
    setSubmitting(false);
  };

  const getContactsPage = async () => {
    const contactsRef = db.collection("contacts_page");
    const unsubscribe = contactsRef.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const blocksFromHtml = htmlToDraft(doc.data().content);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        const editorState = EditorState.createWithContent(contentState);

        setContent(editorState);
        setDocId(doc.id);
      });
    });

    return unsubscribe;
  };

  useEffect(() => {
    getContactsPage();
  }, []);

  return (
    <Layout style={{ height: "100%" }}>
      <Header>
        <Typography style={{ color: "#ffffff" }}>
          Application Settings
        </Typography>
      </Header>
      <Layout>
        <Content
          style={{ margin: "24px 16px 0", height: "80vh", overflow: "scroll" }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, height: "100%", overflow: "scroll" }}
          >
            <Form>
              <Editor
                editorState={content}
                onEditorStateChange={(text) => setContent(text)}
                style={{ height: "100%" }}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                }}
              />
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={onSubmit}
                  disabled={submitting ? true : false}
                >
                  UPDATE
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
