import React, { createContext } from "react";
import { Button, Checkbox, Col, Form, Input, Card, Row } from "antd";
import CustomRow from "../common/Form_header";
import WrapperCard from "../common/Wrapper_card";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PageWithTitleSearch from "../common/PageWithTitleSearch";
import { useForm } from "antd/es/form/Form";

const { TextArea } = Input;

const JobApply = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState();
  const navigate = useNavigate();
  const [form] = useForm();

  useEffect(() => {
    axios
      .get("http://localhost:4000/jobHire/" + id)
      .then((res) => setJobData(res.data))
      .catch((e) => navigate("/showVacancies"));
  }, []);

  function sendApplication(e) {
    const jobApplySchema = {
      ...e,
      jobId: id,
    };

    axios
      .post("http://localhost:4000/jobFind/add", jobApplySchema)
      .then(() => {
        alert("Applied successfully.");
        navigate("/showVacancies");
      })
      .catch((err) => {
        console.log(`Error: ${err?.response?.data}`);
      });
  }
  return (
    <PageWithTitleSearch title={"Job Application : " + jobData?.jobTitle}>
      <Form
        onFinish={sendApplication}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        form={form}
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
              message: "Enter Your First Name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
              message: "Enter Your Last Name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Enter Email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="contactNum"
          label="Contact Number"
          rules={[
            {
              required: true,
              message: "Enter Your Contact Number",
            },
            {
              pattern: /^0\d{9}$/,
              message: "Please enter a valid 10-digit phone number starting with 0",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="pastExp"
          label="Past Experience"
          rules={[
            {
              required: true,
              message: "Past Experience",
            },
          ]}
        >
          <TextArea rows={4}>
            <Input />
          </TextArea>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </PageWithTitleSearch>
  );
};

export default JobApply;
