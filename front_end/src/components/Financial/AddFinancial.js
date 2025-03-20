 import React, { useEffect } from 'react'
import {
    Button,Col,Form,Input,Row,Select,DatePicker,Modal,notification} from 'antd';
import { useState } from 'react';
import CustomRow from '../common/Form_header';
import WrapperCard from '../common/Wrapper_card';
import axios, { Axios } from 'axios';
import { } from "react-router-dom";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);


const config = {
    rules: [
        {
            required: true,
            message: 'Please select date!',
        },
    ],
};


const selection = {
    rules: [
        {
            required: true,
            message: "Select the type"
        }
    ]
}
const dateFormat = 'YYYY/MM/DD';

const AddFinancial = props => {
    const { isOpen, handleCancel, handleOk, selectedItem } = props;
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [date, setDate] = useState('');
    const [venue, setVenue] = useState("");
    const [total, setTotal] = useState();
    const [status, setStatus] = useState("");
    const [refesh, seRefesh] = useState(false);


    const handleSubmit = async (event) => {
        if (event) {
          event.preventDefault();
          if (name !== '' && type !== '') {
            const i = {
              name: name,
              type: type,
              date: date,
              venue: venue,
              total: total,
              status: status,
            };
            try {
              if (selectedItem) {
                await axios.put(`http://localhost:4000/financial/${selectedItem._id}`, i);
                notification.success({
                    message: 'Updated Successful',
                    description: 'You have successfully Updated Report',
                  });
                  window.location.reload(); 

                refresh();
              } else {
                await axios.post('http://localhost:4000/financial/create', i);
                notification.success({
                    message: 'Created Successful',
                    description: 'You have successfully Created Report',
                  });
                  window.location.reload(); 

                refresh();
              }
              handleOk();
            } catch (error) {
              console.log(`create item failed ${error}`);
            }
          } else {
            console.log(`else called ${name}`);
          }
        } else {
          console.log('Event is undefined');
        }
      };
      

    const refresh = async () => {
        await handleSubmit();
      };
    useEffect(() => {
        if (selectedItem) {
            setName(selectedItem.name);
            setType(selectedItem.type);
            setDate(selectedItem.data);
            setVenue(selectedItem.venue);
            setTotal(selectedItem.total);
            setStatus(selectedItem.status);
        }
    }, [])
 

    const onChange = (date, dateString) => {
        console.log(date, dateString);
        setDate(dateString);


    };
    const onStatus = (value) => {
        setStatus(value)
    };
    const onType = (value) => {
        console.log(`selected ${value}`);
        setType(value)
    };


    return (
        <>
{/* modal which pop the create function or edit function */}
            <Modal
                open={isOpen}
                onCancel={handleCancel}
                onOk={handleOk}
                width={1000}
                footer={null}

            >
                <WrapperCard style={{ backgroundColor: "#37475E" }}>
                    <CustomRow style={{ justifyContent: "space-between" }} >
                        <h1 style={{ color: "White", paddingLeft: 30, fontSize: 22 }}>Financial Summmary</h1>
                    </CustomRow>
                </WrapperCard>
                <Form

                    style={{ padding: 1, paddingLeft: 120 }}
                >
                    <br></br>

                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Program Name"
                            initialValue={selectedItem?.name}
                            rules={[
                                {
                                    required: true,
                                    message: "Enter the Program name"
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
                    <br></br>

                    <Row>
                        <Form.Item
                            label="Select Program type"
                            {...selection}
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the place or venue"
                                }
                            ]}


                        >
                            <Select
                                defaultValue={selectedItem?.type}
                                onChange={onType}

                                rules={[
                                    {
                                        required: true,
                                        message: "select the type"
                                    }

                                ]}
                                style={{
                                    width: 120,
                                }}
                                options={[
                                    {
                                        value: 'Donation',
                                        label: 'Donation',
                                    },
                                    {
                                        value: 'Event',
                                        label: 'Event',
                                    },


                                ]}
                            />
                        </Form.Item>
                        <Col span={4} />

                        <Form.Item
                            name="date-picker"
                            label="DatePicker" {...config}

                        >
                            <DatePicker
                                value={date}
                                defaultValue={selectedItem ? dayjs(selectedItem.date, dateFormat) : null}
                                onChange={onChange}
                            />

                        </Form.Item>
                    </Row>
                    <br></br>

                    <Col span={18}>
                        <Form.Item
                            name="venue"
                            label="Venue"
                            initialValue={selectedItem?.venue}

                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the place or venue"
                                }
                            ]}
                        >
                            <Input
                                onChange={(e) => {
                                    setVenue(e.target.value);
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <br></br>

                    <Row>
                        <Col span={5} >

                            <Form.Item
                                name="total"
                                label="Total"
                                initialValue={selectedItem?.total}

                                rules={[
                                    {
                                        type:'number',
                                        required: true,
                                        message: "Please enter valid amount"
                                    }
                                ]}
                            >
                                <Input
                                    onChange={(val) => {
                                        setTotal(val.target.value);

                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <br></br>
                        <Col span={5} />

                        <Form.Item
                            label="Status"
                            initialValue={selectedItem?.status}

                            rules={[
                                {
                                    required: true,
                                    message: "Please select status"
                                }
                            ]}
                        >
                            <Select
                                defaultValue={selectedItem?.status}
                                style={{
                                    width: 140,
                                }}
                                onChange={onStatus}
                                options={[
                                    {
                                        value: 'Completed',
                                        label: 'Completed',
                                    },
                                    {
                                        value: 'InCompleted',
                                        label: 'InCompleted',
                                    },
                                ]}
                            />
                        </Form.Item>
                        {/* </Col> */}
                    </Row>
                    <br></br>

                    <Row>
                        <Col span={13} />
                        <Form.Item label=" " colon={false} >
                            <Button type="primary" color='red' htmlType="submit"
                                style={{ backgroundColor: "#f44336", fontWeight: "bold" }}
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </Form.Item>
                        <Col span={1} />
                        <Form.Item label=" " colon={false}>

                            <a href='/financial'><Button type="primary" htmlType="submit"
                                style={{ fontWeight: "bold" }} onClick={handleSubmit}
                            >
                                {selectedItem ? "Edit" : "Submit"}
                            </Button>
                            </a>
                        </Form.Item>
                    </Row>
                </Form >
            </Modal>
            {/* </div> */}
        </>
    )
}

export default AddFinancial