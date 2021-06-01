import React, { useState } from "react";
import {
  Input,
  Button,
  Form,
  Typography,
  Checkbox,
  DatePicker,
  Space,
} from "antd";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/seiryulogo.jpeg";
import { Row, Col } from "antd";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import "react-phone-input-2/lib/style.css";
import { useHistory } from "react-router";
import { setUser } from "../../store/public/actions";

const Login = () => {
  const { Title, Text } = Typography;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const userRef = db.collection("users");
  const dispatch = useDispatch();

  const reset = () => {
    setUsername("");
    setPassword("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Username and password is required.");
      return;
    }

    let values = {
      username: username,
      password: password,
    };

    const adminRef = db.collection("admin");
    const snapshot = await adminRef
      .where("username", "==", username)
      .where("password", "==", password)
      .get();
    if (snapshot.empty) {
      toast.error("Not authorized.");
      return;
    } else {
      snapshot.forEach((doc) => {
        console.log(doc.data());
        dispatch(setUser(doc.data()));
      });
      history.push("/home");
      toast.success("Authorized.");
    }
  };

  return (
    <div className="login-container">
      <div className="signup-logo-container">
        <img src={logo} className="signup-logo" />
      </div>
      <div style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
        <Title level={5}>Login as Administrator</Title>

        <Form onSubmit={onSubmit} style={{ marginTop: "1em" }}>
          <Row>
            <Col span={24}>
              <Form.Item>
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={(text) => setUsername(text.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(text) => setPassword(text.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={onSubmit}
              style={{ width: "100%", margin: "0.3em 0" }}
            >
              LOGIN
            </Button>
          </Form.Item>

          <Button
            type="danger"
            onClick={() => {
              history.push("/register");
            }}
            style={{ width: "100%", margin: "0em 0" }}
          >
            REGISTER A DOCTOR
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
