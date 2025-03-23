import React from "react";
import {
  Button,
  notification,
  Col,
  Form,
  Input,
  Modal,
  Row,
  DatePicker,
} from "antd";
import { useState, useEffect } from "react";
import CustomRow from "../common/Form_header";
import WrapperCard from "../common/Wrapper_card";
import axios from "axios";
import {} from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const dateFormat = "YYYY/MM/DD";

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};

const JobPost = (props) => {
  const {
    isModalOpen,
    isEditModalOpen,
    isOpen,
    showModal,
    handleCancel,
    handleOk,
    selectedItem,
  } = props;

  const [size, setSize] = useState("large");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [openingDate, setOpeningDate] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [company, setCompany] = useState("");

  //create and edit method
  const handleSubmit = async (event) => {
    event.preventDefault();
    const i = {
      jobTitle: jobTitle,
      location: location,
      openingDate: openingDate,
      closingDate: closingDate,
      company: company,
    };
    try {
      if (selectedItem) {
        await axios.put(
          `http://localhost:4000/jobHire/update/${selectedItem._id}`,
          i
        );
        notification.success({
          message: "Updated Successful",
          description: "You have successfully Updated Report",
        });
      } else {
        await axios.post("http://localhost:4000/jobHire/add", i);
        notification.success({
          message: "Created Successful",
          description: "You have successfully Created Report",
        });
      }
      handleOk();
    } catch (error) {
      console.log("create item failes ${error}");
    }
  };

  useEffect(() => {
    if (selectedItem) {
      setJobTitle(selectedItem.jobTitle);
      setLocation(selectedItem.location);
      setOpeningDate(selectedItem.openingDate);
      setClosingDate(selectedItem.closingDate);
      setCompany(selectedItem.company);
    }
  }, [selectedItem]);

  const onChangeOP = (openingDate, dateString) => {
    console.log(openingDate, dateString);
    setOpeningDate(dateString);
  };
  const onChangeCD = (closingDate, dateString) => {
    console.log(closingDate, dateString);
    setClosingDate(dateString);
  };

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        width={1000}
        footer={null}
      >
        <WrapperCard style={{ backgroundColor: "#2c3e50" }}>
          <CustomRow
            style={{ justifyContent: "space-between", padding: "1px", marginBottom: '20px' }}
          >
            <h1 style={{ color: "white", paddingLeft: 20, fontSize: 24, fontWeight: 'bold' }}>
              Add New Vacancy
            </h1>
          </CustomRow>
        </WrapperCard>
        <Form
          style={{
            padding: 1,
            paddingLeft: 110,
            backgroundColor: "#e0f7fa", 
            borderRadius: "8px",
            fontSize: "16px", 
          }}
        >
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <Row>
            <Form.Item
              name="name"
              label={<span style={{ fontWeight: "bold", fontSize: "18px" }}>Job Title</span>}
              initialValue={selectedItem?.jobTitle}
              rules={[
                {
                  required: true,
                  message: "Enter Job Title",
                },
              ]}
            >
              <Input
                onChange={(val) => {
                  setJobTitle(val.target.value);
                }}
                style={{ fontSize: "16px" }} 
              />
            </Form.Item>
            <Col span={3} />
            <Form.Item name="openingDate" label={<span style={{ fontWeight: "bold", fontSize: "18px" }}>Opening Date</span>} {...config}>
              <DatePicker
                defaultValue={
                  selectedItem
                    ? dayjs(selectedItem.openingDate, dateFormat)
                    : null
                }
                onChange={onChangeOP}
                style={{ fontSize: "16px" }} 
              />
            </Form.Item>
          </Row>
          <br></br>

          <Row>
            <Form.Item
              name="location"
              label={<span style={{ fontWeight: "bold", fontSize: "18px" }}>Location</span>}
              initialValue={selectedItem?.location}
              rules={[
                {
                  required: true,
                  message: "Enter Location",
                },
              ]}
            >
              <Input
                onChange={(val) => {
                  setLocation(val.target.value);
                }}
                style={{ fontSize: "16px" }} 
              />
            </Form.Item>
            <br></br>
            <Col span={3} />

            <Form.Item name="closingDate" label={<span style={{ fontWeight: "bold", fontSize: "18px" }}>Closing Date</span>} {...config}>
              <DatePicker
                defaultValue={
                  selectedItem
                    ? dayjs(selectedItem.closingDate, dateFormat)
                    : null
                }
                onChange={onChangeCD}
                style={{ fontSize: "16px" }} 
              />
            </Form.Item>
          </Row>
          <br></br>

          <Row>
            <Form.Item
              name="company"
              label={<span style={{ fontWeight: "bold", fontSize: "18px" }}>Company</span>}
              initialValue={selectedItem?.company}
              rules={[
                {
                  required: true,
                  message: "Enter the Company name",
                },
              ]}
            >
              <Input
                onChange={(val) => {
                  setCompany(val.target.value);
                }}
                style={{ fontSize: "16px" }} 
              />
            </Form.Item>
          </Row>
          <br></br>

          <Row>
            <Col span={13} />
            <Form.Item label=" " colon={false}>
              <Button
                type="primary"
                color="red"
                htmlType="submit"
                style={{
                  backgroundColor: "#f44336",
                  fontWeight: "bold",
                  fontSize: "16px", // Font size for button
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Form.Item>
            <Col span={1} />
            <Form.Item label=" " colon={false}>
              <a href="/financial">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px", // Font size for button
                  }}
                  onClick={handleSubmit}
                >
                  {selectedItem ? "Edit" : "Submit"}
                </Button>
              </a>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default JobPost;