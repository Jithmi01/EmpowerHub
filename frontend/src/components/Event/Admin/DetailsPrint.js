import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import '../Event-Main.css'
import { useReactToPrint } from "react-to-print";
import { Button, Descriptions, Space } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";

const DetailsPrint = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Event Details",
    });

    const [eventNo, seteventNo] = useState("");
    const [eventName, seteventName] = useState("");
    const [eventPlace, seteventPlace] = useState("");
    const [eventDetails, seteventDetails] = useState("");
    const [eventDate, seteventDate] = useState("");

    const { id } = useParams();

    const getEventDetails = () => {
        axios
            .get("http://localhost:4000/event/get/" + id)
            .then((res) => {
                const updateDetails = {
                    eventNo: res.data.Event.eventNo,
                    eventName: res.data.Event.eventName,
                    eventPlace: res.data.Event.eventPlace,
                    eventDetails: res.data.Event.eventDetails,
                    eventDate: res.data.Event.eventDate,
                    eventStatus: res.data.Event.eventStatus,
                };
                // console.log(updateDetails);
                seteventNo(updateDetails.eventNo);
                seteventName(updateDetails.eventName);
                seteventPlace(updateDetails.eventPlace);
                seteventDetails(updateDetails.eventDetails);
                seteventDate(updateDetails.eventDate);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const [loadings, setLoadings] = useState([]);
    const downLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 900);
    };
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 900);
    }
    useEffect(() => getEventDetails(), []);

    return (

        <div className="main-container">

            <div className="sub-container" style={{ border: "solid 1px black", borderRadius: "7px" }}>

                <div className="form" ref={componentRef}>

                    <Descriptions title="Event Info" layout="vertical" bordered
                        style={{ marginRight: "8%", border: "solid 1px black", borderRadius: "10px", padding: "15px" }}>
                        <Descriptions.Item label="Event Number">{eventNo}</Descriptions.Item>
                        <Descriptions.Item label="Event Date" span={2}>
                            {eventDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="Event Name" span={3}>
                            {eventName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Event Location" span={3}>
                            {eventPlace}
                        </Descriptions.Item>
                        <Descriptions.Item label="Event Description" span={3}>
                            {eventDetails}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                <Space direction="horizontal"
                    style={{ display: "flex", justifyitem: "center", marginLeft: "43%", marginBottom: "5%" }}>

                    <Space wrap>
                        <Button type="primary" loading={loadings[0]} onClick={() => downLoading(0)} onClickCapture={handlePrint} style={{
                            display: "flex",
                            justifyitem: "center",
                            marginRight: "50px",
                        }}>
                            Download
                        </Button>

                    </Space>

                    <Space wrap>
                        <Link to={"/dashboard"}>
                            <Button
                                type="primary" danger
                                loading={loadings[1]}
                                onClick={() => enterLoading(1)}
                            >
                                Cancel
                            </Button>
                        </Link>
                    </Space>
                </Space>
            </div>

        </div>

    );
}
export default DetailsPrint;