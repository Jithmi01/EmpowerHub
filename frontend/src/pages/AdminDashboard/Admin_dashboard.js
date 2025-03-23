import { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Progress } from "antd";
import WorkIcon from '@mui/icons-material/Work';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import axios from "axios";

const url1 = "http://localhost:4000/event/getAll";

function Admin() {
    const { Title } = Typography;
    const [donate, setDonate] = useState([]);
    const [jobList, setJobList] = useState([]);
    const [eventDetails, setAllEventDetails] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/jobHire/")
            .then((res) => setJobList(res.data))
            .catch((err) => alert(err.message));
    }, []);

    useEffect(() => {
        axios.get(url1)
            .then((res) => setAllEventDetails(res.data.Event))
            .catch(() => alert("Check The Connectivity"));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:4000/donation/")
            .then((res) => setDonate(res.data))
            .catch((err) => alert(err.message));
    }, []);

    const totalEvents = eventDetails.length;
    const totalDonations = donate.length;
    const totalJobs = jobList.length;

    const count = [
        {
            today: "Total Job Posted",
            title: totalJobs,
            icon: <WorkIcon style={{ fontSize: 40 }} />,  
            color: "#25476A", // Dark Blue
        },
        {
            today: "Total Donations",
            title: totalDonations,
            icon: <VolunteerActivismIcon style={{ fontSize: 40 }} />, 
            color: "#6A0DAD", // Purple
        },
        {
            today: "Total Events",
            title: totalEvents,
            icon: <EmojiEventsIcon style={{ fontSize: 40 }} />, 
            color: "#228B22", // Green
        },
    ];

    return (
        <div className="dashboard" style={{ backgroundSize: "cover", backgroundPosition: "center" }}>
            <div style={{ paddingLeft: 50, paddingRight: 50 }}>
                <div className="layout-content" style={{ padding: "16px" }}>
                    <Row gutter={[24, 0]}>
                        {count.map((c, index) => (
                            <Col key={index} xs={24} sm={24} md={8} lg={8} xl={8} className="mb-24">
                                <Card bordered={false} className="circlebox" style={{ backgroundColor: c.color, color: "white", fontSize: 28, fontWeight: "bold", textAlign: "left", padding: 20, boxShadow: "2px 10px 10px 2px lightblue" }}>
                                    <div className="number" style={{ fontSize: 26, fontFamily: "serif" }}>
                                        <Row align="middle">
                                            <Col span={24}>{c.icon}</Col>
                                            <Col span={24}>
                                                <Title level={2} style={{ color: "white", fontSize: 36 }}>{c.title}</Title>
                                                <span style={{ fontSize: 22 }}>{c.today}</span>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <br />
                    <Card style={{ boxShadow: "2px 5px 5px 5px lightblue", padding: 20 }}>
                        <Title level={2} style={{ fontSize: 30, textAlign: "left",marginTop:"-10px" }}>Details Bar</Title>
                        <Card style={{ backgroundColor: "#f5f5f5", padding: 20, boxShadow: "none" }}>
                            <Progress percent={totalDonations} strokeColor="#6A0DAD" style={{ height: 20 }} />
                            <span style={{ fontSize: 20, display: "block", textAlign: "left" }}>Total Donations</span>
                            <Progress percent={totalEvents} strokeColor="#228B22" style={{ height: 20 }} />
                            <span style={{ fontSize: 20, display: "block", textAlign: "left" }}>Total Events</span>
                            <Progress percent={totalJobs} strokeColor="#25476A" style={{ height: 20 }} />
                            <span style={{ fontSize: 20, display: "block", textAlign: "left" }}>Total Job Posted</span>
                        </Card>
                    </Card>
                    <br />
                </div>
            </div>
        </div>
    );
}

export default Admin;