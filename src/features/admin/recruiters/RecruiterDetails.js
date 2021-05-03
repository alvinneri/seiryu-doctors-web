import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/config";
import { List, Typography, Divider, Button, Table } from "antd";
import {
  setRecruitedPlayers,
  resetRecruited,
} from "../../../store/admin/actions";
import { DatePicker, Space } from "antd";
import { columns } from "./Columns";
import { useHistory, useParams } from "react-router";
import moment from "moment";
const { Text } = Typography;

const RecruitedDetails = () => {
  const currentDate = moment(new Date()).format("YYYY/MM");
  console.log(currentDate);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.public);
  const { recruitedPlayers } = useSelector((state) => state.admin);
  const [_users, setUsers] = useState([]);
  const history = useHistory();
  const [userDetails, setUserDetails] = useState(null);
  const [email, setEmail] = useState(null);
  const [selected, setSelectedDate] = useState(currentDate);
  const monthFormat = "YYYY-MM";

  const getUsers = async () => {
    const usersRef = await db.collection("users");
    const snapshot = await usersRef.where("invitedBy", "==", id).get();

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
            const _usersRef = await db.collection("users");
            const _snapshot = await usersRef
              .where("invitedBy", "==", doc.data().uid)
              .get();
            if (!_snapshot.empty) {
              _snapshot.forEach(async (doc2) => {
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
    return _totals;
  };
  const getUserDetails = () => {
    const userRef = db
      .collection("users")
      .doc(id)
      .onSnapshot((doc) => {
        setUserDetails(doc.data());
      });

    return userRef;
  };

  const getRecruiter = async () => {
    const userRef = await db
      .collection("users")
      .doc(userDetails.invitedBy)
      .get();
    if (!userRef.exists) {
      return null;
    } else {
      setEmail(userRef.data().email);
    }
  };

  useEffect(() => {
    if (userDetails?.invitedBy) {
      getRecruiter();
    }
  }, [userDetails]);

  useEffect(() => {
    if (id) {
      getUserDetails();
      dispatch(resetRecruited([]));
      if (selected) {
        getUsers();
      }
    }
  }, [id, selected]);

  function onChange(date, dateString) {
    setSelectedDate(dateString);
    console.log(date, dateString);
  }

  return (
    <div style={{ height: "80vh", overflow: "scroll" }}>
      <Button onClick={() => history.goBack()}>Back</Button>
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
          console.log(pageData, "pageData");
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

export default RecruitedDetails;
