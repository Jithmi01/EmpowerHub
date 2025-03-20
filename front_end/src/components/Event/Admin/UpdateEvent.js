import { Button, DatePicker, Form, Input, Modal, Space, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomRow from "../../common/Form_header";
import WrapperCard from "../../common/Wrapper_card";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ExclamationCircleFilled } from "@ant-design/icons";
dayjs.extend(customParseFormat);

const UpdateEvent = () => {


    const [validated, setValidated] = useState(false);

    // const handleSubmit = (event) => {
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }

    //     setValidated(true);
    // };

    // const history = useNavigate();

    const [eventNo, seteventNo] = useState("");
    const [eventName, seteventName] = useState("");
    const [eventPlace, seteventPlace] = useState("");
    const [eventDetails, seteventDetails] = useState("");
    const [eventDate, seteventDate] = useState("");

    // const { id } = useParams();

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
                console.log(updateDetails);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // get the form data from state or refs
        const newEvent = {
            eventNo,
            eventName,
            eventPlace,
            eventDetails,
            eventDate,
        };
        // show a confirmation dialog
        Modal.confirm({
            title: 'Do you want to add this event?',
            icon: <ExclamationCircleFilled />,
            content: 'When clicked the OK button, this details will be added to the list.',
            async onOk() {
                // send the data to the backend API
                return await new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.1 ? resolve : reject, 1000);
                    axios
                        .put(
                            "http://localhost:4000/event/update/" + id,
                            newEvent
                        )
                        .then(() => {
                            // alert("Details Successfully Updated!");

                            //navigate("/MainClaimPage");
                        })
                        .catch((err) => {
                            alert(err.message);
                        });
                })
            },
            onCancel() {
                // handle cancel action
                console.log("Cancel");
            }
        });
    };

    useEffect(() => getEventDetails(), []);
    // const location = useLocation();

    const [showA, setShowA] = useState(false);


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const layout = {
        labelCol: {
            span: 8,

        },
        wrapperCol: {
            span: 90,
        },
    };

    // /* eslint-disable no-template-curly-in-string */
    // const validateMessages = {
    //     required: '${label} is required!',
    //     types: {
    //         email: '${label} is not a valid email!',
    //         number: '${label} is not a valid number!',
    //     },
    //     number: {
    //         range: '${label} must be between ${min} and ${max}',
    //     },
    // };
    // /* eslint-enable no-template-curly-in-string */

    const onFinish = (values) => {
        console.log(values);
    };

    const onChange = (eventDate, dateString) => {
        seteventDate(dateString);
    };

    const dateFormat = 'YYYY-MM-DD'

    return (

        <div className="main-container">

            <div className="sub-container">

                <WrapperCard style={{ backgroundColor: "#37475E" }}>
                    <CustomRow style={{ justifyContent: "space-between", padding: "16px" }} >
                        <h1 style={{ color: "White" }}>update event</h1>
                    </CustomRow>
                </WrapperCard>
                <div className="form">
                    <Form
                        {...layout}
                        name="nest-messages"
                        onFinish={onFinish}
                        onSubmitCapture={handleSubmit}
                        style={{
                            maxWidth: 700,
                        }}
                        labelAlign="left"
                    >

                        <Form.Item
                            name="eventNo"
                            label="Event No"

                        >
                            <Input style={{ backgroundColor: "white" }} placeholder={eventNo} disabled onChange={(e) => {
                                seteventNo(e.target.value);
                            }} />
                        </Form.Item>

                        <Form.Item
                            name="eventName"
                            label="Event Name"

                            style={{ paddingTop: "5%" }}
                        >
                            <Typography>
                                <Input value={eventName} onChange={(e) => {
                                    seteventName(e.target.value)
                                }} />
                            </Typography>
                        </Form.Item>

                        <Form.Item
                            name="eventPlace"
                            label="Event Location"

                            style={{ paddingTop: "5%" }}
                        >
                            <Typography>
                                <Input value={eventPlace} onChange={(e) => {
                                    seteventPlace(e.target.value)
                                }} />
                            </Typography>
                        </Form.Item>

                        <Form.Item
                            name="eventDate"
                            label="Event Date"

                            style={{ paddingTop: "5%" }}
                        >
                            <Typography>
                                <DatePicker value={eventDate && dayjs(eventDate, dateFormat)} 
                                    onChange={onChange} />
                            </Typography>

                        </Form.Item>

                        <Form.Item

                            name="eventDetails"
                            label="Event Description"

                            style={{ paddingTop: "5%" }}
                        >
                            <Typography>
                                <Input.TextArea value={eventDetails} onChange={(e) => {
                                    seteventDetails(e.target.value)
                                }} />
                            </Typography>
                        </Form.Item>


                        <Form.Item
                            wrapperCol={{
                                ...layout.wrapperCol,
                                offset: 10,
                            }}
                        >
                            <section className="btn-controller">
                                <Button htmlType="submit" className="add-btn btn"
                                // onSubmit={(e) => {
                                //     e.preventDefault();}}
                                >
                                    submit
                                </Button>

                                <Button htmlType="reset" className="reset-btn btn">
                                    cancel
                                </Button>
                            </section>
                        </Form.Item>

                        {/* <Form.Item
                            wrapperCol={{
                                ...layout.wrapperCol,
                                offset: 18,
                            }}
                        >
                            <Button type="primary" htmlType="reset" className="add-btn">
                                Reset
                            </Button>
                        </Form.Item> */}
                    </Form>
                </div>
            </div>
        </div>
    );
}
export default UpdateEvent;
