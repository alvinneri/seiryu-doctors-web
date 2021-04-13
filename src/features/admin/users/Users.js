import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { setUsers } from "../../../store/admin/actions";
import { db } from "../../../firebase/config";
import { List, Typography, Divider, Input, Button, Form } from "antd";
import UpdateCategories from "./UpdateUsers";
import { USER_TYPES } from "../../../app/common/constants/usertypes";
import { usePagination } from "use-pagination-firestore";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

const Categories = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const [selectedUser, setSelectedUser] = useState("");
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");

  const { items, isLoading, isStart, isEnd, getPrev, getNext } = usePagination(
    db.collection("users").orderBy("credits", "desc"),
    {
      limit: 10,
    }
  );

  const _search = async () => {
    const usersRef = await db.collection("users").where("email", "==", name);
    const unsubcribed = usersRef.onSnapshot((snapshot) => {
      let _users = [];
      snapshot.forEach((doc) => {
        if (doc.data().userType !== USER_TYPES.ADMIN) {
          let docs = {
            ...doc.data(),
            id: doc.id,
          };

          _users.push(docs);
        }
      });
      console.log(_users);
      dispatch(setUsers(_users));
    });
    return unsubcribed;
  };

  // const getUsers = async () => {
  //   const usersRef = await db.collection("users");
  //   const unsubcribed = usersRef.onSnapshot((snapshot) => {
  //     let _users = [];
  //     snapshot.forEach((doc) => {
  //       if (doc.data().userType !== USER_TYPES.ADMIN) {
  //         let docs = {
  //           ...doc.data(),
  //           id: doc.id,
  //         };

  //         _users.push(docs);
  //       }
  //     });
  //     console.log(_users);
  //     dispatch(setUsers(_users));
  //   });
  //   return unsubcribed;
  // };

  useEffect(() => {
    dispatch(setUsers(items));
  }, [items]);

  const Item = ({ item }) => {
    return (
      <div>
        <List.Item
          className="category-list-item"
          onClick={() => {
            setVisible(true);
            setSelectedUser(item);
          }}
        >
          <div>
            <p>{`Name: ${item.name}`}</p>
            <p>{`Email: ${item.email}`}</p>
            <p>{`Credits: ${item.credits}`}</p>
            <p>{`Usertype: ${item.userType}`}</p>
          </div>
        </List.Item>
        <Divider />
      </div>
    );
  };

  const search = () => {
    if (!name) {
      dispatch(setUsers(items));
      return;
    }
    _search();
  };

  return (
    <div>
      <UpdateCategories
        visible={visible}
        setVisible={setVisible}
        item={selectedUser}
      />
      <Form onSubmit={search}>
        <Form.Item>
          <Input
            placeholder="Email of User"
            value={name}
            onChange={(text) => setName(text.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={search}>
            SEARCH
          </Button>
        </Form.Item>
      </Form>
      <List
        size="small"
        header={<h3>List Of Users</h3>}
        bordered
        dataSource={users}
        renderItem={(item) => <Item item={item} />}
      />
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

export default Categories;
