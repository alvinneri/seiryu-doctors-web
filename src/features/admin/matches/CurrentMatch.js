import { Button } from "antd";
import React from "react";
import { Row, Col } from "antd";

const CurrentMatch = ({ currentMatch }) => {
  return (
    <Row>
      <Col span={8}>
        <div>
          <Button>CLOSE</Button>
          <Button>OPEN</Button>
          <Button>CANCEL</Button>
        </div>
        <div style={{ marginTop: "1em" }}>
          <p>RESULT:</p>
          <Button>MERON</Button>
          <Button>WALA</Button>
          <Button>DRAW</Button>
        </div>
      </Col>
      <Col span={8}>
        <h3>Current Match</h3>
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
