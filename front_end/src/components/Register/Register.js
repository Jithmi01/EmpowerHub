import React, { useEffect, useState } from 'react'
import {
    Button,
    Card,
    Col,
    Form,
    Input,
    Row,
    Select,
} from 'antd';

import WrapperCard from '../common/Wrapper_card';
import CustomRow from '../common/Form_header';
import axios from "axios";
import logo from '../../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { notification } from 'antd';

const Register = () => {
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [cNo, setCno] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login")
    }

    async function sendRegister(e) {
        e.preventDefault();

        // get values

        const UserSchema = {
            email,
            password, name, designation, gender, address, cNo
        };

        try {
            const response = await fetch('http://localhost:4000/auth/signup', {
                method: 'POST',
                body: JSON.stringify(UserSchema),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                // Handle successful signup
                console.log('Signup successful!');
                notification.success({
                    message: 'Registration Successful',
                    description: 'You have successfully Registratered',
                });
                navigate("/login")
                const data = await response.json();
                if (data.errors) {
                    console.log("Error" + email.errors)
                }
                if (data.user) {
                    // location.assign('/dashboard');
                }
            } else {
                // Handle signup error
                console.log('Signup failed. Please try again.');
            }
        } catch (err) {
            console.log(err);
        }
    }



    const onHandleGender = (value) => {
        setGender(value)
    };


    return (
        <>
            <div
                className="register"
                style={{
                    backgroundPosition: "center",
                    backgroundRepeat: "repeat",


                }}
            >
                <div style={{ padding: 1, paddingLeft: 350, alignItems: "center", borderRadius: 5 }}>
                    <br></br>


                    <Card style={{ width: 800, borderRadius: 5, boxShadow: "1px 5px 5px 10px lightblue", position: "relative" }}>
                        <h1 style={{ color: "black", textAlign: "center", fontFamily: "cursive", fontSize: 18 }}>Welcome To Helping Hands<br></br> Registration</h1>
                        <div style={{ paddingLeft: 310 }}>
                            <img src={logo} alt="logo" width={100} height={100} />

                        </div>
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(340deg)" }}>
                            <h2 style={{ color: "rgba(0, 0, 0, 0.2)", fontFamily: "Arial", fontSize: 80, fontWeight: "bold", textTransform: "uppercase" }}>No Poverty</h2>
                        </div>
                        <Form

                            style={{ padding: 1, paddingLeft: 50 }}
                        >
                            <br></br>

                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Enter the name"
                                        }

                                    ]}
                                >
                                    <Input
                                        onChange={(val) => {
                                            setName(val.target.value);

                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Row>
                                <Form.Item
                                    name="designation"
                                    label="Designation"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Enter the name"
                                        }

                                    ]}
                                >
                                    <Input
                                        onChange={(val) => {
                                            setDesignation(val.target.value);

                                        }}
                                    />
                                </Form.Item>

                                <Col span={2} />
                                <Form.Item
                                    label="Gender"
                                    name="gender"
                                >
                                    <Select
                                        defaultValue="Gender"
                                        style={{
                                            width: 120,
                                        }}
                                        onChange={onHandleGender}
                                        options={[
                                            {
                                                value: 'male',
                                                label: 'Male',
                                            },
                                            {
                                                value: 'female',
                                                label: 'Female',
                                            },
                                            {
                                                value: 'other',
                                                label: 'Other',
                                            },



                                        ]}
                                    />
                                </Form.Item>
                                <Col span={4} />
                            </Row>

                            <Col span={18}>
                                <Form.Item
                                    name="address"
                                    label="Address"

                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter the place"
                                        }
                                    ]}
                                >
                                    <Input
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                        }}
                                    />
                                </Form.Item>
                            </Col>


                            <Row>
                                <Col span={11}>
                                    <Form.Item
                                        name="email"
                                        label="Email"

                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the email"
                                            }
                                        ]}
                                    >
                                        <Input
                                            onChange={(val) => {
                                                setEmail(val.target.value);

                                            }}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={1} />
                                <Col span={9}>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password
                                            onChange={(val) => {
                                                setPassword(val.target.value);
                                            }} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Col span={11}>
                                <Form.Item
                                    name="cNo"
                                    label="Contact Number"

                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter the Contact No"
                                        }
                                    ]}
                                >
                                    <Input
                                        onChange={(val) => {
                                            setCno(val.target.value);

                                        }}
                                    />
                                </Form.Item>
                            </Col>


                            <br></br>


                            <Row>
                                <Col span={8} />
                                <Form.Item label=" " colon={false} >
                                    <Button type="primary" color='red' htmlType="submit" style={{ backgroundColor: "#f44336", fontWeight: "bold" }}>
                                        Cancel
                                    </Button>
                                </Form.Item>
                                <Col span={1} />
                                <Form.Item label=" " colon={false}>

                                    <Link to="/login">

                                        <Button type="primary" htmlType="submit"
                                            style={{ fontWeight: "bold" }} onClick={sendRegister}
                                        >
                                            Register
                                        </Button>
                                    </Link>

                                </Form.Item>




                            </Row>
                            <Row>

                                <Col span={8} />
                                <Form.Item label=" " colon={false}>
                                    <Link to="/login">
                                        <Button type="ghost" htmlType="submit"
                                            style={{ fontWeight: "bold" }} onClick={handleLogin}
                                        >
                                            Have an account? Log in
                                        </Button>
                                    </Link>

                                </Form.Item>
                            </Row>



                        </Form >

                    </Card>

                </div>
            </div>
        </>
    )

}

export default Register;