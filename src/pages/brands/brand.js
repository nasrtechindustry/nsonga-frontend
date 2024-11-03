import React, { useEffect, useState } from "react";
import { Row, Col, Table, Card, Button, Form, Input, message, Space, Modal, Radio,} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import apiClient from "../../axios-client";
import BgProfile from "../../assets/images/bg-profile.jpg";

const Brand = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 3,
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    // Fetch brands from the API
    const fetchBrands = async (page = 1, pageSize = 3) => {
        setLoading(true);
        try {
            const response = await apiClient.get("http://localhost:8000/api/brands", {
                params: { page, pageSize },
            });
            setDataSource(response.data); // Adjust based on your API response structure
            setPagination({
                current: page,
                pageSize: pageSize,
                total: response.total, // Total number of brands from the API response
            });
        } catch (error) {
            message.error("Failed to fetch brands");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    // Handle Add Brand
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await apiClient.post("http://localhost:8000/api/brands", values);
            message.success("Brand added successfully!");
            setDataSource([...dataSource, response.data]); // Add the new brand to the state
            form.resetFields(); // Reset form fields
            fetchBrands(pagination.current, pagination.pageSize); // Refresh brands
        } catch (error) {
            message.warn("The brand name exists, it should be unique!");
        } finally {
            setLoading(false);
        }
    };

    const onFill = () => {
        form.setFieldsValue({
            name: 'Destainer',
        });
    };

    // Handle Edit button click
    const handleEdit = (brand) => {
        setSelectedBrand(brand);
        setIsEditModalOpen(true);
        form.setFieldsValue({ name: brand.name });
    };

    const handleTableChange = (pagination) => {
        fetchBrands(pagination.current, pagination.pageSize);
    };

    // Confirm Edit
    const handleEditConfirm = async () => {
        try {
            setLoading(true)
            const updatedBrand = form.getFieldValue("name");
            await apiClient.put(`http://localhost:8000/api/brands/${selectedBrand.id}`, {
                name: updatedBrand,
            });
            message.success("Brand updated successfully!");
            setDataSource((prevData) =>
                prevData.map((item) => (item.id === selectedBrand.id ? { ...item, name: updatedBrand } : item))
            );
            setIsEditModalOpen(false);
        } catch (error) {
            message.error("Failed to update brand");
        }finally{
            setLoading(false)
        }
    };

    // Handle Delete button click
    const handleDelete = (brand) => {
        setSelectedBrand(brand);
        setIsDeleteModalOpen(true);
    };

    // Confirm Delete
    const handleDeleteConfirm = async () => {
        setLoading(true);
        try {
            await apiClient.delete(`http://localhost:8000/api/brands/${selectedBrand.id}`);
            message.success("Brand deleted successfully!");
            setDataSource((prevData) =>
                prevData.filter((item) => item.id !== selectedBrand.id)
            );
            setIsDeleteModalOpen(false);
        } catch (error) {
            message.error("Failed to delete brand");
        } finally {
            setLoading(false);
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
                style={{backgroundImage: "url(" + BgProfile + ")"}}
            ></div>

            <Card
                className="card-profile-head"
                bodyStyle={{display: "none"}}
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
                                <Radio.Button value="c">DEPRICATED</Radio.Button>
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
                        title={<h6 className="font-semibold m-0">Brands List</h6>}
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
                                    fetchBrands(page, pageSize);
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
                        title={<h6 className="font-semibold m-0">Add New Brand</h6>}
                        className="header-solid h-full card-profile-information"
                        bodyStyle={{paddingTop: 0, paddingBottom: 16}}
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
                                rules={[{required: true, message: "Please enter the brand name!"}]}
                            >
                                <Input placeholder="Enter brand name"/>
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
                title="Edit Brand"
                open={isEditModalOpen}
                onOk={handleEditConfirm}
                onCancel={() => setIsEditModalOpen(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Brand Name"
                        rules={[{ required: true, message: "Please enter the brand name!" }]}
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
                <p>Are you sure you want to delete this brand?</p>
            </Modal>
        </>
    );
};

export default Brand;
