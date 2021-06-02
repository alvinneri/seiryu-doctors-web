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
import { SideNavigation } from "../../components/Navigation";

const Doctors = () => {
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
    db.collection("users").orderBy("lastName", "desc"),
    {
      limit: 10,
    }
  );

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      responsive: ["sm"],
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      responsive: ["sm"],
    },
    {
      title: "Birthdate",
      dataIndex: "birthdate",
      key: "birthdate",
      responsive: ["sm"],
    },
    {
      title: "PRC No.",
      dataIndex: "prcNo",
      key: "prcNo",
      responsive: ["sm"],
    },
    {
      title: "Med Rep Id",
      dataIndex: "medId",
      key: "medId",
      responsive: ["sm"],
    },
  ];

  return (
    <div className="home-container">
      <SideNavigation />
      <div style={{ width: "100%", marginLeft: "1em" }}>
        <div style={{ width: "100%", maxWidth: "300px" }}>
          <Title level={5}>List Of Doctors</Title>
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
    </div>
  );
};

export default Doctors;
