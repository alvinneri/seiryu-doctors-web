import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setUsers } from "../../../store/admin/actions";
import { db } from "../../../firebase/config";
import { List, Typography, Divider } from "antd";
import UpdateCategories from "./UpdateUsers";
import { USER_TYPES } from "../../../app/common/constants/usertypes";

const Categories = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const [selectedUser, setSelectedUser] = useState("");
  const [visible, setVisible] = useState(false);

  const getUsers = async () => {
    const usersRef = await db.collection("users");
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

  useEffect(() => {
    getUsers();
  }, []);

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
            <p>{`Usertype: ${item.userType}`}</p>
          </div>
        </List.Item>
        <Divider />
      </div>
    );
  };

  return (
    <div>
      <UpdateCategories
        visible={visible}
        setVisible={setVisible}
        item={selectedUser}
      />
      <List
        size="small"
        header={<h3>List Of Users</h3>}
        bordered
        dataSource={users}
        renderItem={(item) => <Item item={item} />}
      />
    </div>
  );
};

export default Categories;
