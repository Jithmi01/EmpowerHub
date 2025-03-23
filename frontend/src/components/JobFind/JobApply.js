import React, { useState, useEffect } from "react";
import { Button, Form, Input, Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const { TextArea } = Input;

const JobApply = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/jobHire/${id}`)
      .then((res) => setJobData(res.data))
      .catch(() => navigate("/showVacancies"));
  }, []);

  function sendApplication(values) {
    const jobApplySchema = { ...values, jobId: id };
    axios
      .post("http://localhost:4000/jobFind/add", jobApplySchema)
      .then(() => {
        alert("Applied successfully.");
        navigate("/showVacancies");
      })
      .catch((err) => console.log(`Error: ${err?.response?.data}`));
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f8ff",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "60%",
          maxWidth: "600px",
          padding: "20px",
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            backgroundColor: "#001f3f",
            padding: "15px",
            borderRadius: "6px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ color: "white", margin: 0 }}>
            Job Application: {jobData?.jobTitle}
          </h2>
        </div>

        {/* Form */}
        <Form
          onFinish={sendApplication}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Form.Item
            name="firstName"
            label={<span style={{ fontWeight: "bold", fontSize: "16px" }}>First Name</span>}
            rules={[{ required: true, message: "Enter Your First Name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastName"
            label={<span style={{ fontWeight: "bold", fontSize: "16px" }}>Last Name</span>}
            rules={[{ required: true, message: "Enter Your Last Name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span style={{ fontWeight: "bold", fontSize: "16px" }}>Email</span>}
            rules={[{ required: true, type: "email", message: "Enter Email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="contactNum"
            label={<span style={{ fontWeight: "bold", fontSize: "16px" }}>Contact Number</span>}
            rules={[
              { required: true, message: "Enter Your Contact Number" },
              { pattern: /^0\d{9}$/, message: "Enter a valid 10-digit phone number starting with 0" },
            ]}
          >
            <Input type="tel" placeholder="07XXXXXXXX" />
          </Form.Item>

          <Form.Item
            name="pastExp"
            label={<span style={{ fontWeight: "bold", fontSize: "16px" }}>Past Experience</span>}
            rules={[{ required: true, message: "Enter Your Past Experience" }]}
          >
            <TextArea rows={4} placeholder="Describe your past job experience..." />
          </Form.Item>

         

          {/* Submit Button */}
          <Form.Item wrapperCol={{ span: 24, style: { textAlign: "center" } }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default JobApply;