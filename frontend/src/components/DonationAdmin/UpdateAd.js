import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, notification, Typography } from 'antd';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Title } = Typography;

const UpdateAd = () => {
    const { _id } = useParams();
    const navigate = useNavigate();
    
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:4000/adDonations/${_id}`)
            .then((response) => {
                form.setFieldsValue(response.data);
            })
            .catch(() => {
                notification.error({ message: "Failed to load advertisement details" });
            });
    }, [_id, form]);

    const handleUpdate = async () => {
        setLoading(true);
        form.validateFields()
            .then(values => {
                return axios.put(`http://localhost:4000/adDonations/${_id}`, values);
            })
            .then(() => {
                notification.success({ message: "Advertisement updated successfully!" });
                navigate('/showAds');
            })
            .catch(() => {
                notification.error({ message: "Failed to update advertisement" });
            })
            .finally(() => setLoading(false));
    };

    return (
        <Modal
            title={<Title level={3} style={{ marginBottom: 0 }}>Update Advertisement</Title>}
            open={true}
            onCancel={() => navigate('/ads')}
            footer={null}
            width={600}
        >
            <Form form={form} layout="vertical">
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the name' }]}>                    
                    <Input placeholder="Enter advertisement name" />
                </Form.Item>
                <Form.Item label="Location" name="location" rules={[{ required: true, message: 'Please enter the location' }]}>                    
                    <Input placeholder="Enter location" />
                </Form.Item>
                <Form.Item label="Short Description" name="smallDes" rules={[{ required: true, message: 'Please enter a short description' }]}>                    
                    <Input placeholder="Enter short description" />
                </Form.Item>
                <Form.Item label="Detailed Description" name="longDes" rules={[{ required: true, message: 'Please enter a detailed description' }]}>                    
                    <TextArea rows={4} placeholder="Enter detailed description" />
                </Form.Item>
                <Form.Item label="Help Required" name="help" rules={[{ required: true, message: 'Please specify help required' }]}>                    
                    <Input placeholder="Enter required help" />
                </Form.Item>
                <div style={{ textAlign: 'right' }}>
                    <Button onClick={() => navigate('/ads')} style={{ marginRight: 8 }}>Cancel</Button>
                    <Button type="primary" loading={loading} onClick={handleUpdate}>Update</Button>
                </div>
            </Form>
        </Modal>
    );
};

export default UpdateAd;
