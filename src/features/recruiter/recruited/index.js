import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/config";
import { List, Typography, Divider, Button, Table } from "antd";
import {
  setRecruitedPlayers,
  resetRecruited,
} from "../../../store/recruiter/actions";
import { CopyFilled } from "@ant-design/icons";
import { columns } from "./Columns";
import moment from "moment";
import { DatePicker, Space } from "antd";
const { Text } = Typography;

const RecruitedPlayers = () => {
  const currentDate = moment(new Date()).format("YYYY-MM");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.public);
  const { recruitedPlayers } = useSelector((state) => state.recruiter);
  const [_users, setUsers] = useState([]);
  const [email, setEmail] = useState(null);
  const [selected, setSelectedDate] = useState(currentDate);
  const monthFormat = "YYYY-MM";
  const [userDetails, setUserDetails] = useState(null);
  function onChange(date, dateString) {
    setSelectedDate(dateString);
    console.log(date, dateString);
  }

  const getUsers = async () => {
    const usersRef = await db.collection("users");
    const snapshot = await usersRef.where("invitedBy", "==", user.uid).get();

    if (!snapshot.empty) {
      snapshot.forEach(async (doc) => {
        const fights = db.collection("fights");
        const fightRef = await fights.get();
        let _totals = 0;
        let docs;
        if (!fightRef.empty) {
          let _fightRef = [...fightRef.docs];
          let _filteredFights = _fightRef.filter(
            (item) =>
              moment(item.data().date.toDate()).format("YYYY-MM") === selected
          );

          _filteredFights.forEach((fight) => {
            if (fight.result !== "CANCELLED" && fight.result !== "DRAW") {
              fight.data()?.meron?.betters.forEach((meron) => {
                if (meron.user === doc.data().uid) {
                  _totals = _totals + parseInt(meron.amount);
                }
              });

              fight.data()?.wala?.betters.forEach((wala) => {
                if (wala.user === doc.data().uid) {
                  _totals = _totals + parseInt(wala.amount);
                }
              });

              fight.data()?.draw?.betters.forEach((draw) => {
                if (draw.user === doc.data().uid) {
                  _totals = _totals + parseInt(draw.amount);
                }
              });
            }
          });

          if (doc.data().userType === "RECRUITER") {
            const usersRef = await db.collection("users");
            const _snapshot = await usersRef
              .where("invitedBy", "==", doc.data().uid)
              .get();
            if (!_snapshot.empty) {
              _snapshot.forEach((doc2) => {
                _filteredFights.forEach((fight) => {
                  if (fight.result !== "CANCELLED" && fight.result !== "DRAW") {
                    fight.data()?.meron?.betters.forEach((meron) => {
                      if (meron.user === doc2.data().uid) {
                        _totals = _totals + parseInt(meron.amount);
                      }
                    });

                    fight.data()?.wala?.betters.forEach((wala) => {
                      if (wala.user === doc2.data().uid) {
                        _totals = _totals + parseInt(wala.amount);
                      }
                    });

                    fight.data()?.draw?.betters.forEach((draw) => {
                      if (draw.user === doc2.data().uid) {
                        _totals = _totals + parseInt(draw.amount);
                      }
                    });
                  }
                });
              });
            }
          }
        }

        docs = {
          ...doc.data(),
          id: doc.id,
          total: _totals,
        };
        console.log(docs, "docs");
        dispatch(setRecruitedPlayers(docs));
      });
    }
    // console.log(_users);
  };

  const getTotalBets = async (uid) => {
    let _totals = 0;
    const betHistory = await db.collection("bet_history");
    const snapshot = await betHistory.where("uid", "==", uid).get();
    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        let docs = {
          ...doc.data(),
          id: doc.id,
        };
        _totals = _totals + parseInt(doc.data().amount);
      });
    }
    console.log(_totals);
    return _totals;
  };

  useEffect(() => {
    dispatch(resetRecruited());
    getUsers();
  }, []);

  const Item = ({ item }) => {
    return (
      <div>
        <List.Item className="category-list-item">
          <div>
            <p>{`Name: ${item.name}`}</p>
            <p>{`Email: ${item.email}`}</p>
            <p>{`Usertype: ${item.userType}`}</p>
            <p>{`Total:${getTotalBets(item.id)}`}</p>
          </div>
        </List.Item>
        <Divider />
      </div>
    );
  };

  return (
    <div>
      <Typography style={{ marginBottom: "1em" }}>
        Recruit players by sharing this code to earn points.
      </Typography>
      <Button
        type="primary"
        onClick={() => {
          navigator.clipboard.writeText(user.uid);
        }}
        style={{ margin: "1em" }}
      >
        <CopyFilled />
        COPY REFERRAL CODE
      </Button>
      <span>{user.uid}</span>
      <div>
        <Button
          type="primary"
          onClick={() => {
            navigator.clipboard.writeText(
              `https://barako-bet.netlify.app/register/${user.uid}`
            );
          }}
          style={{ margin: "1em" }}
        >
          <CopyFilled />
          COPY REFERRAL REGISTRATION LINK
        </Button>
        <span>{`https://barako-bet.netlify.app/register/${user.uid}`}</span>
      </div>
      <Typography style={{ margin: "1em 0em" }}>
        Subrecruiter of: {userDetails?.invitedBy ? email : "None"}
      </Typography>
      <div style={{ display: "flex" }}>
        <Typography style={{ margin: "1em 1em 1em 0" }}>Filter:</Typography>
        <DatePicker
          defaultValue={moment(currentDate, monthFormat)}
          format={monthFormat}
          picker="month"
          onChange={onChange}
        />
      </div>

      <Table
        columns={columns}
        dataSource={recruitedPlayers}
        summary={(pageData) => {
          let totalBets = 0;

          pageData.forEach(({ total }) => {
            totalBets += total;
          });

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell>Total</Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text type="danger">{totalBets}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </div>
  );
};

export default RecruitedPlayers;
