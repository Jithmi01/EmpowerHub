import React, { useState, useEffect } from "react";
import { Table, Button, Input } from "antd";
import axios from "axios";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import PageWithTitleSearch from "../common/PageWithTitleSearch";

const { Search } = Input;

const Showvacancies = () => {
  const [jobList, setJobList] = useState([]);
  const [searchText, setSearchText] = useState("");

  function getAllJobVacancies() {
    axios
      .get("http://localhost:4000/jobHire/")
      .then((res) => {
        setJobList(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  useEffect(() => {
    getAllJobVacancies();
  }, []);

  const columns = [
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Opening Date",
      dataIndex: "openingDate",
      key: "openingDate",
    },
    {
      title: "Closing Date",
      dataIndex: "closingDate",
      key: "closingDate",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Link to={"/jobApply/" + record._id}>
            <Button icon={<CheckCircleOutlined />}></Button>
          </Link>
        </span>
      ),
    },
  ];

  return (
    <PageWithTitleSearch
      hasSearch={true}
      title={"Job vacancies"}
      onSearch={setSearchText}
    >
      <Table
        columns={columns}
        dataSource={jobList.filter((job) =>
          job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
        )}
      />
    </PageWithTitleSearch>
  );
};
export default Showvacancies;
