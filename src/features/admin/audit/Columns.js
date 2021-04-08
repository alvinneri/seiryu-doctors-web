import { Space } from "antd";
import moment from "moment";
export const columns = [
  {
    title: "Match Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Match Number",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text) => (
      <p>{moment(text.toDate()).format("MMM-DD-YYYY H:MM A")}</p>
    ),
  },
  {
    title: "Total Bets Wala",
    dataIndex: "wala",
    key: "wala",
    render: (wala) => <p>{wala.totalBets}</p>,
  },
  {
    title: "Total Bets Meron",
    dataIndex: "meron",
    key: "meron",
    render: (meron) => <p>{meron.totalBets}</p>,
  },
  {
    title: "Total Bets Draw",
    dataIndex: "draw",
    key: "draw",
    render: (draw) => <p>{draw?.totalBets}</p>,
  },
  {
    title: "Total Bets",
    dataIndex: "totalBets",
    key: "totalBets",
  },
  {
    title: "Result",
    dataIndex: "result",
    key: "result",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a>FIX</a>
      </Space>
    ),
  },
];
