import { Table, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WrapperCard from '../../common/Wrapper_card';
import CustomRow from '../../common/Form_header';
import '../Event-Main.css';

const MyTable = () => {

    const { id } = useParams();
    const [registeredEntities, setRegisteredEntities] = useState([]);

    const getSpecific = () => {
        axios
            .get("http://localhost:4000/event/get/" + id)
            .then((res) => {
                setRegisteredEntities(res.data.Event.registeredEntities);
            })
            .catch(() => {
                alert("Error Occurred On Delete");
            });
    }
    useEffect(() => getSpecific(), []);

    const handleDelete = (eid) => {
        axios
            .delete(`http://localhost:4000/event/${id}/registeredEntityId/${eid}`)
            .then(() => {
                window.location.reload(false);
            })
            .catch(() => {
                alert("Error Occurred On Delete");
            });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Popconfirm
                    title="Are you sure to delete this value?"
                    onConfirm={() => handleDelete(record._id)}
                >
                    <DeleteOutlined style={{ color: 'red' }} />
                </Popconfirm>
            ),
        },
    ];

    const data = registeredEntities.map((entity) => {
        return {
            key: entity._id,
            name: entity.name,
            id: entity.id,
            _id: entity._id,
        }
    });

    return (



        <div className="main-container">
            <div className="sub-container">
                <WrapperCard style={{ backgroundColor: "#37475E" }}>
                    <CustomRow
                        style={{ justifyContent: "space-between", padding: "16px" }}
                    >
                        <h1 style={{ color: "white" }}>Participants in event</h1>
                    </CustomRow>
                </WrapperCard>
                <div>
                    <Table columns={columns} dataSource={data} rowKey="key" pagination={{ pageSize: 10 }} />
                </div>

            </div>
        </div>

    );
};

export default MyTable;
