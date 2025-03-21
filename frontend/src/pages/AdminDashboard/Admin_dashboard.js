import { useEffect, useState } from "react"
import logo from "../../assets/images/logo.png"
import { DualAxes } from '@ant-design/plots';
import { Card, Col, Row, Typography, Table, Progress } from "antd"
import { AppstoreTwoTone, UserOutlined } from "@ant-design/icons"
import axios, { Axios } from 'axios';

const url = "http://localhost:4000/financial/";
const url1 = "http://localhost:4000/event/getAll";

function Admin() {
    const { Title, Text } = Typography
    const [donate, setDonate] = useState([]);
    const [users, setUser] = useState()
    const [jobList, setJobList] = useState([]);
    const [financial, setFinancial] = useState([]);
    const [items, setItems] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    const [eventDetails, setAllEventDetails] = useState([]);

    function getJobList() {
        axios.get("http://localhost:4000/jobHire/")
            .then((res) => {
                setJobList(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }
    useEffect(() => {
        getJobList();
    }, [])

    function getAllEventDetails() {
        axios
            .get("http://localhost:4000/event/getAll")
            .then((res) => {
                setAllEventDetails(res.data.Event);
            })
            .catch(() => {
                alert("Check The Connectivity");
            });
    }
    // console.log(eventDetails);
    useEffect(() => getAllEventDetails(), []);
    //get Donation
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

    const totalevents = eventDetails.length;
    const totalFReport = financial.length;
    const totalDonation = donate.length;
    const totaljOB = jobList.length;



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

    useEffect(() => {
        getFinancial().then((va) => {
            console.log(`===> ${financial}`)
        })
    }, []);

    // useEffect(() => {
    //     const getData = async () => {
    //         const response = await fetch(url);
    //         const financial = await response.json();
    //         setFinancial(financial);
    //         console.timeLog(financial);
    //     };
    //     getData()
    // }, []);

    useEffect(() => {
        if (financial) {
            const total = financial.reduce((acc, row) => acc + row.total, 0);
            setTotalSum(total);
        }
    }, [financial]);

    const count = [
        {
            today: "Total Job posted",
            title: `${totaljOB}`,
            icon: <UserOutlined />,
            bnb: "bnb2",
        },
        {
            today: "Total Donation",
            title: `${totalDonation}`,
            icon: <AppstoreTwoTone />,
            bnb: "bnb2",

        },
        {
            today: "Total Events",
            title: `${totalevents}`,
            icon: <AppstoreTwoTone />,
            bnb: "redtext",


        },
        {
            today: "Total Financial Report",
            title: `${totalFReport}`,
            icon: <UserOutlined />,
            bnb: "bnb2",
        },

    ]


    const columns = [
        {
            title: 'Financial History',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },

    ];
    return (
        <>
            <div
                className="dashbaord"
                style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "repeat",


                }}
            >
                <div style={{ paddingLeft: 100 }} >
                    <div style={{ paddingLeft: 70 }} ></div>
                    <Col span={5} />

                    <div className="layout-content" style={{ padding: "16px", paddingLeft: 25 }}>
                        <Row className="rowgap-vbox" gutter={[24, 0]}>
                            {count.map((c, index) => (
                                <Col
                                    key={index}
                                    xs={24}
                                    sm={24}
                                    md={12}
                                    lg={6}
                                    xl={6}
                                    className="mb-24"
                                >
                                    <Card bordered={false} className="criclebox" style={{ boxShadow:"2px 10px 10px 2px lightblue",backgroundColor:"#25476A",fontWeight:"bold",fontSize:25,color:"white"}}>
                                        <div className="number"  style={{fontSize:20,fontFamily:"serif"}}>
                                            <Row align="middle" gutter={[35, 7]}>
                                                <Col xs={18}>
                                                    <span>{c.today}</span>
                                                    <Title level={3}>
                                                        {c.title} <small className={c.bnb}></small>
                                                    </Title>
                                                </Col>
                                                <Col xs={7}>
                                                    <div className="icon-box">{c.icon}</div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        <br></br><br></br><br></br><br></br>
                        <Row >
                            <div>
                                <Card style={{ boxShadow:"2px 5px 5px 5px lightblue"}}>
                                    <h1>Details Bar</h1>
                                    <Progress percent={totalFReport} strokeColor="red" />
                                    <span>Total Financial Report</span>

                                    <Progress percent={totalDonation} strokeColor="#2db7f5" Text="hello" />
                                    <span>Total Donation</span>

                                    <Progress percent={totalevents} strokeColor="#87d068" />
                                    <span>Total Events</span>

                                    <Progress percent={totaljOB} strokeColor="blue" />
                                    <span>Total Job posted</span>

                                </Card>
                            </div>
                            <Col span={1} />
                            <Card style={{ boxShadow:"2px 5px 5px 5px lightblue"}}>
                                <div>
                                    <Table columns={columns} dataSource={financial} />
                                    <Card><Row>
                                        <Col span={18}>
                                            <h3>Total  : Rs {totalSum}</h3>
                                        </Col>
                                    </Row></Card>



                                </div>
                            </Card>
                        </Row>
                        <br>
                        </br>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin
