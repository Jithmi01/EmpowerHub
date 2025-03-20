import React, { useState, useEffect } from 'react'
import { Table, Icon, Button, Space, Input, Col, Row, Modal, Form, Card } from 'antd';
import axios from "axios";
import { EditTwoTone, DeleteOutlined, DeleteTwoTone, DownloadOutlined, FilePdfOutlined, FilePdfTwoTone, SelectOutlined, MessageOutlined } from '@ant-design/icons';
import CustomRow from '../common/Form_header';
import WrapperCard from '../common/Wrapper_card';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const { Search } = Input;

const EditDonations = () => {
    const [trans, setTrans] = useState([]);
    const [donate, setDonate] = useState([]);
    const [column, setColumns] = useState([]);
    const [ran, setran] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [amount, setAmount] = useState();
    const [total, setTotal] = useState();
    const [status, setStatus] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();
    

    // function getDonations() {
    //     axios.get("http://localhost:4000/donation/" + id)
    //         .then((res) => {
    //             setDonate(res.data);
    //         })
    //         .catch((err) => {
    //             alert(err.message);
    //         });
    // }

    function changeDetails() {
        axios.get("http://localhost:4000/donation/" + id)
            .then((res) => {
                const updateDetails = {
                    name: res.data.name,
                    email: res.data.email,
                    contact: res.data.contact,
                    amount: res.data.amount,
                    total: res.data.total,
                    status: res.data.status,
                };
                console.log(updateDetails);
                setName(updateDetails.name);
                setEmail(updateDetails.email);
                setContact(updateDetails.contact);
                setAmount(updateDetails.amount);
                setTotal(updateDetails.total);
                setStatus(updateDetails.status);
            })
            .catch((err) => {
                alert(err.message);
            });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // get the form data from state or refs
        const newDonation = {
            name,
            email,
            contact,
            amount,
            total,
            status,
        };
        // show a confirmation dialog
        Modal.confirm({
            title: 'Do you want to update the changes?',
            icon: <ExclamationCircleFilled />,
            content: 'When clicked the OK button, this details will be added to the list.',
            async onOk() {
                // send the data to the backend API
                return await new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.1 ? resolve : reject, 1000);
                    axios
                        .put(
                            "http://localhost:4000/donation/" + id,
                            newDonation
                        )
                        .then(() => {
                            // alert("Details Successfully Updated!");

                            navigate("/showDonation");
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

    useEffect(() => {
        changeDetails();
    }, [])


    return (

        <><Col span={8} /><Row>
            <div style={{ paddingLeft: 500 }}>
                <Card style={{ width: 500, backgroundColor: "lightcyan" }}>
                    <h1>Edit Donor's Details</h1>
                    <Form>
                        <Form.Item
                            name="name"

                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            Name<Input value={name} onChange={(val) => {
                                setName(val.target.value);
                            }} />
                        </Form.Item>
                        <Form.Item
                            name="email"

                            rules={[
                                {
                                    type: 'email',
                                },
                            ]}
                        >
                            Email<Input value={email} onChange={(val) => {
                                setEmail(val.target.value);
                            }} />
                        </Form.Item>
                        <Form.Item
                            name="contact"

                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            Contact<Input value={contact} onChange={(val) => {
                                setContact(val.target.value);
                            }} />
                        </Form.Item>
                        <Form.Item
                            name="amount"
                        >
                            Enter Amount<Input value={amount} disabled onChange={(val) => {
                                setAmount(val.target.value);
                            }} />

                        </Form.Item>
                        {/* <Form.Item
                            name="total"
                        >
                            Enter Total<Input value={total} onChange={(val) => {
                                setTotal(val.target.value);
                            } } />
                        </Form.Item> */}
                        <Form.Item
                            name="status"
                        >
                            Enter status<Input value={status} disabled onChange={(val) => {
                                setStatus(val.target.value);
                            }} />

                        </Form.Item>
                        {/* <Form.Item defaultValue={1000} >
<Input
name='amount'
id="message"
onchange={handleChange}
/>
<h2> MEssage:{amount}</h2>
</Form.Item> */}
                        {/* <Form.Item name={['amount']} label="Payment">
<Button type="primary" ghost>
    1000
</Button>
<Button type="primary" ghost>
    2000
</Button>
<Button type="primary" ghost id="theButton">
    Other
</Button>
</Form.Item> */}

                        <Row>
                            <Col span={8} />
                            <Form.Item
                                wrapperCol={{
                                    ...layout.wrapperCol,
                                    offset: 8,
                                }}
                            >
                                <Link to={"/showDonation"}>
                                    <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                                        Update
                                    </Button>
                                </Link>

                            </Form.Item>
                        </Row>
                    </Form>
                </Card>


            </div>
        </Row></>

    );


}
export default EditDonations