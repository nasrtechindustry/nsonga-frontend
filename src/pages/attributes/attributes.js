import { useState, useEffect } from 'react';
import { Row, Col, Table, Card, Radio, Button, Form, Input, message, Space } from "antd";
import BgProfile from "../../assets/images/bg-profile.jpg";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useFetch } from "../../hooks/use-fetcher.js";
import { FETCH_ALL_ATTRIBUTES } from "../../config/endpoints.js";
import { performPostRequest } from '../../config/api.js';

const columns = [
    {
        title: 'SN',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Unit',
        dataIndex: 'unit',
        key: 'unit',
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

const handleDelete = (key) => {
    // console.log('Delete record with key:', key);
};

const handleEdit = (key) => {
    // console.log('Edit record with key:', key);
};



function Attributes() {

    const [form] = Form.useForm();
    const [attributesData, setAttributesData] = useState([]);

    const { data, loading, error, refetch } = useFetch(FETCH_ALL_ATTRIBUTES, {
        params: { search: 'query' },
        autoRefresh: true,
    });


    const handleCreate =  async () => {

        const values = await form.validateFields();

    
        const payload = {
            name: values.name,
            unit: values.unit
        };
    
        try {
         
           const response = await performPostRequest('attributes', payload);
            if (response.ok) {
                message.success(response.data.message);
            } else {
                message.error('Failed to create attribute. Please try again.');
            }
        } catch (error) {
            // console.error('Error creating attribute:', error);
            message.error('Failed to create attribute. Please try again.');
        }
    
    }

    // console.log(data);

    // Update attributesData when fetched data changes
    useEffect(() => {
        if (data) {
            setAttributesData(data.data);
        }
    }, [data]);

    const onFinish = () => {
        message.success('Submit success!');
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    const onFill = () => {
        form.setFieldsValue({
            name: 'Litre',
            unit: '5'
        });
    };

    return (
        <>
            <div className="profile-nav-bg" style={{ backgroundImage: "url(" + BgProfile + ")" }}></div>
            <Card className="card-profile-head" bodyStyle={{ display: "none" }}
                  title={
                      <Row justify="space-between" align="middle" gutter={[24, 0]}>
                          <Col span={24} md={12} className="col-info"></Col>
                          <Col span={24} md={12} style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                          }}>
                              <Radio.Group defaultValue="a">
                                  <Radio.Button value="a">Attributes</Radio.Button>
                                  <Radio.Button value="c">DEPRECATED</Radio.Button>
                              </Radio.Group>
                          </Col>
                      </Row>
                  }
            />
            <Row gutter={[24, 0]}>
                <Col span={24} md={16} className="mb-24">
                    <Card bordered={false} className="header-solid h-full" title={<h6 className="font-semibold m-0">Attributes List</h6>}>
                        <div className="table-responsive">
                            <Table
                                dataSource={attributesData}
                                columns={columns}
                                className="ant-border-space"
                                loading={loading}
                            />
                        </div>
                    </Card>
                </Col>
                <Col span={24} md={8} className="mb-24">
                    <Card bordered={false} title={<h6 className="font-semibold m-0">Add New Attribute</h6>} className="header-solid h-full card-profile-information" bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}>
                        <hr className="my-25" />
                        <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="on">
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    { required: true },
                                    { type: 'string', min: 4 },
                                ]}
                            >
                                <Input placeholder="Enter Attribute name" />
                            </Form.Item>

                            <Form.Item
                                name="unit"
                                label="Unit"
                                rules={[
                                    { required: true },
                                    { type: 'string' },
                                ]}
                            >
                                <Input placeholder="Enter Attribute unit" />
                            </Form.Item>

                            <Form.Item>
                                <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button onClick={handleCreate} style={{ backgroundColor: '#0E1573', borderColor: '#0E1573', color: '#fff' }}>
                                        Create Attribute
                                    </Button>
                                    <Button htmlType="button" onClick={onFill}>Fill</Button>
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
