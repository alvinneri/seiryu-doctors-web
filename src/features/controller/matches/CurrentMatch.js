import { Button } from "antd";
import React, { useState } from "react";
import { Row, Col } from "antd";
import { db } from "../../../firebase/config";

const CurrentMatch = ({ currentMatch, deleteMatch }) => {
  const updateStatus = (status) => {
    const matchRef = db
      .collection("categories")
      .doc(currentMatch.id)
      .update({
        match: {
          meron: {
            totalBets: currentMatch?.match?.meron?.totalBets,
            betters: [...currentMatch?.match?.meron?.betters],
          },
          wala: {
            totalBets: currentMatch?.match?.wala?.totalBets,
            betters: [...currentMatch?.match?.wala?.betters],
          },
          number: currentMatch?.match?.number,
          result: currentMatch?.match?.result,
          name: currentMatch?.match?.name,
          status: status,
        },
      });
  };

  const updateResult = (result) => {
    const matchRef = db
      .collection("categories")
      .doc(currentMatch.id)
      .update({
        match: {
          meron: {
            totalBets: currentMatch?.match?.meron?.totalBets,
            betters: [...currentMatch?.match?.meron?.betters],
          },
          wala: {
            totalBets: currentMatch?.match?.wala?.totalBets,
            betters: [...currentMatch?.match?.wala?.betters],
          },
          number: currentMatch?.match?.number,
          result: result,
          name: currentMatch?.match?.name,
          status: currentMatch?.match?.status,
        },
      });
  };

  return (
    <Row>
      <Col span={8}>
        <p>CHOOSE A STATUS:</p>
        <div>
          <Button
            onClick={() => updateStatus("CLOSE")}
            style={{ background: "red", color: "white" }}
          >
            CLOSE
          </Button>
          <Button
            onClick={() => updateStatus("OPEN")}
            style={{ background: "green", color: "white" }}
          >
            OPEN
          </Button>
          <Button
            onClick={() => updateStatus("CANCEL")}
            style={{ background: "black", color: "white" }}
          >
            CANCEL
          </Button>
        </div>
        <div style={{ marginTop: "1em" }}>
          <p>CHOOSE A RESULT:</p>
          <Button
            onClick={() => updateResult("MERON")}
            style={{ background: "blue", color: "white" }}
          >
            MERON
          </Button>
          <Button
            onClick={() => updateResult("WALA")}
            style={{ background: "red", color: "white" }}
          >
            WALA
          </Button>
          <Button
            onClick={() => updateResult("DRAW")}
            style={{ background: "gray", color: "white" }}
          >
            DRAW
          </Button>
        </div>
      </Col>
      <Col span={8}>
        <Button
          onClick={deleteMatch}
          style={{ background: "red", color: "white", marginBottom: "0.3em" }}
        >
          DELETE MATCH
        </Button>
        <h3>Current Match</h3>
        <p>Status: {currentMatch?.match?.status}</p>
        <p>Result: {currentMatch?.match?.result}</p>
        <p>Match Number: #{currentMatch?.match?.number}</p>
        <p>Match Name: {currentMatch?.match?.name}</p>
      </Col>
      <Col span={8}>
        <h3>BETS</h3>
        <p>MERON: {currentMatch?.match?.meron?.totalBets}</p>
        <p>WALA: {currentMatch?.match?.wala?.totalBets}</p>
      </Col>
    </Row>
  );
};

export default CurrentMatch;
