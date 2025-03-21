import React, { useState, useEffect } from "react";
import { Table, Button, Input, Card, Typography, Popconfirm, message } from "antd";
import axios from "axios";
import { FilePdfOutlined, DeleteOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useParams } from "react-router-dom";
import logo from "../../assets/images/EmpowerHub.png";
import "../../assets/styles/showDonate.css";
import CustomRow from '../common/Form_header';
import WrapperCard from '../common/Wrapper_card';

const { Search } = Input;
const { Title } = Typography;

const Donations = () => {
  const [donate, setDonate] = useState([]);
  const { _id } = useParams();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = () => {
    axios
      .get("http://localhost:4000/donation/")
      .then((res) => {
        setDonate(res.data);
      })
      .catch((err) => {
        message.error("Failed to fetch donations");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/donation/${id}`)
      .then(() => {
        message.success("Donation record removed successfully");
        fetchDonations();
      })
      .catch(() => {
        message.error("Failed to remove donation");
      });
  };

  const generatePdf = () => {
    const doc = new jsPDF();

    // Define Image Properties
    const imgWidth = 20; // Adjust size
    const imgHeight = 20; 
    const imgX = 10; // Position to left side
    const imgY = 10;  

    // Convert image to Base64 and Add to PDF
    const img = new Image();
    img.src = logo;
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imgBase64 = canvas.toDataURL('image/png');

        // Add the Image
        doc.addImage(imgBase64, 'PNG', imgX, imgY, imgWidth, imgHeight);

        // Company Details (Aligned to Center)
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
        doc.text('My Donation History', 105, 55, { align: 'center' });

        // Table
        // Table
doc.autoTable({
  startY: 65,
  columns: [
      { header: 'Name', dataKey: 'name' },
      { header: 'Email', dataKey: 'email' },
      { header: 'Contact', dataKey: 'contact' },
      { header: 'Amount', dataKey: 'amount' },
      { header: 'Status', dataKey: 'status' },
      { header: 'Donated To', dataKey: 'helpGiven' },
  ],
  body: donate.map(item => ({
      name: item.name,
      email: item.email,
      contact: item.contact,
      amount: item.amount,
      status: item.status,
      helpGiven: item.helpGiven,
  })),
  theme: 'grid',
});


        // Save PDF after everything is loaded
        doc.save('Donation History Report.pdf');
    };
};

  const columns = [
    { title: "Name", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Contact", dataIndex: "contact", key: "contact" },
    { title: "Amount", dataIndex: "amount", key: "amount", sorter: (a, b) => a.amount - b.amount },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Donated To", dataIndex: "helpGiven", key: "helpGiven" },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this donation?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "50px auto", padding: 20 }}>

<WrapperCard style={{ backgroundColor: '#0D1A45', height: '50px', paddingTop: '10px', borderRadius: 6, marginTop: '15px' }}>
                    <CustomRow style={{ justifyContent: 'center' }}>
                        <h2 style={{ color: 'white', margin: 0, fontSize: '24px' }}>My Donation History</h2>
                    </CustomRow>
                </WrapperCard>

      <Card style={{ borderRadius: 10, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)", backgroundColor: "#f8f9fa" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          
          <Search 
            placeholder="Search by name..." 
            onChange={(e) => setSearchText(e.target.value)} 
            style={{ width: 300 }} 
            allowClear 
          />
          <Button type="primary" style={{ backgroundColor: 'green', borderColor: 'green' }} icon={<FilePdfOutlined />} onClick={generatePdf}>
            Download Report
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={donate.filter((item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          )}
          bordered
          pagination={{ pageSize: 5 }}
          rowKey="_id"
          rowClassName={(record, index) => (index % 2 === 0 ? "even-row" : "odd-row")}
          components={{
            header: {
                cell: ({ children, ...restProps }) => (
                    <th {...restProps} style={{ backgroundColor: '#0077B6', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                        {children}
                    </th>
                )
            }
        }}
        />
        <style>
          {`.even-row {
            background-color: #f0f8ff !important;
        }
        .odd-row {
            background-color: #dbe9f4 !important;
        }
        .ant-table-thead > tr > th {
            background-color: #0077B6 !important;
            color: white !important;
            text-align: center !important;
        }
          `}
        </style>
      </Card>
    </div>
  );
};

export default Donations;