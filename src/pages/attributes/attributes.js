import React, { useEffect, useState } from "react";
import { Row, Col, Table, Card, Button, Form, Input, message, Space, Modal, Radio } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import apiClient from "../../axios-client"; // Assuming you are using the same API client
import BgProfile from "../../assets/images/bg-profile.jpg";

const Attribute = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 3,
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAttribute, setSelectedAttribute] = useState(null);

    // Fetch attributes from the API
    const fetchAttributes = async (page = 1, pageSize = 3) => {
        setLoading(true);
        try {
            const response = await apiClient.get("http://localhost:8000/api/attributes", {
                params: { page, pageSize },
            });
            setDataSource(response.data.data); // Adjust based on your API response structure
            setPagination({
                current: page,
                pageSize: pageSize,
                total: response.total, // Total number of attributes from the API response
            });
        } catch (error) {
            message.error("Failed to fetch attributes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttributes();
    }, []);

    // Handle Add Attribute
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await apiClient.post("http://localhost:8000/api/attributes", values);
            message.success("Attribute added successfully!");
            setDataSource([...dataSource, response.data.data]); // Add the new attribute to the state
            form.resetFields(); // Reset form fields
            fetchAttributes(pagination.current, pagination.pageSize); // Refresh attributes
        } catch (error) {
            message.error("Failed to add attribute");
            message.warn("The attribute name exists, it should be unique!");
        } finally {
            setLoading(false);
        }
    };

    const onFill = () => {
        form.setFieldsValue({
            name: 'Sample Attribute', // Default value for filling
            unit: 'Sample Unit', // Default value for unit
        });
    };

    // Handle Edit button click
    const handleEdit = (attribute) => {
        setSelectedAttribute(attribute);
        setIsEditModalOpen(true);
        form.setFieldsValue({ 
            name: attribute.name,
            unit: attribute.unit // Set the unit value for editing
        });
    };

    const handleTableChange = (pagination) => {
        fetchAttributes(pagination.current, pagination.pageSize);
    };

    // Confirm Edit
    const handleEditConfirm = async () => {
        try {
            setLoading(true);
            const updatedAttribute = form.getFieldValue("name");
            const updatedUnit = form.getFieldValue("unit");
            await apiClient.put(`http://localhost:8000/api/attributes/${selectedAttribute.id}`, {
                name: updatedAttribute,
                unit: updatedUnit, // Send unit data in the request
            });
            message.success("Attribute updated successfully!");
            setDataSource((prevData) =>
                prevData.map((item) => (item.id === selectedAttribute.id ? { ...item, name: updatedAttribute, unit: updatedUnit } : item))
            );
            setIsEditModalOpen(false);
        } catch (error) {
            message.error("Failed to update attribute");
        }finally{
            setLoading(false);
        }
    };

    // Handle Delete button click
    const handleDelete = (attribute) => {
        setSelectedAttribute(attribute);
        setIsDeleteModalOpen(true);
    };

    // Confirm Delete
    const handleDeleteConfirm = async () => {
        setLoading(true);
        try {
            await apiClient.delete(`http://localhost:8000/api/attributes/${selectedAttribute.id}`);
            message.success("Attribute deleted successfully!");
            setDataSource((prevData) =>
                prevData.filter((item) => item.id !== selectedAttribute.id)
            );
            setIsDeleteModalOpen(false);
        } catch (error) {
            message.error("Failed to delete attribute");
        } finally {
            setActionLoading(false);
        }
    };

    const columns = [
        {
            title: "SN",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Unit", // New column for unit
            dataIndex: "unit",
            key: "unit",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EditOutlined style={{ color: "orange" }} />}
                        onClick={() => handleEdit(record)}
                        style={{ padding: 2 }}
                    />
                    <Button
                        type="text"
                        icon={<DeleteOutlined style={{ color: "red" }} />}
                        onClick={() => handleDelete(record)}
                        style={{ padding: 2 }}
                    />
                </Space>
            ),
        },
    ];

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
                                <Radio.Button value="a">Attributes</Radio.Button>
                                <Radio.Button value="c">DEPRECATED</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>
                }
            ></Card>

            <Row gutter={[24, 0]}>
                <Col span={24} md={16} className="mb-24">
                    <Card
                        bordered={false}
                        className="header-solid h-full"
                        title={<h6 className="font-semibold m-0">Attributes List</h6>}
                    >
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            loading={loading}
                            rowKey="id"
                            pagination={{
                                current: pagination.current,
                                pageSize: pagination.pageSize,
                                total: pagination.total,
                                showSizeChanger: true,
                                onChange: (page, pageSize) => {
                                    fetchAttributes(page, pageSize);
                                },
                            }}
                            onChange={handleTableChange}
                            className="ant-border-space"
                        />
                    </Card>
                </Col>

                <Col span={24} md={8} className="mb-24">
                    <Card
                        bordered={false}
                        title={<h6 className="font-semibold m-0">Add New Attribute</h6>}
                        className="header-solid h-full card-profile-information"
                        bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            autoComplete="on"
                        >
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: "Please enter the attribute name!" }]}
                            >
                                <Input placeholder="Enter attribute name" />
                            </Form.Item>
                            <Form.Item
                                name="unit"
                                label="Unit" // New field for unit
                                rules={[{ required: true, message: "Please enter the unit!" }]}
                            >
                                <Input placeholder="Enter unit" />
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

            {/* Edit Modal */}
            <Modal
                title="Edit Attribute"
                open={isEditModalOpen}
                onOk={handleEditConfirm}
                onCancel={() => setIsEditModalOpen(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Attribute Name"
                        rules={[{ required: true, message: "Please enter the attribute name!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="unit" // New field for unit in the modal
                        label="Attribute Unit"
                        rules={[{ required: true, message: "Please enter the attribute unit!" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                title="Confirm Delete"
                open={isDeleteModalOpen}
                onOk={handleDeleteConfirm}
                onCancel={() => setIsDeleteModalOpen(false)}
                okText="Delete"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to delete this attribute?</p>
            </Modal>
        </>
    );
};

export default Attribute;
