import React, { useState, useEffect } from "react";
import { Table, Icon, Button, Row, Input, Col } from "antd";
import axios from "axios";
import {
  EditTwoTone,
  DeleteOutlined,
  DeleteTwoTone,
  DownloadOutlined,
  FilePdfOutlined,
  SelectOutlined,
  FilePdfTwoTone,
  MessageOutlined,
} from "@ant-design/icons";
import CustomRow from "../common/Form_header";
import WrapperCard from "../common/Wrapper_card";
import { Link, useParams, useNavigate } from "react-router-dom";
import DeleteModal from "../common/DeleteModal";
import jsPDF from "jspdf";
import "jspdf-autotable";
import JobPost from "./JobPost";
const { Search } = Input;

const JobList = () => {
  const [jobList, setJobList] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openEditOrderModal, setOpenEditOrderModal] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchText, setSearchText] = useState("");

  const history = useNavigate();

  //popup modal method.if add order click modal pop out
  const addOrder = async () => {
    setIsModalOpen(false);
    setOpenEditOrderModal(false);
    refresh();
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    refresh();
  };

  //modal cancel button
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false); // Hide the delete modal
  };
  //retireve all the  data
  function getJobList() {
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
    getJobList();
  }, []);

  const refresh = async () => {
    await getJobList();
  };

  //delete method
  const handleDelete = async (_id) => {
    setIsDeleteModalOpen(true); // Show the delete modal
    setSelectedItem(_id); // Set the selected item to delete
  };
  const handleDeleteConfirm = async (_id) => {
    axios
      .delete("http://localhost:4000/jobHire/delete/" + selectedItem)
      .then((result) => {
        setIsDeleteModalOpen(false); // Hide the delete modal
        refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //tables header
  //added pdf method
  const generatePdf = () => {
    const watermarkTitle = "Job List Report";
    // Create the PDF document
    var doc = new jsPDF();
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(10, 10, "Job List Summary");
    doc.setFillColor(220, 220, 220);
    doc.rect(
      0,
      0,
      doc.internal.pageSize.getWidth(),
      doc.internal.pageSize.getHeight(),
      "F"
    );
    //header and columns of the pdf
    doc.autoTable({
      columns: [
        { header: "Job Title", dataKey: "jobTitle" },
        { header: " Company", dataKey: "company" },
        { header: "Location", dataKey: "location" },
        { header: "Opening Date", dataKey: "openingDate" },
        { header: "Closing Date", dataKey: "closingDate" },
      ],
      body: jobList.map((JobList) => {
        return {
          Row: Row,
          jobTitle: JobList.jobTitle,
          company: JobList.company,
          location: JobList.location,
          openingDate: JobList.openingDate,
          closingDate: JobList.closingDate,
        };
      }),
      didDrawPage: function (data) {
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
        const x = pageWidth / 2;
        const y = pageHeight / 2;
        doc.setFontSize(65);
        doc.setTextColor(255, 128, 128);
        doc.text(watermarkTitle, x, y, null, null, "center");
      },
    });
    doc.save("Job List Report.pdf");
  };

  const Columns = [
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
          <Button
            icon={<EditTwoTone key={record._id} />}
            onClick={() => {
              setIsEditModalOpen(true);
              setSelectedItem(record);
            }}
          ></Button>

          <Button
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => {
              handleDelete(record._id);
            }}
          />
          <Button
            icon={<SelectOutlined style={{ color: "blue" }} />}
            onClick={() => {
              history("/appliedUsers/" + record._id);
            }}
          />
        </span>
      ),
    },
  ];
  return (
    <>
      <div
        className="otherdash"
        style={{
          minHeight: "100vh",
          display: "flex",
        }}
      >
        <div style={{ paddingLeft: 150 }}>
          <br></br>
          <br></br>
          <br></br>
          <div style={{ paddingLeft: 870 }}>
            <Button
              onClick={() => {
                setIsModalOpen(true);
              }}
              type="primary"
            >
              Add New Vacancy
            </Button>
          </div>
          <br></br>
          <br></br>
          <div
            style={{
              padding: 1,
              alignItems: "center",
              width: 1000,
              height: 650,
              borderRadius: 5,
            }}
          >
            <WrapperCard
              style={{ backgroundColor: "#37475E", borderRadius: 5 }}
            >
              <CustomRow
                style={{ justifyContent: "space-between", padding: "10px" }}
              >
                <h1 style={{ color: "White", fontSize: 18 }}>Job Vacancies</h1>
                <Col span={12} />
                <Search
                  placeholder="Input search text"
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{
                    width: 250,
                  }}
                />

                {/* {jobList.filter((val) => {
                                if (searchText === "") {
                                    return val;
                                } else if (val.jobTitle.toLowerCase().includes(searchText.toLowerCase()) ||
                                    val.location.toLowerCase().includes(searchText.toLowerCase()) ||
                                    val.company.toLowerCase().includes(searchText.toLowerCase()) ||
                                    val.openingDate.toLowerCase().includes(searchText.toLowerCase()) ||
                                    val.closingDate.toLowerCase().includes(searchText.toLowerCase())) {
                                    return val;
                                }
                            })} */}

                <Button
                  icon={
                    <FilePdfOutlined
                      style={{ fontSize: "21px", color: "red" }}
                      onClick={generatePdf}
                    />
                  }
                />
              </CustomRow>
            </WrapperCard>
            <Table
              columns={Columns}
              dataSource={jobList.filter((jobList) =>
                jobList.jobTitle
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              )}
            />

            {/* passig data to Job post using props */}
            <JobPost
              isOpen={isModalOpen}
              handleCancel={handleCancel}
              handleOk={addOrder}
            />

            <JobPost
              isOpen={isEditModalOpen}
              handleCancel={handleCancel}
              handleOk={handleOk}
              selectedItem={selectedItem}
            />
            <DeleteModal
              isModalOpen={isDeleteModalOpen}
              handleCancel={handleDeleteCancel}
              handleOk={handleDeleteConfirm}
              text="Do you want to delete the Job details?"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobList;
