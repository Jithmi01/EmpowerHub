import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Card, Row, Breadcrumb, Layout, Col, theme } from 'antd';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import jwtdecode from "jwt-decode";
import { Link } from 'react-router-dom'
import { notification } from 'antd';

const { Header, Content, Footer } = Layout;


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // useEffect(() => {
    //   if (cookies.jwt) {
    //     navigate("/");
    //   }
    // }, [cookies, navigate]);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleRegister = () => {
        navigate("/register")
    }
    const sendLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        let role = '';
        if (email === 'admin@test.com' && password === 'admin1234') {
            role = 'admin';
        } else {
            role = 'user';
        }

        const userCredentials = {
            email: email,
            password: password,
            role: role
        };

        axios
            .post("http://localhost:4000/auth/login", userCredentials)
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                notification.success({
                    message: 'Login Successful',
                    description: 'You have successfully logged in.',
                });
                setLoading(false);
                setError(false);

                if (role === 'admin') {
                    navigate("/dashboard");
                } else {
                    navigate("/userDash");
                }
            })
            .catch((err) => {
                setLoading(false);
                setError(true);
                notification.error({
                    message: 'Login Failed',
                    description: 'Please check your email and password and try again.',
                });
            });
    };
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
      
        if (userInfo) {
          const userRole = JSON.parse(userInfo).user.role;
      
          if (userRole === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/userDash");
          }
        }
      }, []);
      
    // useEffect(() => {
    //         const userInfo = localStorage.getItem("userInfo");
            
    //         if (userInfo) {
    //           navigate("/login");
    //         }
    // }, []);





    // const sendLogin=async (values)=> {

    //     const { email, password } = values;

    //     // Check the email and password to determine the role
    //     let role = '';
    //     if (email === 'admin@test.com' && password === 'admin1234') {
    //         role = 'admin';
    //     } else {
    //         role = 'user';
    //     }

    //     const userCredentials = {
    //         email: email,
    //         password: password,
    //         role: role
    //     };

    //     try {
    //         const response = await fetch('http://localhost:4000/auth/login', {
    //             method: 'POST',
    //             body: JSON.stringify(userCredentials),
    //             headers: { 'Content-Type': 'application/json' }
    //         });

    //         if (response.ok) {
    //             // Handle successful login
    //             console.log('Login successful!');
    //             const data = await response.json();
    //             const token = data.token; // Assuming the JWT token is returned in the response

    //             // Save the JWT token to local storage or session storage
    //             localStorage.setItem('users', token); // You can change 'localStorage' to 'sessionStorage' if desired

    //             notification.success({
    //                 message: 'Login Successful',
    //                 description: 'You have successfully logged in.',
    //             });
    //             setUserId(data.userId); // Assuming the user ID is returned in the response

    //             if (role === 'user') {
    //                 navigate(`/userDash`);
    //             } else if (role === 'admin') {
    //                 navigate(`/dashboard`);
    //             }
    //         } else {
    //             // Handle login error
    //             console.log('Login failed. Please try again.');
    //             notification.error({
    //                 message: 'Login Failed',
    //                 description: 'Please check your email and password and try again.',
    //             });
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // useEffect(() => {
    //     const userInfo = localStorage.getItem("userInfo");

    //     if (userInfo) {
    //       history("/home");
    //     }
    //   });



    return (

        <>

            <Layout className="layout">
                {/* <Header className="header">
                    <div className="logo" />
                    <h1 className="heading">No Poverty</h1>
                </Header> */}
                <div className='login' style={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Card style={{ width: 500 }}>
                        <Form
                            name="login-form"
                        >
                            <h1 style={{ textAlign: 'center' }}>Helping Hands</h1>
                            <Row>
                                <Col span={3} />
                                <Col span={17}>

                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                type: 'email',
                                                message: 'Please enter a valid email!',
                                            },
                                        ]}
                                    >
                                        <Input onChange={(val) => {
                                            setEmail(val.target.value);

                                        }} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={3} />
                                <Col span={17}>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password onChange={(val) => {
                                            setPassword(val.target.value);

                                        }} />
                                    </Form.Item>
                                </Col>


                            </Row>


                            <Row>
                                <Col span={10} />

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" onClick={sendLogin}>
                                        Log In
                                    </Button>
                                </Form.Item>

                            </Row>

                            <div style={{ paddingLeft: 100 }}>
                                <Form.Item>
                                    <Link to="/Register">
                                        <Button type="ghost" htmlType="submit" onClick={handleRegister}>
                                            Don't have an account? Sign up
                                        </Button>

                                    </Link>

                                </Form.Item>
                            </div>



                        </Form>
                    </Card>
                </div>

                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    No Poverty Design ©2023 Created by Team 48
                </Footer>
            </Layout>


        </>

    );
};


export default Login;