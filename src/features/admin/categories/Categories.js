import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../../store/admin/actions";
import { db } from "../../../firebase/config";
import { List, Typography, Divider } from "antd";
import UpdateCategories from "./UpdateCategories";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.admin);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visible, setVisible] = useState(false);

  const getCategories = async () => {
    const categoriesRef = await db.collection("categories");
    const unsubcribed = categoriesRef.onSnapshot((snapshot) => {
      let _categories = [];
      snapshot.forEach((doc) => {
        let docs = {
          ...doc.data(),
          id: doc.id,
        };

        _categories.push(docs);
      });
      dispatch(setCategories(_categories));
    });
    return unsubcribed;
  };

  useEffect(() => {
    getCategories();
  }, []);

  const Item = ({ item }) => {
    return (
      <div>
        <List.Item
          className="category-list-item"
          onClick={() => {
            setVisible(true);
            setSelectedCategory(item);
          }}
        >
          <div>
            <p>{`Name: ${item.name}`}</p>
            <p>{`Youtube Url: ${item.url}`}</p>
            <p>{`Twitch Url: ${item?.twitchUrl ? item?.twitchUrl : "None"}`}</p>
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
        item={selectedCategory}
      />
      <List
        size="small"
        header={<h3>List Of Categories</h3>}
        bordered
        dataSource={categories}
        renderItem={(item) => <Item item={item} />}
      />
    </div>
  );
};

export default Categories;
