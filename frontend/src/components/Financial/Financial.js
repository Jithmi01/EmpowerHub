import React, { useState, useEffect } from 'react';
import { Table, Card, Col, Row } from 'antd';
import axios from 'axios';
import CustomRow from '../common/Form_header';
import WrapperCard from '../common/Wrapper_card';

const Financial = () => {
    const [donation, setDonation] = useState([]);
    const [totalSum, setTotalSum] = useState(0);

    useEffect(() => {
        getDonations();
    }, []);

    const getDonations = async () => {
        try {
            const res = await axios.get('http://localhost:4000/donation/');
            setDonation(res.data);
            const amount = res.data.reduce((acc, row) => acc + row.amount, 0);
            setTotalSum(amount);
        } catch (err) {
            alert(err.message);
        }
    };

    const columns = [
        {
            title: <span style={{ color: 'white', fontWeight: 'bold' }}>Donation Name</span>,
            dataIndex: 'name',
            key: 'name',
            render: text => <span style={{ color: 'black', fontWeight: 'bold' }}>{text}</span>,
        },
        {
            title: <span style={{ color: 'white', fontWeight: 'bold' }}>Amount (Rs.)</span>,
            dataIndex: 'amount',
            key: 'amount',
            render: text => <span style={{ color: 'black', fontWeight: 'bold' }}>{text}</span>,
        },
        {
            title: <span style={{ color: 'white', fontWeight: 'bold' }}>Status</span>,
            dataIndex: 'status',
            key: 'status',
            render: text => <span style={{ color: 'black', fontWeight: 'bold' }}>{text}</span>,
        },
    ];

    return (
        <div className="financial-container">
            <Card className="financial-card">
            <WrapperCard style={{ backgroundColor: '#0D1A45', height: '50px', paddingTop: '10px', borderRadius: 6, marginTop: '15px' }}>
                    <CustomRow style={{ justifyContent: 'center' }}>
                        <h2 style={{ color: 'white', margin: 0, fontSize: '24px' }}>Donation History</h2>
                    </CustomRow>
                </WrapperCard> 
                <br/>               
                <Table 
                    columns={columns} 
                    dataSource={donation} 
                    pagination={false} 
                    rowClassName={(record, index) => (index % 2 === 0 ? "even-row" : "odd-row")}
                    bordered
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
            font-size:18px;
        }
        .ant-table-tbody > tr > td {
            color: black !important;
            font-weight: bold !important;
        }
        .total-row {
            background-color: #90EE90 !important;
        }
        .total-text {
            font-size: 24px !important;
            font-weight: bold !important;
        }
          `}
        </style>
                <Card className="total-card total-row">
                    <Row>
                        <Col span={15}>
                            <h3 className="total-text">Total: Rs {totalSum}</h3>
                        </Col>
                    </Row>
                </Card>
            </Card>
        </div>
    );
};

export default Financial;
