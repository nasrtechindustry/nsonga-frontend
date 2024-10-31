import { Row, Col, Table, Card, Button, Form, Input, message, Space, Modal, Radio } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import BgProfile from "../../assets/images/bg-profile.jpg";
import apiClient from "../../axios-client";
import { useState, useEffect } from "react";
import Loader from "../../components/loader/Loader";

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
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

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
                    <Button
                        type="text"
                        icon={<DeleteOutlined style={{ color: 'red' }} />}
                        onClick={() => showDeleteModal(record)}
                        style={{ padding: 0, width: 'auto' }}
                    />
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
                total: response.data.total,
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
                fetchCategories(pagination.current);
                message.success(response.data.message);
                form.resetFields();
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
                fetchCategories(pagination.current);
                message.success(response.data.message);
                setEditingCategory(null);
                setIsModalVisible(false);
                form.resetFields();
            } else {
                message.error(response.data.message);
            }
        } catch (err) {
            message.error('Failed to update category: ' + (err.response?.data.message || 'Category name must be unique'));
        } finally {
            setLoading(false);
        }
    };

    const showDeleteModal = (category) => {
        setSelectedCategory(category);
        setIsDeleteModalVisible(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            setLoading(true);
            const response = await apiClient.patch(`/category/${selectedCategory.id}/archive`);
            if (response.data.success) {
                message.success(response.data.message);
                fetchCategories(pagination.current);
                setIsDeleteModalVisible(false);
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
        form.setFieldsValue({ category_name: category.name });
        setIsModalVisible(true);
    };

    const onFill = () => {
        form.setFieldsValue({
            name: 'Destainer',
        });
    };

    return (
        <>
            <div
                className="profile-nav-bg"
                style={{ backgroundImage: `url(${BgProfile})` }}
            ></div>

            {/* {isLoading && <Loader />} */}

            <Card
                className="card-profile-head"
                bodyStyle={{display: "none"}}
                title={
                    <Row justify="space-between" align="middle" gutter={[24, 0]}>
                        <Col span={24} md={12} className="col-info"></Col>
                        <Col span={24} md={12} style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
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
                        title={<h6 className="font-semibold m-0">Categories List</h6>}
                    >
                        <Table
                            dataSource={dataSource}
                            loading={isLoading}
                            columns={columns}
                            className="ant-border-space"
                            pagination={{
                                current: pagination.current,
                                pageSize: pagination.pageSize,
                                total: pagination.total,
                                showSizeChanger: true,
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

            <Modal
                title="Edit Category"
                open={isModalVisible}
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
                                form.resetFields();
                            }} style={{ marginLeft: 8 }}>
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Confirm Delete"
                open={isDeleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={() => setIsDeleteModalVisible(false)}
                okText="Delete"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to delete this category?</p>
            </Modal>
        </>
    );
}

export default Category;
