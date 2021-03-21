import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../../store/loader/actions";
import { db } from "../../../firebase/config";
import { List, Divider, Typography } from "antd";
import { USER_TYPES } from "../../../app/common/constants/usertypes";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const [selectedUser, setSelectedUser] = useState("");
  const [visible, setVisible] = useState(false);

  const getUsers = async () => {
    const usersRef = await db.collection("users");
    const unsubcribed = usersRef.onSnapshot((snapshot) => {
      let _users = [];
      snapshot.forEach((doc) => {
        if (doc.data().userType === USER_TYPES.USER) {
          let docs = {
            ...doc.data(),
            id: doc.id,
          };

          _users.push(docs);
        }
      });
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
          className="users-list-item"
          onClick={() => {
            setVisible(true);
            setSelectedUser(item);
          }}
        >
          <div>
            <Typography>Name: {item?.name}</Typography>
            <Typography>Email: {item?.email}</Typography>
            <Typography>
              Phone Number: {item?.phoneNumber ? item?.phoneNumber : ""}
            </Typography>

            <Typography>
              Credits: {item?.credits ? item?.credits : ""}
            </Typography>
          </div>
        </List.Item>
        <Divider />
      </div>
    );
  };

  return (
    <div>
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

export default UsersList;
