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
import { Row, Col } from "antd";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import "react-phone-input-2/lib/style.css";
import { SideNavigation } from "../../components/Navigation";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { CSVReader } from "react-papaparse";
import csv from "csv";
import Dropzone from "react-dropzone";

const { Dragger } = Upload;

const UploadCsv = () => {
  const buttonRef = React.createRef();
  const { Title, Text } = Typography;
  const [tableData, setTableData] = useState([]);

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  const handleOnDrop = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");

    var itemList = [];

    data.forEach((item, index) => {
      const license_no = item.data[0];
      const doctor_last_name = item.data[1];
      const doctor_first_name = item.data[2];
      const patient_last_name = item.data[3];
      const patient_first_name = item.data[4];
      const date_of_purchased = item.data[5];
      const items_purchased = item.data[6];
      const amount = item.data[7];
      const newRecord = {
        license_no,
        doctor_first_name,
        doctor_last_name,
        patient_first_name,
        patient_last_name,
        date_of_purchased,
        items_purchased,
        amount,
      };

      itemList.push(newRecord);
    });
    setTableData(itemList.slice(1));
    console.log(itemList.slice(1));
  };

  const columns = [
    {
      title: "License No",
      dataIndex: "license_no",
      key: "license_no",
    },
    {
      title: "Doctor Last Name",
      dataIndex: "doctor_last_name",
      key: "doctor_last_name",
    },
    {
      title: "Doctor First Name",
      dataIndex: "doctor_first_name",
      key: "doctor_first_name",
    },
    {
      title: "Patient Last Name",
      dataIndex: "patient_last_name",
      key: "patient_last_name",
    },
    {
      title: "Patient First Name",
      dataIndex: "patient_first_name",
      key: "patient_first_name",
    },
    {
      title: "Date of Purchased",
      dataIndex: "date_of_purchased",
      key: "date_of_purchased",
    },
    {
      title: "Items Purchased",
      dataIndex: "items_purchased",
      key: "items_purchased",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  return (
    <div className="home-container">
      <SideNavigation />
      <div style={{ width: "100%", marginLeft: "1em" }}>
        <div style={{ width: "100%", maxWidth: "300px" }}>
          <Title level={5}>Upload CSV</Title>
          <CSVReader
            onDrop={handleOnDrop}
            onError={handleOnError}
            addRemoveButton
            removeButtonColor="#659cef"
            onRemoveFile={handleOnRemoveFile}
          >
            <span>Drop CSV file here or click to upload.</span>
          </CSVReader>
          {tableData.length ? (
            <Button style={{ margin: "1em" }} type="primary">
              Upload to Database
            </Button>
          ) : null}
        </div>
        <Table columns={columns} dataSource={tableData} />
      </div>
    </div>
  );
};

export default UploadCsv;
