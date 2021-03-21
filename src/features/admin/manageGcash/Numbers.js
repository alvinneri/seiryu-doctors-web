import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNumbers } from "../../../store/admin/actions";
import { db } from "../../../firebase/config";
import { List, Typography, Divider } from "antd";
import UpdateNumbers from "./UpdateNumbers";

const Numbers = () => {
  const dispatch = useDispatch();
  const { numbers } = useSelector((state) => state.admin);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [visible, setVisible] = useState(false);

  const getNumbers = async () => {
    const numbersRef = await db.collection("gcash_numbers");
    const unsubcribed = numbersRef.onSnapshot((snapshot) => {
      let _numbers = [];
      snapshot.forEach((doc) => {
        let docs = {
          ...doc.data(),
          id: doc.id,
        };

        _numbers.push(docs);
      });
      dispatch(setNumbers(_numbers));
    });
    return unsubcribed;
  };

  useEffect(() => {
    getNumbers();
  }, []);

  const Item = ({ item }) => {
    return (
      <div>
        <List.Item
          className="category-list-item"
          onClick={() => {
            setVisible(true);
            setSelectedNumber(item);
          }}
        >
          <div>
            <p>{`Name: ${item.name}`}</p>
            <p>{`Phone: ${item.phoneNumber}`}</p>
          </div>
        </List.Item>
        <Divider />
      </div>
    );
  };

  return (
    <div>
      <UpdateNumbers
        visible={visible}
        setVisible={setVisible}
        item={selectedNumber}
      />
      <List
        size="small"
        header={<h3>List Of Numbers</h3>}
        bordered
        dataSource={numbers}
        renderItem={(item) => <Item item={item} />}
      />
    </div>
  );
};

export default Numbers;
