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
import { auth, db } from "../../firebase/config";
import { toast } from "react-toastify";
import "react-phone-input-2/lib/style.css";
import { useHistory } from "react-router";
import { setLoading, setUser } from "../../store/public/actions";

const Login = () => {
  const { Title, Text } = Typography;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const userRef = db.collection("users");
  const dispatch = useDispatch();

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const onSubmit = async (e) => {
    dispatch(setLoading(true));
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password is required.");
      return;
    }

    let values = {
      email: email,
      password: password,
    };

    try {
      await auth
        .signInWithEmailAndPassword(values.email, values.password)
        .then(async (user) => {
          console.log(user.user.uid, "user");
          dispatch(setUser(user.user.uid));
          toast.success("Authorized.");
          history.push("/home");
        })
        .catch((err) => toast.error(err.message));
      // toast.success(data)
    } catch (error) {
      toast.error("Not Authorized.");
      console.log(error);
    } finally {
      dispatch(setLoading(false));
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
                  style={{ borderRadius: 6 }}
                  placeholder="Email"
                  value={email}
                  onChange={(text) => setEmail(text.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  style={{ borderRadius: 6 }}
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
              style={{ width: "100%", margin: "0.3em 0", borderRadius: 6 }}
            >
              LOGIN
            </Button>
          </Form.Item>

          <Button
            type="danger"
            onClick={() => {
              history.push("/");
            }}
            style={{ width: "100%", margin: "0em 0", borderRadius: 6 }}
          >
            REGISTER A DOCTOR
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
