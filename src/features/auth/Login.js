import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../../store/public/actions";

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
    <div>
      <Form onSubmit={onSubmit}>
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
          <Button type="primary" htmlType="submit" onClick={onSubmit}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
