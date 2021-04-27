import React, { useState } from "react";
import { Input, Button, Form, Image } from "antd";
import logo from "../../assets/images/barakobet.png";
import { auth, db } from "../../firebase/config";
import { toast } from "react-toastify";

const Register = () => {
  // * local states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [invitedBy, setInvitedBy] = useState("");
  const [isRegistered, setRegistered] = useState(false);

  // * register
  const Register = async (values) => {
    await auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(async (user) => {
        db.collection("users")
          .doc(user.user.uid)
          .set({
            name: values.name,
            email: values.email,
            phonenumber: values.number,
            uid: user.user.uid,
            isVerified: false,
            credits: 0,
            invitedBy: values.invitedBy,
            userType: "USER",
          })
          .then((doc) => {
            toast.success(
              "Thank you for signing up. You may now log in on the mobile app."
            );
            setRegistered(true);
            console.log(doc);
          });
      })
      .catch((err) => toast.error(err.message));
  };

  // * submit
  const onSubmit = (e) => {
    e.preventDefault();
    let values = {
      email: email,
      name: name,
      number: number,
      password: password,
      invitedBy: invitedBy,
    };
    Register(values);
  };

  return (
    <div className="login-container">
      {isRegistered ? (
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <p>Thank you for signing up. You may now log in on the mobile app.</p>
          <a
            onClick={() => {
              setRegistered(false);
            }}
          >
            Register new here
          </a>
        </div>
      ) : (
        <>
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
                placeholder="Name"
                value={name}
                onChange={(text) => setName(text.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Phone Number"
                value={number}
                onChange={(text) => setNumber(text.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Referral Code (Optional)"
                value={invitedBy}
                onChange={(text) => setInvitedBy(text.target.value)}
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={onSubmit}
                style={{ width: "300px" }}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
};

export default Register;
