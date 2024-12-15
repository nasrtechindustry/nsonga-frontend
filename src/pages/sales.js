import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Upload,
    message,
    Progress,
    Button,
    Avatar,
    Typography,
    Modal,
    Input,
    Form, Space

} from "antd";

import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
import React, { useState } from 'react';






const ava1 = "https://images.pexels.com/photos/5217897/pexels-photo-5217897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const ava2 = "https://images.unsplash.com/photo-1604603815783-2bd94c5a819f?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const ava3 = "https://images.pexels.com/photos/5218014/pexels-photo-5218014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const ava5 = "https://images.pexels.com/photos/7262480/pexels-photo-7262480.jpeg?auto=compress&cs=tinysrgb&w=800";
const ava6 = "https://images.pexels.com/photos/5217911/pexels-photo-5217911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
// const face6 = "https://images.pexels.com/photos/5217911/pexels-photo-5217911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";


const { Title } = Typography;

const formProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
        authorization: "authorization-text",
    },
    onChange(info) {
        if (info.file.status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};



const project = [
    {
        title: "Sales Id",
        dataIndex: "id",
        width: "10%",
    },
    {
        title: "Order Id",
        dataIndex: "order",
        width: "10%",
    },
    {
        title: "Product",
        dataIndex: "name",
        width: "22%",
    },
    {
        title: "Price",
        dataIndex: "price",
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
    },
    {
        title: "Status",
        dataIndex: "status",
    },
    {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
            <>
                <Button
                    type="text"
                    icon={<EditOutlined style={{ color: 'orange' }} />}
                    onClick={() => handleEdit(record.key)}
                    style={{ padding: 2, width: 'auto' }}
                />
                <Button
                    type="text"
                    icon={<DeleteOutlined style={{ color: 'red' }} />}
                    onClick={() => handleDelete(record.key)}
                    style={{ padding: 0, width: 'auto' }}
                />
            </>
        ),
    },
];


const dataproject = [
    {
        key: "1",
        id: "P001",
        order: "O001",
        name: (
            <Avatar.Group>
                <Avatar className="shape-avatar" src={ava1} size={25} alt="" />
                <div className="avatar-info">
                    <Title level={5}>Disinfectant</Title>
                </div>
            </Avatar.Group>
        ),
        price: "TSh 10,000",
        quantity: "5",
        status: (
            <Progress percent={50} size="small" />
        ),
    },
    {
        key: "2",
        id: "P002",
        order: "O002",
        name: (
            <Avatar.Group>
                <Avatar className="shape-avatar" src={ava2} size={25} alt="" />
                <div className="avatar-info">
                    <Title level={5}>Dishwashing</Title>
                </div>
            </Avatar.Group>
        ),
        price: "TSh 8,500",
        quantity: "10",
        status: (
            <Progress percent={30} size="small" />
        ),
    },
    {
        key: "3",
        id: "P003",
        order: "O003",
        name: (
            <Avatar.Group>
                <Avatar className="shape-avatar" src={ava3} size={25} alt="" />
                <div className="avatar-info">
                    <Title level={5}>Handwash</Title>
                </div>
            </Avatar.Group>
        ),
        price: "TSh 5,000",
        quantity: "8",
        status: (
            <Progress percent={80} size="small" />
        ),
    },
    {
        key: "4",
        id: "P004",
        order: "O004",
        name: (
            <Avatar.Group>
                <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
                <div className="avatar-info">
                    <Title level={5}>Multipurpose Cleaner</Title>
                </div>
            </Avatar.Group>
        ),
        price: "TSh 12,000",
        quantity: "3",
        status: (
            <Progress percent={70} size="small" />
        ),
    },
    {
        key: "5",
        id: "P005",
        order: "O005",
        name: (
            <Avatar.Group>
                <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
                <div className="avatar-info">
                    <Title level={5}>Tiles Cleaner</Title>
                </div>
            </Avatar.Group>
        ),
        price: "TSh 15,000",
        quantity: "6",
        status: (
            <Progress percent={40} size="small" />
        ),
    },
    {
        key: "6",
        id: "P006",
        order: "O006",
        name: (
            <Avatar.Group>
                <Avatar className="shape-avatar" src={ava6} size={25} alt="" />
                <div className="avatar-info">
                    <Title level={5}>Tiles Cleaner (1lit)</Title>
                </div>
            </Avatar.Group>
        ),
        price: "TSh 20,000",
        quantity: "2",
        status: (
            <Progress percent={60} size="small" />
        ),
    },
    // Add more products as needed
];

// Your delete handler function
const handleDelete = (key) => {
    // Logic to delete the row
    console.log('Delete record with key:', key);
    // Add your delete logic here, such as updating the state or calling an API
};


const dataSource = [
    {
        key: '1',
        id: 'P001',
        product: 'Disinfectant',
        as: 'Bottle (1L)',
        price: 'TSh 15,000',
        quantity: 3,
        tax: 'TSh 1,500',
        amount: 'TSh 46,500',
    },
    {
        key: '2',
        id: 'P002',
        product: 'Dishwashing',
        as: 'Bottle (500ml)',
        price: 'TSh 5,000',
        quantity: 5,
        tax: 'TSh 500',
        amount: 'TSh 27,500',
    },
    {
        key: '3',
        id: 'P003',
        product: 'Handwash',
        as: 'Bottle (250ml)',
        price: 'TSh 3,000',
        quantity: 4,
        tax: 'TSh 300',
        amount: 'TSh 13,200',
    },

];

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
    },
    {
        title: 'Sold As',
        dataIndex: 'as',
        key: 'as',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Tax',
        dataIndex: 'tax',
        key: 'tax',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
            <>
                <Button
                    type="text"
                    icon={<EyeOutlined style={{ color: 'orange' }} />}
                    onClick={() => handleEdit(record.key)}
                    style={{ padding: 2, width: 'auto' }}
                />
                <Button
                    type="text"
                    icon={<DeleteOutlined style={{ color: 'red' }} />}
                    onClick={() => handleDelete(record.key)}
                    style={{ padding: 0, width: 'auto' }}
                />
            </>
        ),
    },
];

const handleEdit = (key) => {
    console.log('Edit record with key:', key);
}


function SalesList() {
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>


                        <Modal
                            title="Add New Sales"
                            centered
                            open={open}

                            onOk={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                            width={1000}
                        >
                            <Form

                                layout="vertical"

                                autoComplete="off"
                            >
                                <Row gutter={16}>
                                    <Col span={6}>
                                        <Form.Item
                                            name="name"
                                            label="Sales Date"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the product name',
                                                },
                                                {
                                                    type: 'string',
                                                    min: 6,
                                                    message: 'Name must be at least 6 characters long',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Product Name" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={6}>
                                        <Form.Item
                                            name="category"
                                            label="Category"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the product category',
                                                },
                                                {
                                                    type: 'string',
                                                    min: 6,
                                                    message: 'Category must be at least 6 characters long',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Product Category" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={6}>
                                        <Form.Item
                                            name="brand"
                                            label="Brand"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the product name',
                                                },
                                                {
                                                    type: 'string',
                                                    min: 6,
                                                    message: 'Name must be at least 6 characters long',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Product Name" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={6}>
                                        <Form.Item
                                            name="brand"
                                            label="Product"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the product name',
                                                },
                                                {
                                                    type: 'string',
                                                    min: 6,
                                                    message: 'Name must be at least 6 characters long',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Product Name" />
                                        </Form.Item>
                                    </Col>
                                </Row>


                                <Row gutter={16}>
                                    <Col span={23}>
                                        <Form.Item
                                            name="brand"
                                            // label="Quantity"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Quantity',
                                                },
                                                {
                                                    type: 'numeric',
                                                    min: 6,
                                                    message: 'Name must be at least 6 characters long',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Quantinty" />
                                        </Form.Item>



                                    </Col>
                                    <Button style={{ backgroundColor: '#0E1573', borderColor: '#0E1573', color: '#fff' }} type="primary">+</Button>



                                </Row>



                                <Row span={24}>
                                    <Col span={24}>
                                        <Table dataSource={dataSource} columns={columns} />
                                    </Col>
                                </Row>
                            </Form>
                        </Modal>



                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Sales List"
                            extra={
                                <>
                                    <Radio.Group onChange={onChange} defaultValue="all">

                                        <Button style={{ backgroundColor: '#0E1573', borderColor: '#0E1573', color: '#fff' }} type="primary" onClick={() => setOpen(true)}>
                                            Add Sales
                                        </Button>
                                    </Radio.Group>
                                </>
                            }
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={project}
                                    dataSource={dataproject}
                                    pagination={false}
                                    className="ant-border-space"
                                />
                            </div>

                        </Card>
                    </Col>
                </Row>
            </div >
        </>
    );
}

export default SalesList;
