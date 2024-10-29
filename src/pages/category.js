import {
    Row,
    Col,
    Table,
    Card,
    Avatar,
    Radio,
    Button, Form, Input, message, Space

} from "antd";

import { DeleteOutlined, EditOutlined, ToTopOutlined } from "@ant-design/icons";

import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";




import { Link } from "react-router-dom";
import { BackwardFilled } from "@ant-design/icons";
import apiClient from "../axios-client";
import { useState } from "react";
import Loader from "../components/loader/Loader";

const dataSource = [
    {
        key: '1',
        id: '#001',
        name: 'Disinfectant',
        action: '.',
    },
    {
        key: '2',
        id: '#002',
        name: 'Multipurpose',
        action: '.',
    },
];

const columns = [
    {
        title: 'SN',
        dataIndex: 'id',
        key: 'is',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
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

// Your delete handler function
const handleDelete = (key) => {
    // Logic to delete the row
    console.log('Delete record with key:', key);
    // Add your delete logic here, such as updating the state or calling an API
};

const handleEdit = (key) => {
    console.log('Edit record with key:', key);
}



function Category() {
    const [isLoading,setLoading] = useState(false)

    const [form] = Form.useForm();
    const onFinish = (values) => {
        setLoading(true)
        const payload = {
            category_name : values.category_name
        }
        apiClient.post('/categories',payload)
        .then(response => {
            console.log(response.data);
            setLoading(false)
            if(response.data.success){
                message.success(response.data.message);
            }else{
                message.error('Fail to add new category');
            }

        })
        .catch(err => {
            setLoading(false)
            message.error('Server Error!');
            throw new Error(err);
        })
        console.log(payload);
    };
    const onFinishFailed = () => {
        message.error('Category name is required');
    };
    const onFill = () => {
        form.setFieldsValue({
            category_name: 'something else',
        });
    };
    // const onChange = (e) => console.log(`radio checked:${e.target.value}`);

    return (


        <>
            <div
                className="profile-nav-bg"
                style={{ backgroundImage: "url(" + BgProfile + ")" }}
            ></div>

            <Card
                className="card-profile-head"
                bodyStyle={{ display: "none" }}
                title={
                    <Row justify="space-between" align="middle" gutter={[24, 0]}>
                        <Col span={24} md={12} className="col-info">
                            {/* <Avatar.Group>
                                <Avatar size={74} shape="square" src={profilavatar} />

                                <div className="avatar-info">
                                    <h4 className="font-semibold m-0">Sarah Jacob</h4>
                                    <p>CEO / Co-Founder</p>
                                </div>
                            </Avatar.Group> */}
                        </Col>
                        <Col
                            span={24}
                            md={12}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Radio.Group defaultValue="a">
                                <Radio.Button value="a">CATEGORIES</Radio.Button>
                                <Radio.Button value="c">DEPRICATED</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>
                }
            ></Card>

            {isLoading && <Loader />}

            <Row gutter={[24, 0]}>
                <Col span={24} md={16} className="mb-24 ">
                    <Card
                        bordered={false}
                        className="header-solid h-full"
                        title={<h6 className="font-semibold m-0">Categories List</h6>}
                    >
                        <div className="table-responsive">
                            <Table
                                dataSource={dataSource}
                                columns={columns}
                                className="ant-border-space"
                            />
                        </div>
                    </Card>
                </Col>


                <Col span={24} md={8} className="mb-24">
                    <Card
                        bordered={false}
                        title={<h6 className="font-semibold m-0">Add Category</h6>}
                        className="header-solid h-full card-profile-information"

                        bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                    >

                        <hr className="my-25" />

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="on"
                        >
                            <Form.Item
                                name="category_name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                    {
                                        type: 'name',
                                        warningOnly: true,
                                    },
                                    {
                                        type: 'string',
                                        // min: 6,
                                    },
                                ]}
                            >
                                <Input placeholder="Enter Category name" />
                            </Form.Item>
                            <Form.Item>
                                <Space>
                                    <Button style={{ backgroundColor: '#0E1573', borderColor: '#0E1573', color: '#fff' }} htmlType="submit">
                                        Submit
                                    </Button>

                                    <Button htmlType="button" onClick={onFill}>
                                        Fill
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>

                    </Card>
                </Col>

            </Row>

        </>
    );
}

export default Category;
