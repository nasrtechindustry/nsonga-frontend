import { Row, Col, Table, Card, Button, Form, Input, message, Space, Popconfirm, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import BgProfile from "../assets/images/bg-profile.jpg";
import apiClient from "../axios-client";
import { useState, useEffect } from "react";
import Loader from "../components/loader/Loader";

function Category() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [dataSource, setDataSource] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 3,
        total: 0,
    });

    const columns = [
        {
            title: 'SN',
            render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
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
                        onClick={() => handleEdit(record)} // Pass the whole record
                        style={{ padding: 2, width: 'auto' }}
                    />
                    <Popconfirm
                        title="Are you sure to delete this category?"
                        onConfirm={() => handleDelete(record.id)} 
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="text"
                            icon={<DeleteOutlined style={{ color: 'red' }} />}
                            style={{ padding: 0, width: 'auto' }}
                        />
                    </Popconfirm>
                </>
            ),
        },
    ];

    const fetchCategories = async (current = 1, pageSize = pagination.pageSize) => {
        try {
            setLoading(true);
            const response = await apiClient.get('/category', {
                params: { page: current, pageSize },
            });
            const data = response.data.data.map((category) => ({
                key: category.id,
                id: category.id, 
                name: category.name,
            }));

            setDataSource(data);
            setPagination((prev) => ({
                ...prev,
                current,
                total: response.data.total, // Set the total count from the response
            }));
        } catch (error) {
            message.error('Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async (values) => {
        const payload = {
            name: values.category_name,
        };

        setLoading(true);
        try {
            const response = await apiClient.post('/category', payload);
            if (response.data.success) {
                fetchCategories(pagination.current); // Refresh categories on the current page
                message.success(response.data.message);
                form.resetFields(); // Reset form fields after submission
            } else {
                message.error(response.data.message);
            }
        } catch (err) {
            message.error('Failed to add category: ' + (err.response?.data.message || 'Category name must be unique'));
        } finally {
            setLoading(false);
        }
    };

    const handleEditCategory = async (values) => {
        const payload = {
            name: values.category_name,
        };

        setLoading(true);
        try {
            const response = await apiClient.put(`/category/${editingCategory.id}`, payload);
            if (response.data.success) {
                fetchCategories(pagination.current); // Refresh categories on the current page
                message.success(response.data.message);
                setEditingCategory(null);
                setIsModalVisible(false); // Close modal after successful update
                form.resetFields(); // Reset form fields after submission
            } else {
                message.error(response.data.message);
            }
        } catch (err) {
            message.error('Failed to update category: ' + (err.response?.data.message || 'Category name must be unique'));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const response = await apiClient.patch(`/category/${id}/archive`);
            if (response.data.success) {
                message.success(response.data.message);
                fetchCategories(pagination.current); // Refresh categories on the current page
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error('Server Error: Unable to delete the category');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        form.setFieldsValue({ category_name: category.name }); // Set the form values for editing
        setIsModalVisible(true); // Open the modal for editing
    };

    return (
        <>
            <div
                className="profile-nav-bg"
                style={{ backgroundImage: `url(${BgProfile})` }}
            ></div>

            {isLoading && <Loader />}

            <Row gutter={[24, 0]}>
                <Col span={24} md={16} className="mb-24 ">
                    <Card
                        bordered={false}
                        className="header-solid h-full"
                        title={<h6 className="font-semibold m-0">Categories List</h6>}
                    >
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            className="ant-border-space"
                            pagination={{
                                current: pagination.current,
                                pageSize: pagination.pageSize,
                                total: pagination.total,
                                onChange: (page, pageSize) => {
                                    fetchCategories(page, pageSize);
                                },
                            }}
                        />
                    </Card>
                </Col>

                <Col span={24} md={8} className="mb-24">
                    <Card
                        bordered={false}
                        title={<h6 className="font-semibold m-0">Add Category</h6>}
                        className="header-solid h-full card-profile-information"
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleAddCategory}
                        >
                            <Form.Item
                                name="category_name"
                                label="Category Name"
                                rules={[{ required: true, message: 'Please input the category name!' }]}
                            >
                                <Input placeholder="Enter Category name" />
                            </Form.Item>
                            <Form.Item>
                                <Space>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>

            <Modal
                title="Edit Category"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleEditCategory}
                    initialValues={editingCategory ? { category_name: editingCategory.name } : {}}
                >
                    <Form.Item
                        name="category_name"
                        label="Category Name"
                        rules={[{ required: true, message: 'Please input the category name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                            <Button onClick={() => {
                                setIsModalVisible(false);
                                setEditingCategory(null);
                                form.resetFields(); // Reset fields when canceling edit
                            }} style={{ marginLeft: 8 }}>
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Category;
