import React, { useState, useEffect, useContext } from 'react'
import { Table, Card, Button, Space, Input, Col, Row } from 'antd';
import axios from "axios";
import { EditTwoTone, DeleteOutlined, SearchOutlined, DownloadOutlined, FilePdfOutlined, FilePdfTwoTone, SelectOutlined, MessageOutlined } from '@ant-design/icons';
import CustomRow from '../common/Form_header';
import WrapperCard from '../common/Wrapper_card';
import { Link, useParams, useNavigate } from 'react-router-dom'
import AddFinancial from './AddFinancial';
import DeleteModal from '../common/DeleteModal';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { notification } from 'antd';

const { Search } = Input;


const Financial = () => {
    const [financial, setFinancial] = useState([]);
    const [donation, setDonation] = useState([]);
    const [openEditOrderModal, setOpenEditOrderModal] = useState(false);
    const { _id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [ads, setAds] = useState([]);
    const [totalSum, setTotalSum] = useState(0);

    const history = useNavigate();


    const addOrder = async () => {
        setIsModalOpen(false);
        setOpenEditOrderModal(false);
        refresh();
    }
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsEditModalOpen(false);

    };
    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false); // Hide the delete modal
    };

    async function getFinancial() {
        await axios.get("http://localhost:4000/financial/")
            .then((res) => {
                console.log(res.data)
                setFinancial(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }
    const refresh = async () => {
        await getFinancial();
    };
    useEffect(() => {
        getFinancial().then((va) => {
            console.log(`===> ${financial}`)
        })
    }, []);



    function getAds() {
        axios.get(`http://localhost:4000/donation/`)
            .then((res) => {
                setAds(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }
    useEffect(() => {
        getAds();
    }, [])


    useEffect(() => {
        if (ads) {
            const amount = ads.reduce((acc, row) => acc + row.amount, 0);
            setTotalSum(amount);
        }
    }, [ads]);


    const handleDelete = async (_id) => {
        setIsDeleteModalOpen(true); // Show the delete modal
        setSelectedItem(_id); // Set the selected item to delete
    };
    const handleDeleteConfirm = async (_id) => {
        axios.delete("http://localhost:4000/financial/" + selectedItem)
            .then((result) => {
                notification.success({
                    message: 'Deleted Successful',
                    description: 'You have successfully Deleted Report',
                });
                setIsDeleteModalOpen(false); // Hide the delete modal
                refresh();
            }).catch((err) => {
                console.log(err);
            })
    };
    //added pdf method
    const generatePdf = () => {
        const watermarkTitle = 'Financial Report';
        // Create the PDF document
        var doc = new jsPDF();
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(10, 10, 'Financial Summary');
        doc.setFillColor(220, 220, 220);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');

        //header and columns of the pdf
        doc.autoTable(
            {
                columns: [
                    { header: 'Name', dataKey: 'name' },
                    { header: ' Type', dataKey: 'type' },
                    { header: 'Date', dataKey: 'date' },
                    { header: 'Venue', dataKey: 'venue' },
                    { header: 'Total Funds', dataKey: 'total' },
                    { header: 'Status', dataKey: 'status' },


                ],
                body: financial.map(financial => {
                    return {
                        Row: Row,
                        name: financial.name,
                        type: financial.type,
                        date: financial.date,
                        venue: financial.venue,
                        total: financial.total,
                        status: financial.status,
                    };
                }),
                didDrawPage: function (data) {
                    const pageSize = doc.internal.pageSize;
                    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
                    const x = pageWidth / 2;
                    const y = pageHeight / 2;
                    doc.setFontSize(65);
                    doc.setTextColor(255, 128, 128);
                    doc.text(watermarkTitle, x, y, null, null, 'center');

                }
            })
        doc.save('Financial Report.pdf')

    }

    //dashboard columns
    const columns = [{
        title: 'Donation Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="#">{text}</a>,
    }, {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',

    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',

    },
    ];


    const Columns = [{
        title: 'Program Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    }, {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Venue',
        dataIndex: 'venue',
        key: 'venue',
    }, {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
    }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Button icon={<EditTwoTone key={record._id} />} onClick={() => {
                    setIsEditModalOpen(true);
                    setSelectedItem(record)
                }}>

                </Button>
                <Button icon={<DeleteOutlined style={{ color: 'red' }} />}
                    onClick={() => {
                        handleDelete(record._id);
                        refresh();

                    }}
                />
            </Space>
        ),
    }];

    return (
        <>
            <div className='otherdash' style={{
                    minHeight: '100vh',
                    display: 'flex',
                  
                }}>

            <div style={{ paddingLeft: 150 }} >
            <br></br>
                <br></br>
                <div style={{ paddingLeft: 870 }} >
                    <Button onClick={() => { setIsModalOpen(true) }} type="primary">Create Report</Button>
                </div>
                <br></br>
                <br></br>
                <div style={{ padding: 1, alignItems: "center", width: 1000, height: 650, borderRadius: 5 }}>

                    <WrapperCard style={{ backgroundColor: "#37475E",borderRadius:5 }}>
                        <CustomRow style={{ justifyContent: "space-between", padding: "10px" }} >
                            <h1 style={{ color: "White", fontSize: 18 }}>Financial Summmary</h1>
                            <Col span={12} />
                            <Search
                                placeholder="input search text"
                                onChange={(e) => setSearchText(e.target.value)}
                                style={{
                                    width: 250,
                                }}
                            />
                            <Button icon={<FilePdfOutlined style={{ fontSize: '21px', color: 'red' }} />} onClick={generatePdf} />
                        </CustomRow>
                    </WrapperCard>

                    <Table columns={Columns} dataSource={financial.filter((item) =>
                        item.name.toLowerCase().includes(searchText.toLowerCase())
                    )} />

                    <AddFinancial
                        isOpen={isModalOpen}
                        handleCancel={handleCancel}
                        handleOk={addOrder}

                    />
                    <AddFinancial
                        isOpen={isEditModalOpen}
                        handleCancel={handleCancel}
                        handleOk={async () => { setIsEditModalOpen(false) }}
                        selectedItem={selectedItem}
                    />
                    <DeleteModal
                        isModalOpen={isDeleteModalOpen}
                        handleCancel={handleDeleteCancel}
                        handleOk={handleDeleteConfirm}
                        text="Do you want to delete the report details?"

                    />
                    <br></br>

                    <Card style={{ borderColor: "black" }}>
                        <h1 style={{ textAlign: "center" }}>Donation Details</h1>
                        <Table columns={columns} dataSource={ads} />
                        <Card>
                            <Row>
                                <Col span={18}>
                                    <h3>Total  : Rs {totalSum}</h3>
                                </Col>
                            </Row>
                        </Card>

                    </Card>


                </div>
            </div>
            </div>

        </>
    )
}

export default Financial