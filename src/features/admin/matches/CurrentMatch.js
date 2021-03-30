import { Button } from "antd";
import React, { useState } from "react";
import { Row, Col } from "antd";
import { db } from "../../../firebase/config";

const CurrentMatch = ({ currentMatch }) => {
  const updateStatus = (status) => {
    const matchRef = db
      .collection("categories")
      .doc(currentMatch.id)
      .update({
        match: {
          meron: {
            totalBets: currentMatch?.meron?.totalBets,
          },
          wala: {
            totalBets: currentMatch?.wala?.totalBets,
          },
          number: currentMatch?.number,
          result: currentMatch?.result,
          name: currentMatch?.name,
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
            totalBets: currentMatch?.meron?.totalBets,
          },
          wala: {
            totalBets: currentMatch?.wala?.totalBets,
          },
          number: currentMatch?.number,
          result: result,
          name: currentMatch?.name,
          status: currentMatch?.status,
        },
      });
  };

  return (
    <Row>
      <Col span={8}>
        <div>
          <Button onClick={() => updateStatus("CLOSE")}>CLOSE</Button>
          <Button onClick={() => updateStatus("OPEN")}>OPEN</Button>
          <Button onClick={() => updateStatus("CANCEL")}>CANCEL</Button>
        </div>
        <div style={{ marginTop: "1em" }}>
          <p>RESULT:</p>
          <Button onClick={() => updateResult("MERON")}>MERON</Button>
          <Button onClick={() => updateResult("WALA")}>WALA</Button>
          <Button onClick={() => updateResult("DRAW")}>DRAW</Button>
        </div>
      </Col>
      <Col span={8}>
        <h3>Current Match</h3>
        <p>Status: {currentMatch?.status}</p>
        <p>Result: {currentMatch?.result}</p>
        <p>Match Number: #{currentMatch?.number}</p>
        <p>Match Name: {currentMatch?.name}</p>
      </Col>
      <Col span={8}>
        <h3>BETS</h3>
        <p>MERON: {currentMatch?.meron?.totalBets}</p>
        <p>WALA: {currentMatch?.wala?.totalBets}</p>
      </Col>
    </Row>
  );
};

export default CurrentMatch;
