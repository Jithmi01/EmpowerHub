import React, { useState, useEffect } from "react";
import { Table, Icon, Button, Row, Input, Col } from "antd";
import axios from "axios";
import {
  EditTwoTone,
  DeleteOutlined,
  SelectOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import CustomRow from "../common/Form_header";
import WrapperCard from "../common/Wrapper_card";
import { Link, useParams, useNavigate } from "react-router-dom";
import DeleteModal from "../common/DeleteModal";
import jsPDF from "jspdf";
import "jspdf-autotable";
import JobPost from "./JobPost";
import logo from '../../assets/images/EmpowerHub.png';

const { Search } = Input;

const JobList = () => {
  const [jobList, setJobList] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openEditOrderModal, setOpenEditOrderModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const history = useNavigate();

  // Fetch job list
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

  // Refresh job list
  const refresh = async () => {
    await getJobList();
  };

  // Delete methods
  const handleDelete = async (_id) => {
    setIsDeleteModalOpen(true);
    setSelectedItem(_id);
  };

  const handleDeleteConfirm = async (_id) => {
    axios
      .delete("http://localhost:4000/jobHire/delete/" + selectedItem)
      .then(() => {
        setIsDeleteModalOpen(false);
        refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // PDF generation with logo and company details
  const generatePdf = () => {
    const doc = new jsPDF();

    // Load Image
    const imgWidth = 20;
    const imgHeight = 20;

    const imgX = 10;
    const imgY = 10;

    const img = new Image();
    img.src = logo;

    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imgBase64 = canvas.toDataURL('image/png');

      // Add the Image
      doc.addImage(imgBase64, 'PNG', imgX, imgY, imgWidth, imgHeight);

      // Company Details
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('EmpowerHub - Skill Development & Learning Platform', 105, 20, { align: 'center' });

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('No.40, Kaduwela Road, Malabe', 105, 28, { align: 'center' });
      doc.text('Tel: +94 77 444 5555 | Email: empowerhub@gmail.com', 105, 36, { align: 'center' });

      // Separator Line
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.line(10, 45, 200, 45);

      // PDF Title
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Job Vacancies Report', 105, 55, { align: 'center' });

      // Table
      doc.autoTable({
        startY: 65,
        columns: [
          { header: 'Job Title', dataKey: 'jobTitle' },
          { header: 'Company', dataKey: 'company' },
          { header: 'Location', dataKey: 'location' },
          { header: 'Opening Date', dataKey: 'openingDate' },
          { header: 'Closing Date', dataKey: 'closingDate' },
        ],
        body: jobList.map((job) => ({
          jobTitle: job.jobTitle,
          company: job.company,
          location: job.location,
          openingDate: job.openingDate,
          closingDate: job.closingDate,
        })),
        theme: 'grid',
      });

      // Save PDF
      doc.save('Job_Vacancies_Report.pdf');
    };
  };

  const Columns = [
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Job Title</span>,
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Company</span>,
      dataIndex: "company",
      key: "company",
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Location</span>,
      dataIndex: "location",
      key: "location",
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Opening Date</span>,
      dataIndex: "openingDate",
      key: "openingDate",
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Closing Date</span>,
      dataIndex: "closingDate",
      key: "closingDate",
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "16px" }}>Action</span>,
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
      <div className="otherdash" style={{ minHeight: "100vh", display: "flex", backgroundColor: "#001f3f" }}>
        <div style={{ paddingLeft: 150 }}>
          <br />
          <br />
          <br />
          <div style={{ paddingLeft: 870 }}>
            <Button
              onClick={() => setIsModalOpen(true)}
              type="primary"
              style={{
                backgroundColor: "#001f3f",
                borderColor: "#001f3f",
                fontSize: "16px",
                padding: "10px 20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Add New Vacancy
            </Button>
          </div>
          <br />
          <br />
          <div style={{ backgroundColor: "#001f3f", padding: 20, borderRadius: 5 }}>
            <WrapperCard style={{ backgroundColor: "#fff", borderRadius: 5 }}>
              <CustomRow style={{ justifyContent: "space-between", padding: "10px" }}>
                <h1 style={{ color: "darkblue", fontSize: "24px", fontWeight: "bold" }}>Job Vacancies</h1>
                <Col span={12} />
                <Search
                  placeholder="Search by job tittle"
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: 250 }}
                />
                <Button
                  icon={<FilePdfOutlined style={{ fontSize: "21px", color: "red" }} onClick={generatePdf} />}
                />
              </CustomRow>
            </WrapperCard>

            <Table
              columns={Columns}
              dataSource={jobList.filter((jobList) =>
                jobList.jobTitle.toLowerCase().includes(searchText.toLowerCase())
              )}
            />

            <JobPost
              isOpen={isModalOpen}
              handleCancel={() => setIsModalOpen(false)}
              handleOk={refresh}
            />

            <JobPost
              isOpen={isEditModalOpen}
              handleCancel={() => setIsEditModalOpen(false)}
              handleOk={refresh}
              selectedItem={selectedItem}
            />

            <DeleteModal
              isModalOpen={isDeleteModalOpen}
              handleCancel={() => setIsDeleteModalOpen(false)}
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