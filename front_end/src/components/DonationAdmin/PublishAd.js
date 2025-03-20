import { Button, Col, Form, Input, Modal, Row, notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomRow from '../common/Form_header';
import WrapperCard from '../common/Wrapper_card';

const PublishAd = ({ isOpen, handleCancel, handleOk, selectedItem }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue({
                name: selectedItem.name,
                location: selectedItem.location,
                smallDes: selectedItem.smallDes,
                longDes: selectedItem.longDes,
                help: selectedItem.help,
            });
        } else {
            form.resetFields();
        }
    }, [selectedItem, form]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            if (selectedItem) {
                await axios.put(`http://localhost:4000/adDonations/${selectedItem._id}`, values);
                notification.success({ message: 'Update Successful', description: 'Ad updated successfully.' });
            } else {
                await axios.post('http://localhost:4000/adDonations/create', values);
                notification.success({ message: 'Creation Successful', description: 'Ad created successfully.' });
            }
            handleOk();
            window.location.reload();
        } catch (error) {
            notification.error({ message: 'Error', description: 'Something went wrong. Please try again.' });
            console.error('Error:', error);
        }
        setLoading(false);
    };

    return (
        <Modal
            open={isOpen}
            onCancel={handleCancel}
            width={700}
            footer={null}
        >
            <div className="modal-container">
                <WrapperCard style={{ backgroundColor: '#37475E', height: '50px', paddingTop: '10px', borderRadius: 6, marginTop: '15px' }}>
                    <CustomRow style={{ justifyContent: 'center' }}>
                        <h2 style={{ color: 'white', margin: 0 }}>Publish Donation Advertisements</h2>
                    </CustomRow>
                </WrapperCard>

                <Form
                    form={form}
                    layout='vertical'
                    onFinish={handleSubmit}
                    style={{ padding: 24 }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="name" label={<b>Name</b>} rules={[{ required: true, message: "Enter name" }]}> 
                                <Input placeholder="Enter name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="location" label={<b>Location</b>} rules={[{ required: true, message: "Enter location" }]}> 
                                <Input placeholder="Enter location" />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="smallDes" label={<b>Short Description</b>} rules={[{ required: true, message: "Enter short description" }]}> 
                                <Input placeholder="Enter short description" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="help" label={<b>Help Required</b>} rules={[{ required: true, message: "Enter help required" }]}> 
                                <Input placeholder="Describe required help" />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Form.Item name="longDes" label={<b>Detailed Description</b>} rules={[{ required: true, message: "Enter detailed description" }]}> 
                        <Input.TextArea rows={4} placeholder="Enter detailed description" />
                    </Form.Item>
                    
                    <Row justify="end" gutter={16}>
                        <Col>
                            <Button onClick={handleCancel} danger>Cancel</Button>
                        </Col>
                        <Col>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {selectedItem ? "Update" : "Submit"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal>
    );
};

export default PublishAd;