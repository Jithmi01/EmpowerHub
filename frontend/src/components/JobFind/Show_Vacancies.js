import React, { useState, useEffect } from "react";
import { Table, Button, Input, Card } from "antd";
import axios from "axios";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ShowVacancies = () => {
  const [jobList, setJobList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/jobHire/")
      .then((res) => {
        setJobList(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const columns = [
    {
      title: <span style={{ fontSize: "16px", fontWeight: "bold" }}>Job Title</span>,
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: <span style={{ fontSize: "16px", fontWeight: "bold" }}>Company</span>,
      dataIndex: "company",
      key: "company",
    },
    {
      title: <span style={{ fontSize: "16px", fontWeight: "bold" }}>Location</span>,
      dataIndex: "location",
      key: "location",
    },
    {
      title: <span style={{ fontSize: "16px", fontWeight: "bold" }}>Opening Date</span>,
      dataIndex: "openingDate",
      key: "openingDate",
    },
    {
      title: <span style={{ fontSize: "16px", fontWeight: "bold" }}>Closing Date</span>,
      dataIndex: "closingDate",
      key: "closingDate",
    },
    {
      title: <span style={{ fontSize: "16px", fontWeight: "bold" }}>Action</span>,
      key: "action",
      render: (text, record) => (
        <span>
          <Link to={`/jobApply/${record._id}`}>
            <Button type="primary" icon={<CheckCircleOutlined />} />
          </Link>
        </span>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: "80%",
          maxWidth: "1000px",
          padding: "20px",
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            backgroundColor: "#001f3f",
            padding: "12px",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "white", margin: 0 }}>Job Vacancies</h2>
        </div>

        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Input
            placeholder="Search by job title"
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: "250px",
              textAlign: "center",
              borderRadius: "20px",
            }}
          />
        </div>

        {/* Dark Blue Outer Div */}
        <div
          style={{
            backgroundColor: "#001f3f",
            padding: "15px",
            borderRadius: "6px",
          }}
        >
          {/* Data Table */}
          <Table
            columns={columns}
            dataSource={jobList.filter((job) =>
              job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
            )}
            pagination={{ pageSize: 5 }}
            bordered
            style={{
              backgroundColor: "white",
              borderRadius: "6px",
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default ShowVacancies;