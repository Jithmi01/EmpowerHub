import React, { useState, useEffect } from "react";
import { Table, Input, Card } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

const Showvacancies = () => {
  const [appliedUsersList, setAppliedUsersList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { id } = useParams();

  useEffect(() => {
    function getAppliedUsers() {
      axios
        .get("http://localhost:4000/jobFind/applications/" + id)
        .then((res) => {
          setAppliedUsersList(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getAppliedUsers();
  }, [id]);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNum",
      key: "contactNum",
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
          <h2 style={{ color: "white", margin: 0 }}>Applied Users</h2>
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
            placeholder="Search by name"
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: "250px",
              textAlign: "center",
              borderRadius: "20px",
            }}
          />
        </div>

        {/* Data Table */}
        <Table
          columns={columns}
          dataSource={appliedUsersList.filter((user) =>
            user.firstName.toLowerCase().includes(searchText.toLowerCase())
          )}
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Card>
    </div>
  );
};

export default Showvacancies;

