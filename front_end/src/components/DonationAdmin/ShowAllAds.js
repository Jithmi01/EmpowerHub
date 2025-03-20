import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Card, Typography } from 'antd';
import axios from 'axios';
import { EditTwoTone, DeleteOutlined, FilePdfOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PublishAd from './PublishAd';
import DeleteModal from '../common/DeleteModal';
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
        doc.setFontSize(14);
        doc.text('Donation Advertisements Summary', 20, 20);
        doc.autoTable({
            columns: [
                { header: 'Name', dataKey: 'name' },
                { header: 'Location', dataKey: 'location' },
                { header: 'Short Description', dataKey: 'smallDes' },
                { header: 'Help Required', dataKey: 'help' },
                { header: 'Detailed Description', dataKey: 'longDes' },
            ],
            body: ads,
        });
        doc.save('Advertisement_Summary_Report.pdf');
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
            <Card style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, width: '100%' }}>
                    <Title level={3} style={{ margin: 0 }}>Advertisement Summary</Title>
                    <Space>
                        <Search 
                            placeholder="Search ads..." 
                            onChange={(e) => setSearchText(e.target.value)} 
                            style={{ width: 300, borderRadius: 8 }}
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
                    dataSource={ads.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))} 
                    pagination={{ pageSize: 5 }}
                    rowKey="_id"
                />
            </Card>
            <PublishAd isOpen={isModalOpen} handleCancel={() => setIsModalOpen(false)} handleOk={() => setIsModalOpen(false)} />
            <DeleteModal isModalOpen={isDeleteModalOpen} handleCancel={() => setIsDeleteModalOpen(false)} handleOk={handleDeleteConfirm} text="Do you want to delete this advertisement?" />
        </div>
    );
};

export default Ads;
