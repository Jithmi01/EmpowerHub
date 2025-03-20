import React, { useState } from "react";
import axios from "axios";
import WrapperCard from "../../common/Wrapper_card";
import {
    Button,
    DatePicker,
    Form,
    Input,
    Modal,
} from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import CustomRow from "../../common/Form_header";
import '../Event-Main.css'
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const AddEvent = () => {

    const [eventNo, seteventNo] = useState("");
    const [eventName, seteventName] = useState("");
    const [eventPlace, seteventPlace] = useState("");
    const [eventDetails, seteventDetails] = useState("");
    const [eventDate, seteventDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // get the form data from state or refs
        const EventSchema = {
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
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                    axios
                        .post("http://localhost:4000/event/addevent", EventSchema)
                        .then(() => {
                            window.location.reload(false);
                        })
                        .catch((err) => {
                            alert(err);
                            console.log(EventSchema)
                        });
                })
            },
            onCancel() {
                // handle cancel action
                console.log("Cancel");
            }
        });
    };

    const onFinish = (values) => {
        console.log(values);
    };

    const onChange = (eventDate, dateString) => {
        seteventDate(dateString);
    };

    const layout = {
        labelCol: {
            span: 8,

        },
        wrapperCol: {
            span: 90,
        },
    };

    const dateFormat = 'YYYY-MM-DD'

    return (
        <div className="main-container">

            <div className="sub-container">

                <WrapperCard style={{ backgroundColor: "#37475E" }}>
                    <CustomRow style={{ justifyContent: "space-between", padding: "16px" }} >
                        <h1 style={{ color: "White" }}>Add  a event</h1>
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
                            rules={[
                                { required: true, message: '${label} is required!' },
                            ]}
                        >
                            <Input onChange={(e) => {
                                seteventNo(e.target.value);
                            }} />
                        </Form.Item>

                        <Form.Item
                            name="eventName"
                            label="Event Name"
                            rules={[
                                { required: true, message: '${label} is required!' },
                            ]}
                            style={{ paddingTop: "5%" }}
                        >
                            <Input onChange={(e) => {
                                seteventName(e.target.value)
                            }} />
                        </Form.Item>

                        <Form.Item
                            name="eventPlace"
                            label="Event Location"
                            rules={[
                                { required: true, message: '${label} is required!' },
                            ]}
                            style={{ paddingTop: "5%" }}
                        >
                            <Input onChange={(e) => {
                                seteventPlace(e.target.value)
                            }} />
                        </Form.Item>

                        <Form.Item
                            name="eventDate"
                            label="Event Date"
                            rules={[
                                { required: true, message: '${label} is required!' },
                            ]}
                            style={{ paddingTop: "5%" }}
                        >
                            <DatePicker format={dateFormat}
                                onChange={onChange} />

                        </Form.Item>

                        {/* <Form.Item name={['user', 'website']} label="Website"><Input /></Form.Item> */}

                        <Form.Item

                            name="eventDetails"
                            label="Event Description"
                            rules={[
                                { required: true, message: '${label} is required!' },
                            ]}
                            style={{ paddingTop: "5%" }}
                        >
                            <Input.TextArea onChange={(e) => {
                                seteventDetails(e.target.value)
                            }} />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                ...layout.wrapperCol,
                                offset: 10,
                            }}
                        >
                            <section className="btn-controller">
                                <Button htmlType="submit" className="add-btn btn">
                                    submit
                                </Button>

                                <Button htmlType="reset" className="reset-btn btn">
                                    Reset
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
};

export default AddEvent;
