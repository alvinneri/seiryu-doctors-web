import { Button } from "antd";
import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { db } from "../../../firebase/config";

const CurrentMatch = ({ currentMatch, deleteMatch }) => {
  const [appPercentage, setAppPercentage] = useState(0);
  const [betLimits, setBetLimits] = useState(10000);
  const [id, setDocId] = useState(null);

  const getAppSettings = async () => {
    const appSettingRef = db.collection("app_settings");
    const unsubscribe = appSettingRef.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        setBetLimits(doc.data().betLimits);
        setAppPercentage(doc.data().appPercentage);
        setDocId(doc.id);
      });
    });

    return unsubscribe;
  };

  useEffect(() => {
    getAppSettings();
  }, []);

  const getPayout = (totalBets, totalSides) => {
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
            onClick={() => updateStatus("CLOSED")}
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
            onClick={() => updateStatus("CANCELLED")}
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
        <p>
          PAYOUT MERON:{" "}
          {getPayout(
            currentMatch?.match?.meron?.totalBets +
              currentMatch?.match?.wala?.totalBets,
            currentMatch?.match?.meron?.totalBets
          )}
        </p>
        <p>WALA: {currentMatch?.match?.wala?.totalBets}</p>
        <p>
          PAYOUT WALA:{" "}
          {getPayout(
            currentMatch?.match?.meron?.totalBets +
              currentMatch?.match?.wala?.totalBets,
            currentMatch?.match?.wala?.totalBets
          )}
        </p>
      </Col>
    </Row>
  );
};

export default CurrentMatch;
