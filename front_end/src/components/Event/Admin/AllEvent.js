import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import WrapperCard from "../../common/Wrapper_card";
import CustomRow from "../../common/Form_header";
import { Badge, Button, Card, Collapse, Input, Modal, Space, Typography } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
const { Search } = Input;

const AllEvent = () => {

    const [dropdown, setDropdown] = useState("OPEN");
    const [eventDetails, setAllEventDetails] = useState([]);
    const [searchDetail, setsearchDetail] = useState("");
    const [eventId, setEventId] = useState("");
    const [count, setcount] = useState(0);
    const [eventCounts, setEventCounts] = useState({});


    const { confirm } = Modal;


    function getAllEventDetails() {
        axios
            .get("http://localhost:4000/event/getAll")
            .then((res) => {
                // console.log(res);
                setAllEventDetails(res.data.Event);
                // setEventId(res.data.Event[0]._id);
            })
            .catch(() => {
                alert("Check The Connectivity");
            });
    }
    // console.log(eventDetails);
    useEffect(() => getAllEventDetails(), []);

    function deleteEventDetail(id) {
        // if (window.confirm("Are You Sure Want To Delete?")) {
        axios
            .delete("http://localhost:4000/event/delete/" + id)
            .then(() => {
                // alert("Document Delete Successfully!");
                window.location.reload(false);
            })
            .catch(() => {
                alert("Error Occurred On Delete");
            });
        // }
    }
    const showPromiseConfirm = (val) => {
        confirm({
            title: 'Do you want to delete these items?',
            icon: <ExclamationCircleFilled />,
            content: 'When clicked the OK button, this details will be deleted from the list.',
            async onOk() {
                try {
                    return await new Promise((resolve, reject) => {
                        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                        deleteEventDetail(val._id)
                    });
                } catch {
                    return console.log('Oops errors!');
                }
            },
            onCancel() { },
        });
    };
    console.log(count)

    const handleEventSelect = (eventId) => {
        setEventId(eventId);
        setcount(0); // reset count to zero
        axios
            .get(`http://localhost:4000/event/${eventId}/registered-entities-count`)
            .then((res) => {
                setcount(res.data);
            })
            .catch(() => {
                alert("Something Went wrong on count");
            });
    };

    const showCount = (eid, cid) => {
        if (eid === cid) {
            return count.count
        }
        else { return 0 }
    }

    const [showA, setShowA] = useState(false);


    const [show, setShow] = useState(false);


    const { Panel } = Collapse;

    const [activeTabKey1, setActiveTabKey1] = useState('tab1');
    const [activeTabKey2, setActiveTabKey2] = useState('app');



    return (
        <div className='otherdash' style={{
            minHeight: '100vh',
            display: 'flex',
          
        }}>
        <div className="main-container">

            <div className="sub-container">

                <WrapperCard style={{ backgroundColor: "#37475E" }}>
                    <CustomRow style={{ justifyContent: "space-between", padding: "16px" }} >
                        <h1 style={{ color: "White" }}>Event Main</h1>
                    </CustomRow>
                </WrapperCard>

                <section className="main_addbtn-controller">
                    <Link to={'/addevent'}>
                        <Button htmlType="submit" className="main_addbtn" >
                            Add
                        </Button>
                    </Link>
                    <Space direction="vertical">
                        <Search
                            placeholder="input search text"
                            allowClear
                            enterButton="Search"
                            size="middle"
                            onSearch={setsearchDetail}
                            style={{
                                marginLeft: "173%"
                            }}
                        />
                    </Space>
                </section>
                {eventDetails
                    ?.filter((val) => {
                        if (searchDetail === " ") {
                            return val;
                        } else if (
                            val.eventNo
                                .toLowerCase()
                                .includes(searchDetail.toLowerCase()) ||
                            val.eventDate
                                .toLowerCase()
                                .includes(searchDetail.toLowerCase()) ||
                            val.eventName
                                .toLowerCase()
                                .includes(searchDetail.toLowerCase())
                        ) {
                            return val;
                        }
                    })
                    .map((eventDetailsVal, index) => (
                        <div className="event_main">

                            <Collapse accordion>
                                <Panel header={
                                    <Space>
                                        <Badge
                                            className="site-badge-count-109"
                                            count={eventDetailsVal.eventNo}
                                            style={{
                                                backgroundColor: 'volcano',
                                                fontSize: "16px",
                                            }}
                                        />
                                    </Space>
                                } extra={
                                    <Space>
                                        <Badge
                                            className="site-badge-count-109"
                                            count={eventDetailsVal.eventDate}
                                            style={{
                                                backgroundColor: 'purple',
                                                fontSize: "14px"
                                            }} />
                                    </Space>
                                } key="1">

                                    <Card title={eventDetailsVal.eventName} extra={
                                        <div className="main_btn-controller">
                                            {/* <Link >
                                                <Button htmlType="reset" onClick={() => handleEventSelect(eventDetailsVal._id)} className="print_btn">
                                                    participants
                                                </Button>
                                            </Link> */}
                                            <Link
                                                to={
                                                    "/updateEvent/" +
                                                    eventDetailsVal._id
                                                }
                                            >
                                                <Button htmlType="submit" className="delete_btn" >
                                                    Edit
                                                </Button>
                                            </Link>

                                            <Link to={"/printDetails/" +
                                                eventDetailsVal._id}>
                                                <Button htmlType="reset" className="print_btn">
                                                    Print
                                                </Button>
                                            </Link>

                                            <Link>
                                                <Button htmlType="reset" className="edit_btn" onClick={() => showPromiseConfirm(eventDetailsVal)}>
                                                    Delete
                                                </Button>
                                            </Link>
                                        </div>
                                    }>


                                        <Typography style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px" }}>
                                            <Button htmlType="reset" style={{ textAlign: 'left', backgroundColor: "#dbe0ed", width: "15%" }} onClick={() => handleEventSelect(eventDetailsVal._id)} className="print_btn">
                                                participants
                                            </Button>
                                            {/* <pre onClick={() => handleEventSelect(eventDetailsVal._id)} >Participants</pre> */}
                                            {/* <pre style={{ textAlign: 'right' }}>{showCount(eventDetailsVal._id, count.id)}</pre> */}

                                            <Link to={"/AllParticipants/" + eventDetailsVal._id}>
                                                <Button htmlType="reset" style={{ textAlign: 'right', backgroundColor: "#dbe0ed", width: "15%", marginRight: "3%" }} className="print_btn">
                                                    {showCount(eventDetailsVal._id, count.id)}
                                                </Button>
                                            </Link>
                                        </Typography>


                                        <Card style={{
                                            width: '100%',
                                        }}
                                            title="Location"

                                        >
                                            {eventDetailsVal.eventPlace}
                                        </Card>

                                        <br />
                                        <Card
                                            style={{
                                                width: '100%',
                                            }}
                                            title="Description"

                                        >
                                            {eventDetailsVal.eventDetails}
                                        </Card>

                                    </Card>
                                </Panel>

                            </Collapse><br />
                        </div>
                    ))}
            </div>
        </div>
        </div>

    );

};
export default AllEvent;