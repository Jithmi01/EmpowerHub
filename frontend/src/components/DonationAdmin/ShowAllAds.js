import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Card, Typography } from 'antd';
import axios from 'axios';
import { EditTwoTone, DeleteOutlined, FilePdfOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/EmpowerHub.png';
import PublishAd from './PublishAd';
import DeleteModal from '../common/DeleteModal';
import '../../assets/styles/showDonate.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const { Search } = Input;
const { Title } = Typography;

const Ads = () => {
    const [ads, setAds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getAds();
    }, []);

    const getAds = async () => {
        try {
            const res = await axios.get("http://localhost:4000/adDonations/");
            setAds(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = (_id) => {
        setIsDeleteModalOpen(true);
        setSelectedItem(_id);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:4000/adDonations/${selectedItem}`);
            setIsDeleteModalOpen(false);
            getAds();
        } catch (err) {
            console.error(err);
        }
    };

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
            doc.text('Donation Types', 105, 55, { align: 'center' });
    
            // Table
            doc.autoTable({
                startY: 65,
                columns: [
                    { header: 'Name', dataKey: 'name' },
                    { header: 'Location', dataKey: 'location' },
                    { header: 'Short Description', dataKey: 'smallDes' },
                    { header: 'Help Required', dataKey: 'help' },
                    { header: 'Detailed Description', dataKey: 'longDes' },
                ],
                body: ads,
                theme: 'grid',
            });
    
            // Save PDF
            doc.save('Advertisement_Summary_Report.pdf');
        };
    };


    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Location', dataIndex: 'location', key: 'location' },
        { title: 'Short Description', dataIndex: 'smallDes', key: 'smallDes' },
        { title: 'Help Required', dataIndex: 'help', key: 'help' },
        { title: 'Detailed Description', dataIndex: 'longDes', key: 'longDes' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button type="link" icon={<EditTwoTone />} onClick={() => navigate(`/update-ad/${record._id}`)} />
                    <Button type="link" icon={<DeleteOutlined style={{ color: 'red' }} />} onClick={() => handleDelete(record._id)} />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '40px' }}>
            <Card style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',backgroundColor:'#0D1A45' }}>
                <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, width: '100%' }}>
                    <Title level={3} style={{ margin: 0, fontWeight:'700', color:'white' }}>Advertisement Summary</Title>
                    <Space>
                    <Search 
                        placeholder="Search ads..." 
                        onChange={(e) => setSearchText(e.target.value)} 
                        style={{ width: 300, borderRadius: '8px', padding: '8px', border: '2px solid #0077B6' }} 
                        allowClear
                    />

                        <Button icon={<FilePdfOutlined />} style={{ backgroundColor: '#ff4d4f', color: 'white' }} onClick={generatePdf}>
                            Export PDF
                        </Button>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                            Create Ad
                        </Button>
                    </Space>
                </Space>
                
<Table
    columns={columns}
    dataSource={ads.filter((item) => {
        const searchQuery = searchText.toLowerCase();
        return (
            item.name.toLowerCase().includes(searchQuery) ||
            item.smallDes.toLowerCase().includes(searchQuery) ||  // short description
            item.help.toLowerCase().includes(searchQuery) ||  // help required
            item.longDes.toLowerCase().includes(searchQuery) ||  // detailed description
            item.location.toLowerCase().includes(searchQuery)   // location
        );
    })}
    pagination={{ pageSize: 5 }}
    rowKey="_id"
    rowClassName={(_, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
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
    {`
        .even-row {
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
            <PublishAd isOpen={isModalOpen} handleCancel={() => setIsModalOpen(false)} handleOk={() => setIsModalOpen(false)} />
            <DeleteModal isModalOpen={isDeleteModalOpen} handleCancel={() => setIsDeleteModalOpen(false)} handleOk={handleDeleteConfirm} text="Do you want to delete this advertisement?" />
        </div>
    );
};

export default Ads;
