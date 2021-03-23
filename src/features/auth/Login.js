import React, { useState } from "react";
import { Input, Button, Form, Image } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../../store/public/actions";
import logo from "../../assets/images/barakobet.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    let values = {
      email: email,
      password: password,
    };
    dispatch(login(values));
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src={logo} className="login-logo" />
      </div>
      <Form
        onSubmit={onSubmit}
        style={{ width: "300px", textAlign: "center", marginTop: "1em" }}
      >
        <Form.Item>
          <Input
            placeholder="Email"
            value={email}
            onChange={(text) => setEmail(text.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="password"
            placeholder="Password"
            onChange={(text) => setPassword(text.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={onSubmit}
            style={{ width: "300px" }}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
