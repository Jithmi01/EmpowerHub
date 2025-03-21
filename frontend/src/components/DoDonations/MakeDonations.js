import { Button, Card, Form, Input } from "antd";
import { MailOutlined, PhoneOutlined, UserOutlined, DollarOutlined, CloseOutlined } from "@ant-design/icons";  // Import the CloseOutlined icon
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../assets/styles/makedonate.css";
import CustomRow from '../common/Form_header';
import WrapperCard from '../common/Wrapper_card';

const DonateForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const nameDon = searchParams.get("name");
  const paid = "Paid";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState(paid);
  const [helpGiven, setHelpGiven] = useState(nameDon);

  const [amountError, setAmountError] = useState("");
  const [contactError, setContactError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateName = (value) => {
    if (/\d/.test(value)) {
      setNameError("Name cannot contain numbers");
    } else if (/[^a-zA-Z\s]/.test(value)) {
      setNameError("Name cannot contain special characters");
    } else {
      setNameError("");
    }
  };

  const validateContact = (value) => {
    if (!/^\d{10}$/.test(value)) {
      setContactError("Enter a valid 10-digit contact number");
    } else {
      setContactError("");
    }
  };

  const validateAmount = (value) => {
    if (!/^\d+$/.test(value)) {
      setAmountError("Amount must be a valid number");
    } else {
      setAmountError("");
    }
  };

  const validateEmail = (value) => {
    if (!value.includes("@")) {
      setEmailError("Email must contain '@'");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const donateData = { name, email, contact, amount, status, helpGiven };
    axios
      .post("http://localhost:4000/donation/", donateData)
      .then(() => navigate("/cardDetails"))
      .catch((err) => console.error(`Error: ${err?.response?.data}`));
  };

  const handleClose = () => {
    navigate("/adsUserView"); 
  };

  return (
    <div className="donate-container">
      <Card className="donate-card">
        <div className="close-icon" onClick={handleClose}>
          <CloseOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
        </div>

                <WrapperCard style={{ backgroundColor: '#0D1A45', height: '50px', paddingTop: '10px', borderRadius: 6, marginTop: '15px' }}>
                    <CustomRow style={{ justifyContent: 'center' }}>
                        <h2 style={{ color: 'white', margin: 0, fontSize: '24px' }}>I Want To Donate</h2>
                    </CustomRow>
                </WrapperCard>
        
        <h3 className="donate-subtitle">{nameDon}</h3>
        <Form layout="vertical">
          <Form.Item
            label={<b>Full Name</b>}
            validateStatus={nameError ? "error" : ""}
            help={nameError}
            rules={[{ required: true, message: "Name is required!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              onChange={(e) => {
                setName(e.target.value);
                validateName(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            label={<b>Email</b>}
            validateStatus={emailError ? "error" : ""}
            help={emailError}
            rules={[
              { required: true, message: "Email is required!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            label={<b>Contact Number</b>}
            validateStatus={contactError ? "error" : ""}
            help={contactError}
            rules={[{ required: true, message: "Contact number is required!" }]}
          >
            <Input
              prefix={<PhoneOutlined />}
              onChange={(e) => {
                setContact(e.target.value);
                validateContact(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            label={<b>Donation Amount</b>}
            validateStatus={amountError ? "error" : ""}
            help={amountError}
            rules={[{ required: true, message: "Donation amount is required!" }]}
          >
            <Input
              prefix={<DollarOutlined />}
              onChange={(e) => {
                setAmount(e.target.value);
                validateAmount(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item label={<b>Help Given To</b>}>
            <Input value={nameDon} disabled />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              block
              size="large"
              onClick={handleSubmit}
              disabled={amountError || contactError || nameError || emailError}
            >
              Donate Now
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default DonateForm;
