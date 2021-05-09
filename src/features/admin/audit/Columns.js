import React, { useState } from "react";
import { Space, Popconfirm, Button } from "antd";
import moment from "moment";

import { db } from "../../../firebase/config";
import { toast } from "react-toastify";

const getPayout = (appPercentage, totalBets, totalSides) => {
  if (!totalSides) {
    return 0;
  }
  const origMultiplier = (totalBets / totalSides) * 100;
  console.log(origMultiplier);
  const percent = appPercentage / 100;
  const afterCut = origMultiplier - origMultiplier * percent;

  const payout = (totalBets / 100) * afterCut;
  return afterCut.toFixed(2);
};

const updateResult = async (data, result) => {
  if (result === "MERON") {
    await data.meron.betters.forEach(async (item, index) => {
      const userRef = await db.collection("users").doc(item.user);
      const user = await userRef.get();
      const credits = user.data()?.credits ? user.data()?.credits : 0;

      await userRef.update({
        credits:
          credits +
          (getPayout(
            data.appPercentage,
            data?.meron?.totalBets + data?.wala?.totalBets,
            data?.meron?.totalBets
          ) /
            100) *
            item.amount,
      });
    });

    if (data.result === "WALA") {
      await data.wala.betters.forEach(async (item, index) => {
        const userRef = await db.collection("users").doc(item.user);
        const user = await userRef.get();
        const credits = user.data()?.credits ? user.data()?.credits : 0;

        await userRef.update({
          credits:
            credits -
            (getPayout(
              data.appPercentage,
              data?.meron?.totalBets + data?.wala?.totalBets,
              data?.wala?.totalBets
            ) /
              100) *
              item.amount,
        });
      });
    }

    if (data.result === "DRAW") {
      data.draw.betters.forEach(async (item) => {
        const userRef = await db.collection("users").doc(item.user);
        const user = await userRef.get();
        const credits = user.data()?.credits ? user.data()?.credits : 0;

        await userRef.update({
          credits: credits - data.drawMultiplier * item.amount,
        });
      });
    }
  } else if (result === "WALA") {
    data.wala.betters.forEach(async (item) => {
      const userRef = await db.collection("users").doc(item.user);
      const user = await userRef.get();
      const credits = user.data()?.credits ? user.data()?.credits : 0;

      await userRef.update({
        credits:
          credits +
          (getPayout(
            data.appPercentage,
            data?.meron?.totalBets + data?.wala?.totalBets,
            data?.wala?.totalBets
          ) /
            100) *
            item.amount,
      });
    });

    if (data.result === "DRAW") {
      data.draw.betters.forEach(async (item) => {
        const userRef = await db.collection("users").doc(item.user);
        const user = await userRef.get();
        const credits = user.data()?.credits ? user.data()?.credits : 0;

        await userRef.update({
          credits: credits - data.drawMultiplier * item.amount,
        });
      });
    }

    if (data.result === "MERON") {
      await data.meron.betters.forEach(async (item, index) => {
        const userRef = await db.collection("users").doc(item.user);
        const user = await userRef.get();
        const credits = user.data()?.credits ? user.data()?.credits : 0;

        await userRef.update({
          credits:
            credits -
            (getPayout(
              data.appPercentage,
              data?.meron?.totalBets + data?.wala?.totalBets,
              data?.meron?.totalBets
            ) /
              100) *
              item.amount,
        });
      });
    }
  } else if (result === "DRAW") {
    data.draw.betters.forEach(async (item) => {
      const userRef = await db.collection("users").doc(item.user);
      const user = await userRef.get();
      const credits = user.data()?.credits ? user.data()?.credits : 0;

      await userRef.update({
        credits: credits + data.drawMultiplier * item.amount,
      });
    });
  } else if (result === "DRAW") {
    data.draw.betters.forEach(async (item) => {
      const userRef = await db.collection("users").doc(item.user);
      const user = await userRef.get();
      const credits = user.data()?.credits ? user.data()?.credits : 0;

      await userRef.update({
        credits: credits - data.drawMultiplier * item.amount,
      });
    });

    data.wala.betters.forEach(async (item) => {
      const userRef = await db.collection("users").doc(item.user);
      const user = await userRef.get();
      const credits = user.data()?.credits ? user.data()?.credits : 0;

      await userRef.update({
        credits:
          credits -
          (getPayout(
            data.appPercentage,
            data?.meron?.totalBets + data?.wala?.totalBets,
            data?.wala?.totalBets
          ) /
            100) *
            item.amount,
      });
    });

    await data.meron.betters.forEach(async (item, index) => {
      const userRef = await db.collection("users").doc(item.user);
      const user = await userRef.get();
      const credits = user.data()?.credits ? user.data()?.credits : 0;

      await userRef.update({
        credits:
          credits -
          (getPayout(
            data.appPercentage,
            data?.meron?.totalBets + data?.wala?.totalBets,
            data?.meron?.totalBets
          ) /
            100) *
            item.amount,
      });
    });
  }

  const historyRef = db.collection("fights").doc(data.id).update({
    result: result,
  });

  toast.success("MATCH FIXED");
};

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
      <p>{moment(text.toDate()).format("MMM-DD-YYYY h:mm A")}</p>
    ),
  },
  {
    title: "PROCESSED CREDITS",
    dataIndex: "data",
    key: "data",
    render: (data) => <p>{data.isProcessed ? "TRUE" : "FALSE"}</p>,
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
    title: "FIX (WALA WINS)",
    dataIndex: "data",
    key: "data",
    render: (data, record) => {
      return (
        <Space size="middle">
          <Popconfirm
            disabled={data.result === "WALA" ? true : false}
            title="Do you want to fix this match?. "
            onConfirm={() => {
              updateResult(data, "WALA");
            }}
            onCancel={null}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              disabled={data.result === "WALA" ? true : false}
            >
              WALA
            </Button>
          </Popconfirm>
        </Space>
      );
    },
  },
  {
    title: "FIX (MERON WINS)",
    dataIndex: "data",
    key: "data",
    render: (data, record) => {
      return (
        <Space size="middle">
          <Popconfirm
            disabled={data.result === "MERON" ? true : false}
            title="Do you want to fix this match?. "
            onConfirm={() => {
              updateResult(data, "MERON");
            }}
            onCancel={null}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="danger"
              disabled={data.result === "MERON" ? true : false}
            >
              MERON
            </Button>
          </Popconfirm>
        </Space>
      );
    },
  },
  {
    title: "FIX (DRAW WINS)",
    dataIndex: "data",
    key: "data",
    render: (data, record) => {
      return (
        <Space size="middle">
          <Popconfirm
            disabled={data.result === "DRAW" ? true : false}
            title="Do you want to fix this match?. "
            onConfirm={() => {
              updateResult(data, "DRAW");
            }}
            onCancel={null}
            okText="Yes"
            cancelText="No"
          >
            <Button
              style={{ background: "gray", color: "white" }}
              disabled={data.result === "DRAW" ? true : false}
            >
              DRAW
            </Button>
          </Popconfirm>
        </Space>
      );
    },
  },
  {
    title: "FIX (CANCELLED MATCH)",
    dataIndex: "data",
    key: "data",
    render: (data, record) => {
      return (
        <Space size="middle">
          <Popconfirm
            disabled={data.result === "CANCELLED" ? true : false}
            title="Do you want to fix this match?. "
            onConfirm={() => {
              updateResult(data, "CANCELLED");
            }}
            onCancel={null}
            okText="Yes"
            cancelText="No"
          >
            <Button
              style={{ background: "black", color: "white" }}
              disabled={data.result === "CANCELLED" ? true : false}
            >
              CANCELLED
            </Button>
          </Popconfirm>
        </Space>
      );
    },
  },
];
