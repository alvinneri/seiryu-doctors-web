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
import { login } from "../../store/public/actions";
import logo from "../../assets/images/seiryulogo.jpeg";
import { Row, Col } from "antd";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

const Register = () => {
  const { Title, Text } = Typography;
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [addressLineOne, setAddresLineOne] = useState("");
  const [addressLineTwo, setAddresLineTwo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [prcNo, setPrcNo] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const dispatch = useDispatch();
  const [errorName, setErrorName] = useState("");
  const [errorClinic, setErrorClinic] = useState("");
  const [errorOthers, setErrorOthers] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      setErrorName("First and Last name are required.");
      return;
    } else {
      setErrorName("");
    }

    if (!addressLineOne || !city || !state || !zipCode || !country) {
      setErrorClinic(
        "Address Line 1, City, State, Postal / Zip Code and Country are required."
      );
      return;
    } else {
      setErrorClinic("");
    }

    if (!email || !mobileNumber || !birthdate) {
      setErrorOthers("Email, Mobile Number and Birthdate are required.");
      return;
    } else {
      setErrorOthers("");
    }

    let values = {
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      title: title,
      suffix: suffix,
      addressLineOne: addressLineOne,
      addressLineTwo: addressLineTwo,
      city: city,
      state: state,
      country: country,
      zipCode: zipCode,
      prcNo: prcNo,
      email: email,
      mobileNumber: mobileNumber,
      birthdate: birthdate,
    };

    console.log(values);
  };

  const onChange = (e) => {
    setIsAgree(e.target.checked);
  };

  const onChangeBirthdate = (date, dateString) => {
    setBirthdate(dateString);
  };

  return (
    <div className="signup-container">
      <div className="signup-logo-container">
        <img src={logo} className="signup-logo" />
      </div>
      <div style={{ margin: "0 auto", maxWidth: "900px" }}>
        <Title level={5}>Seiryu Pharmacy Partner Sign-up Form</Title>
        <Title level={5}>Doctor Partner</Title>

        <Form onSubmit={onSubmit} style={{ marginTop: "1em" }}>
          <Title level={5} type="secondary">
            Name*
          </Title>
          {errorName && <Text type="danger">{errorName}</Text>}
          <Row justify="space-between">
            <Col span={3}>
              <Form.Item>
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(text) => setTitle(text.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item>
                <Input
                  placeholder="First Name"
                  value={firstName}
                  onChange={(text) => setFirstName(text.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item>
                <Input
                  placeholder="Middle Name"
                  value={middleName}
                  onChange={(text) => setMiddleName(text.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item>
                <Input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(text) => setLastName(text.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item>
                <Input
                  placeholder="Suffix"
                  value={suffix}
                  onChange={(text) => setSuffix(text.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Title level={5} type="secondary">
            Clinic Address*
          </Title>
          {errorClinic && <Text type="danger">{errorClinic}</Text>}
          <Row>
            <Col span={24}>
              <Form.Item>
                <Input
                  placeholder="Address Line 1"
                  value={addressLineOne}
                  onChange={(text) => setAddresLineOne(text.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item>
                <Input
                  placeholder="Address Line 2"
                  value={addressLineTwo}
                  onChange={(text) => setAddresLineTwo(text.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col span={11}>
              <Form.Item>
                <Input
                  placeholder="City"
                  value={city}
                  onChange={(text) => setCity(text.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item>
                <Input
                  placeholder="State / Province / Region"
                  value={state}
                  onChange={(text) => setState(text.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col span={11}>
              <Form.Item>
                <Input
                  placeholder="Postal / Zip Code"
                  value={zipCode}
                  onChange={(text) => setZipCode(text.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item>
                <CountryDropdown
                  style={{
                    padding: "0.25em",
                    width: "100%",
                    borderRadius: "3px",
                    border: "1px solid #c4bebe",
                  }}
                  value={country}
                  onChange={(val) => setCountry(val)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col span={5}>
              <Form.Item>
                <Title level={5} type="secondary">
                  PRC No.*
                </Title>
                <Input
                  placeholder="PRC No."
                  value={prcNo}
                  onChange={(text) => setPrcNo(text.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item>
                <Title level={5} type="secondary">
                  Email*
                </Title>
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(text) => setEmail(text.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item>
                <Title level={5} type="secondary">
                  Mobile Number*
                </Title>
                <Input
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={(text) => setMobileNumber(text.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item>
                <Title level={5} type="secondary">
                  Birthday*
                </Title>
                <DatePicker onChange={onChangeBirthdate} />
              </Form.Item>
            </Col>
          </Row>
          {errorOthers && <Text type="danger">{errorOthers}</Text>}
          <Title level={5} type="secondary">
            DATA PRIVACY NOTICE
          </Title>
          <Form.Item>
            <Text>
              The data you provided here will be used by Seiryu Japanese
              Pharmacy and its affiliates, to provide you partnership
              information, on how Seiryu Pharmacy can help you take care of your
              patients. Furthermore,Seiryu Pharmacist will give advice to the
              patients about the possible side effects of the prescribed
              medicine. Seiryu Pharmacy shall contact you on your given contact
              information for any updates and to build relationship with you.
              Seiryu Japanese Pharmacy shall not use your data other than what
              is stated above. You have the option to opt out anytime, by
              sending an email with subject OPT OUT to
              wecare@seiryupharmacy.com. By submitting this form, you agree to
              the terms, stated in this privacy notice.
            </Text>
          </Form.Item>
          <Checkbox onChange={onChange}>I Agree</Checkbox>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={onSubmit}
              style={{ width: "300px", margin: "1em 0" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
