import React, { useState, useEffect } from 'react'
import { Table, Icon, Button, Space, Input, Col, Row, Card } from 'antd';
import axios from "axios";
import { EditTwoTone, DeleteOutlined, DeleteTwoTone, DownloadOutlined, FilePdfOutlined, FilePdfTwoTone, SelectOutlined, MessageOutlined } from '@ant-design/icons';
import CustomRow from '../common/Form_header';
import WrapperCard from '../common/Wrapper_card';

import jsPDF from 'jspdf';
import 'jspdf-autotable'
import { Link, useParams } from 'react-router-dom';
import '../../assets/styles/showDonate.css'
import one from '../../assets/images/1.jpg';
import five from '../../assets/images/5.jpg';
import fifty from '../../assets/images/50th.jpg';
import cent from '../../assets/images/100.jpg';
import ten from '../../assets/images/10.png';
import tenk from '../../assets/images/10k.png';
import k20 from '../../assets/images/20k.jpg';
import moh from '../../assets/images/moh.jpg';

const { Search } = Input;

const Donations = () => {
    const [trans, setTrans] = useState([]);
    const [donate, setDonate] = useState([]);
    const [column, setColumns] = useState([]);
    const [ran, setran] = useState([]);
    const [selectedDonation, setSelected] = useState([])
    const { _id } = useParams();
    const [searchText, setSearchText] = useState("");
    function getDonations() {
        axios.get("http://localhost:4000/donation/")
            .then((res) => {
                setDonate(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }
    useEffect(() => {
        getDonations();
    }, [])

    async function handleUpdateStatus(id, value) {

        // console.log(id, value);




        axios

            .patch(
                `http://localhost:4000/donation/${id}`,
                {
                    eventStatus: value,
                },
                { headers: { "Content-Type": "application/json" } }
            )
            .then(() => {
                // alert("Details Successfully Updated!");
                window.location.reload(false);
            })
            .catch((err) => {
                alert(err.message);
            });
    }

    const generatePdf = () => {
        const watermarkTitle = 'My Donations Report';
        // Create the PDF document
        var doc = new jsPDF();
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(10, 10, 'My Donations Report');
        doc.setFillColor(220, 220, 220);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');

        //header and columns of the pdf
        doc.autoTable(
            {
                columns: [
                    { header: 'Name', dataKey: 'name' },
                    { header: ' Email', dataKey: 'email' },
                    { header: 'Contact Number', dataKey: 'contact' },
                    { header: 'Amount Donated', dataKey: 'amount' },
                    { header: 'Status', dataKey: 'status' },
                    { header: 'Donated To ', dataKey: 'helpGiven' },


                ],
                body: donate.map(donate => {
                    return {
                        Row: Row,
                        name: donate.name,
                        email: donate.email,
                        contact: donate.contact,
                        amount: donate.amount,
                        status: donate.status,
                        helpGiven: donate.helpGiven,
                    };
                }),
                didDrawPage: function (data) {
                    const pageSize = doc.internal.pageSize;
                    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
                    const x = pageWidth / 2;
                    const y = pageHeight / 2;
                    doc.setFontSize(35);
                    doc.setTextColor(255, 128, 128);
                    doc.text(watermarkTitle, x, y, null, null, 'center');

                }
            })
        doc.save('My Donations Report.pdf')

    }

    const totalAmount = donate.reduce((sum, item) => sum + item.amount, 0);
    const onSearch = (value) => console.log(value);

    // const columns = [{
    //     title: 'Donation Name',
    //     dataIndex: 'name',
    //     key: 'name',
    //     render: text => <a href="#">{text}</a>,
    // }, {
    //     title: 'Fund',
    //     dataIndex: 'address',
    //     key: 'address',
    // },
    // ];


    const Columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    }, {
        title: 'Contact Number',
        dataIndex: 'contact',
        key: 'contact',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        // }, {
        //     title: 'Status',
        //     dataIndex: 'status',
        //     key: 'status',
    },
    {
        title: 'Donated To',
        dataIndex: 'helpGiven',
        key: 'helpGiven',
        // }, {
        //     title: 'Status',
        //     dataIndex: 'status',
        //     key: 'status',
    },
    ];
    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <br></br>



            <div style={{ paddingLeft: 150 }} >

                <h2 className='tete'>My Donation History</h2>



                <div style={{ padding: 1, alignItems: "center", width: 900, height: 650, borderRadius: 5 }}>

                    <Card style={{ backgroundColor: "purple" }}>
                        <WrapperCard style={{ backgroundColor: "#37475E", borderRadius: 5 }}>
                            <CustomRow style={{ justifyContent: "space-between", padding: "10px" }} >
                                <h1 style={{ color: "White", fontSize: 18, paddingLeft: 25 }}>Donation History</h1>
                                <Col span={2} />
                                <div style={{ paddingRight: 50 }}>
                                    <Search
                                        placeholder="Input Search Text"
                                        onChange={(e) => setSearchText(e.target.value)}
                                        style={{
                                            width: 200,
                                        }}
                                    />
                                </div>

                                <Button icon={<FilePdfOutlined style={{ fontSize: '22px', color: 'red' }} />} onClick={generatePdf} />
                            </CustomRow>
                        </WrapperCard>

                        <Table columns={Columns} dataSource={donate.filter((item)=>
                        item.name.toLowerCase().includes(searchText.toLowerCase()))}
                            bordered
                        // title={() => 'Financial Details'}
                        />
                    </Card>

                </div>
                {/* Achievements start here*/}
                <h1 className='achTete'>Achievements</h1>
                <div className='achBorder'>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 20 }}>
                        <Card style={{ backgroundColor: 'transparent' }}>
                            <d>My first Donation</d>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={one}
                                    alt="First Image"
                                    style={{ borderRadius: '50%', width: 100, height: 100, opacity: donate.length > 0 ? 1 : 0.2 }}
                                />

                                {donate.length > 0 && <span style={{ position: 'absolute', top: 10, left: 40, color: 'white' }}></span>}

                            </div>
                        </Card>
                        <Card style={{ backgroundColor: 'transparent' }}>
                            <d>Passed Ten Thousand</d>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={tenk}
                                    alt="Second Image"
                                    style={{ borderRadius: '50%', width: 100, height: 100, opacity: totalAmount > 10000 ? 1 : 0.2 }}
                                />
                                {totalAmount > 10000 && <span style={{ position: 'absolute', top: 10, left: 40, color: 'white' }}></span>}
                            </div>
                        </Card>
                        <Card style={{ backgroundColor: 'transparent' }}>
                            <d>Passed Twenty Thousand</d>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={k20}
                                    alt="Third Image"
                                    style={{ borderRadius: '50%', width: 100, height: 100, opacity: totalAmount > 20000 ? 1 : 0.2 }}
                                />
                                {totalAmount > 20000 && <span style={{ position: 'absolute', top: 10, left: 40, color: 'white' }}></span>}
                            </div>
                        </Card>

                    </div>
                    <br></br>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 10 }}>
                        <Card style={{ backgroundColor: 'transparent' }}>
                            <d>My Fifth Donation</d>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={five}
                                    alt="Fourth Image"
                                    style={{ borderRadius: '50%', width: 100, height: 100, opacity: donate.length > 5 ? 1 : 0.2 }}
                                />
                                {donate.length > 5 && <span style={{ position: 'absolute', top: 10, left: 40, color: 'white' }}></span>}
                            </div>
                        </Card>
                        <Card style={{ backgroundColor: 'transparent' }}>
                            <d>My Tenth Donation</d>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={ten}
                                    alt="Fifth Image"
                                    style={{ borderRadius: '50%', width: 100, height: 100, opacity: donate.length > 10 ? 1 : 0.2 }}
                                />
                                {donate.length > 10 && <span style={{ position: 'absolute', top: 10, left: 40, color: 'white' }}></span>}
                            </div>
                        </Card>
                        <Card style={{ backgroundColor: 'transparent' }}>
                            <d>My Fiftieth Donation</d>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={fifty}
                                    alt="Third Image"
                                    style={{ borderRadius: '50%', width: 100, height: 100, opacity: donate.length > 50 ? 1 : 0.2 }}
                                />
                                {donate.length > 50 && <span style={{ position: 'absolute', top: 10, left: 40, color: 'white' }}></span>}
                            </div>
                        </Card>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 20 }}>
                        <Card style={{ backgroundColor: 'transparent' }}>
                            <d>My 100th Donation</d>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={cent}
                                    alt="Fourth Image"
                                    style={{ borderRadius: '50%', width: 100, height: 100, opacity: donate.length > 100 ? 1 : 0.2 }}
                                />
                                {donate.length > 100 && <span style={{ position: 'absolute', top: 10, left: 40, color: 'white' }}></span>}
                            </div>
                        </Card>
                        <Card style={{ backgroundColor: 'transparent' }}>
                            <d>Passed 100K</d>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={moh}
                                    alt="Third Image"
                                    style={{ borderRadius: '50%', width: 100, height: 100, opacity: totalAmount > 100000 ? 1 : 0.2 }}
                                />
                                {totalAmount > 100000 && <span style={{ position: 'absolute', top: 10, left: 40, color: 'white' }}></span>}
                            </div>
                        </Card>
                        {/* <Card>
                    <d>My first Donation</d>
                        <div style={{ position: 'relative' }}>
                            <img
                                src={fifty}
                                alt="Third Image"
                                style={{ borderRadius: '50%', width: 100, height: 100, opacity: totalAmount > 5000000 ? 1 : 0.2 }}
                            />
                            {totalAmount > 5000000 && <span style={{ position: 'absolute', top: 10, left: 40, color: 'white' }}>2</span>}
                        </div>
                    </Card> */}

                    </div>
                    <br></br>

                </div>
                {/*Achievements Ends here*/}
            </div>



        </>
    )
}

export default Donations