import {
    Row,
    Col,
    Table,
    Card,
    Avatar,
    Radio,
    Button, Form, Input, message, Space

} from "antd";


import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import { DeleteOutlined, EditOutlined, ToTopOutlined } from "@ant-design/icons";





import { Link } from "react-router-dom";


const dataSource = [
    {
        key: '1',
        id: '#001',
        name: 'Litre',
        value: '2',
        action: '.',
    },
    {
        key: '2',
        id: '#002',
        value: '4',
        name: 'Litre',
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
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
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




function Attributes() {
    const [form] = Form.useForm();
    const onFinish = () => {
        message.success('Submit success!');
    };
    const onFinishFailed = () => {
        message.error('Submit failed!');
    };
    const onFill = () => {
        form.setFieldsValue({
            name: 'Destainer',
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
                        </Col >
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
                                <Radio.Button value="a">Attributes</Radio.Button>
                                <Radio.Button value="c">DEPRICATED</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row >
                }
            ></Card >

            <Row gutter={[24, 0]}>
                <Col span={24} md={16} className="mb-24 ">
                    <Card
                        bordered={false}
                        className="header-solid h-full"
                        title={<h6 className="font-semibold m-0">Attributes List</h6>}
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
                        title={<h6 className="font-semibold m-0">Add New Attribute</h6>}
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
                                name="name"
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
                                        min: 6,
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

export default Attributes;


