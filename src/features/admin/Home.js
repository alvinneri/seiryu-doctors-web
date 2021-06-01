import React, { useState } from "react";
import {
  Input,
  Button,
  Form,
  Typography,
  Checkbox,
  DatePicker,
  Table,
  Modal,
} from "antd";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/seiryulogo.jpeg";
import { Row, Col } from "antd";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import "react-phone-input-2/lib/style.css";
import { useHistory } from "react-router";
import { setUser } from "../../store/public/actions";
import { usePagination } from "use-pagination-firestore";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

const Home = () => {
  const { Title, Text } = Typography;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const history = useHistory();
  const userRef = db.collection("users");
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const reset = () => {
    setFirstName("");
    setLastName("");
  };

  const { items, isLoading, isStart, isEnd, getPrev, getNext } = usePagination(
    db.collection("medical-reps").orderBy("dateAdded", "desc"),
    {
      limit: 10,
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      toast.error("First Name and Last Name are required.");
      return;
    }

    let randomNum = Math.floor(1000 + Math.random() * 9000);

    let values = {
      firstName: firstName,
      lastName: lastName,
      dateAdded: new Date(),
      uid: `${lastName}-${randomNum}`,
    };

    db.collection("medical-reps")
      .add({
        ...values,
      })
      .then(() => {
        toast.success("Medical Representative Succefully Added.");
        reset();
        setVisible(false);
      });
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Id",
      dataIndex: "uid",
      key: "uid",
    },
  ];

  return (
    <div className="home-container">
      <div style={{ width: "100%", maxWidth: "300px" }}>
        <Title level={5}>Medical Representatives</Title>
        <Button
          type="danger"
          onClick={() => {
            setVisible(true);
          }}
          style={{ width: "100%", margin: "0em 0" }}
        >
          ADD MED REP
        </Button>
        <Modal
          title="ADD MEDICAL REPRESENTATIVE"
          visible={visible}
          onOk={onSubmit}
          onCancel={() => setVisible(false)}
        >
          <Form style={{ marginTop: "1em" }}>
            <Row>
              <Col span={24}>
                <Form.Item>
                  <Input
                    placeholder="First Name"
                    value={firstName}
                    onChange={(text) => setFirstName(text.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(text) => setLastName(text.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
      <Table columns={columns} dataSource={items} />
      <div
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          margin: "1em",
        }}
      >
        <Button onClick={getPrev} disabled={isStart}>
          PREV <LeftOutlined />
        </Button>
        <Button onClick={getNext} disabled={isEnd}>
          NEXT <RightOutlined />
        </Button>
      </div>
    </div>
  );
};

export default Home;
