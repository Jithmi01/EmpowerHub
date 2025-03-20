import { Button, Form, Input, Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CreditCard, ShieldCheck, Lock } from 'lucide-react';
import mastercardLogo from '../../assets/images/mastercard.png';
import paypalLogo from '../../assets/images/paypal.png';
import amexLogo from '../../assets/images/amex.png';

const CardDetails = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const validateName = (_, value) => {
        if (!value) return Promise.reject('Please enter the cardholder name');
        if (/[^a-zA-Z\s]/.test(value)) {
            return Promise.reject('Name cannot contain numbers or special characters');
        }
        return Promise.resolve();
    };

    

    const validateCardNumber = (_, value) => {
        if (!value) return Promise.reject('Please enter your card number');
        if (!/^\d{16}$/.test(value)) return Promise.reject('Card number must be 16 digits');
        return Promise.resolve();
    };

    const validateCVC = (_, value) => {
        if (!value) return Promise.reject('Please enter CVC');
        if (!/^\d{3}$/.test(value)) return Promise.reject('CVC must be 3 digits');
        return Promise.resolve();
    };

    const handleSubmit = () => {
        form.validateFields()
            .then(() => {
                alert('Payment Successful!');
                navigate('/showdonation');
            })
            .catch(() => {
                // Do nothing, errors will be shown automatically
            });
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f4' }}>
            <Card style={{ width: 450, padding: 20, borderRadius: 12, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <h2 style={{ textAlign: 'center' }}>Enter Card Details</h2>
                <Row justify="center" gutter={16}>
                    <Col><img src={mastercardLogo} alt="Mastercard" width={50} /></Col>
                    <Col><img src={paypalLogo} alt="PayPal" width={50} /></Col>
                    <Col><img src={amexLogo} alt="Amex" width={50} /></Col>
                </Row>
                <Form form={form} layout="vertical" style={{ marginTop: 20 }}>
                    <Form.Item 
                        label={<b>Card Holder Name</b>} 
                        name="name" 
                        rules={[{ validator: validateName }]} 
                        required={false} 
                    >
                        <Input 
                            prefix={<CreditCard size={18} />} 
                            placeholder="John Doe" 
                        />
                    </Form.Item>
                    
                    <Form.Item 
                        label={<b>Card Number</b>} 
                        name="cardNumber" 
                        rules={[{ validator: validateCardNumber }]} 
                        required={false}
                    >
                        <Input 
                            prefix={<ShieldCheck size={18} />} 
                            placeholder="1234 5678 9012 3456" 
                            maxLength={16} 
                            onChange={(e) => {
                                const numericValue = e.target.value.replace(/\D/g, ''); 
                                form.setFieldsValue({ cardNumber: numericValue });
                            }} 
                        />
                    </Form.Item>

                    <Form.Item 
                        label={<b>CVC</b>} 
                        name="cvc" 
                        rules={[{ validator: validateCVC }]} 
                        required={false}
                    >
                        <Input 
                            prefix={<Lock size={18} />} 
                            placeholder="123" 
                            maxLength={3} 
                            onChange={(e) => {
                                const numericValue = e.target.value.replace(/\D/g, ''); 
                                form.setFieldsValue({ cvc: numericValue });
                            }} 
                            style={{ width: 100 }} 
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" block onClick={handleSubmit}>Submit Payment</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default CardDetails;
