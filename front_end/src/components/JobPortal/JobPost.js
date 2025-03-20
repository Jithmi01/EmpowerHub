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

  const [size, setSize] = useState("large"); // default is 'middle'
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
        <WrapperCard style={{ backgroundColor: "#37475E" }}>
          <CustomRow
            style={{ justifyContent: "space-between", padding: "1px" }}
          >
            <h1 style={{ color: "White", paddingLeft: 20, fontSize: 20 }}>
              Add New Vacancy
            </h1>
          </CustomRow>
        </WrapperCard>
        <Form
          // onSubmit={sendData}
          style={{ padding: 1, paddingLeft: 110 }}
        >
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <Row>
            {/* <Col span={12}> */}
            <Form.Item
              name="name"
              label="Job Title"
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
              />
            </Form.Item>
            <Col span={3} />
            <Form.Item name="openingDate" label="Opening Date" {...config}>
              <DatePicker
                defaultValue={
                  selectedItem
                    ? dayjs(selectedItem.openingDate, dateFormat)
                    : null
                }
                onChange={onChangeOP}
              />
            </Form.Item>
            {/* </Col> */}
          </Row>
          <br></br>

          <Row>
            <Form.Item
              name="location"
              label="Location"
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
              />
            </Form.Item>
            <br></br>
            <Col span={3} />

            <Form.Item name="closingDate" label="Closing Date" {...config}>
              <DatePicker
                defaultValue={
                  selectedItem
                    ? dayjs(selectedItem.closingDate, dateFormat)
                    : null
                }
                onChange={onChangeCD}
              />
            </Form.Item>
          </Row>
          <br></br>

          <Row>
            <Form.Item
              name="company"
              label="Company"
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
                style={{ backgroundColor: "#f44336", fontWeight: "bold" }}
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
                  style={{ fontWeight: "bold" }}
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
