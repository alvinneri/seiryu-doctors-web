import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBanks } from "../../../store/admin/actions";
import { db } from "../../../firebase/config";
import { List, Typography, Divider } from "antd";
import UpdateBanks from "./UpdateBanks";

const Banks = () => {
  const dispatch = useDispatch();
  const { banks } = useSelector((state) => state.admin);
  const [selectedBank, setSelectedBank] = useState("");
  const [visible, setVisible] = useState(false);

  const getBanks = async () => {
    const banksRef = await db.collection("banks");
    const unsubcribed = banksRef.onSnapshot((snapshot) => {
      let _banks = [];
      snapshot.forEach((doc) => {
        let docs = {
          ...doc.data(),
          id: doc.id,
        };

        _banks.push(docs);
      });
      dispatch(setBanks(_banks));
    });
    return unsubcribed;
  };

  useEffect(() => {
    getBanks();
  }, []);

  const Item = ({ item }) => {
    return (
      <div>
        <List.Item
          className="category-list-item"
          onClick={() => {
            setVisible(true);
            setSelectedBank(item);
          }}
        >
          <div>
            <p>{`Bank: ${item.bank}`}</p>
            <p>{`Account Number: ${item.accountNumber}`}</p>
            <p>{`Account Name: ${item.name}`}</p>
          </div>
        </List.Item>
        <Divider />
      </div>
    );
  };

  return (
    <div>
      <UpdateBanks
        visible={visible}
        setVisible={setVisible}
        item={selectedBank}
      />
      <List
        size="small"
        header={<h3>List Of Banks</h3>}
        bordered
        dataSource={banks}
        renderItem={(item) => <Item item={item} />}
      />
    </div>
  );
};

export default Banks;
