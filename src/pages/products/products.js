import { Row, Col, Card, Radio, Table, Divider ,Image, Skeleton, message, Button, Avatar, Typography, Modal, Upload, Tabs, Form, Input, Space, Select} from "antd";
import { CheckCircleOutlined, DeleteOutlined, EditOutlined, ToTopOutlined } from "@ant-design/icons";
import Draggable from 'react-draggable';
import { useEffect, useRef, useState } from "react";
import { SoldAs } from "./SoldAsTab";
import CategorySelect  from "./CategoryTab";
import AttribSelect  from "./AttributesTab";
import BrandSelect from "./BrandTab";
import apiClient from "../../axios-client";
import { useHistory } from "react-router-dom";
import { fetchAllProducts } from "./productFetcher";
import ProductStatus from "./status";

const { Title ,Text} = Typography;


function Products() {
    const history = useHistory();
    const [loading,isLoading] = useState(false);
    const [btnLoading,isBtnLoading] = useState(false);
    const [description,setDescription] = useState(null);
    const [brand, setBrand] = useState(null);
    const [attribute, setAttribute] = useState(null);
    const [category , setCategory] = useState(null);
    const [soldValue,setSoldValue] = useState(null);
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });
    const draggleRef = useRef(null);
    const showModal = () => {
        setOpen(true);
    };

    const handleOk = (e) => {
        console.log(e);
        setOpen(false);
    };
    const handleCancel = (e) => {
        console.log(e);
        setOpen(false);
    };
    const onStart = (_event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
            return;
        }
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const handleChangePicture = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onFinish = async (values) => {
        const payload = {
            ...values,
            description: description,
            brand_id:brand,
            attribute_id:attribute,
            category_id:category,
            sold_as: soldValue
        }

        const formData = new FormData();

        // Append all other product information to FormData
        for (const key in payload) {
            formData.append(key, payload[key]);
        }
        
        // Append the single file to FormData
        if (fileList.length > 0) {
            formData.append('image', fileList[0].originFileObj);  
        }
        
        // for debugging only
        for (const [key, value] of formData.entries()) {
            console.log(key, value); // This will log each key and value in FormData
        }

        try{
            isBtnLoading(true)
            const response = await apiClient.post(`${process.env.REACT_APP_API_BASE_URL}/products`,formData ,{
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            });
            if (response.data.success) {
                message.success(response.data.message);
                form.resetFields(); 
                setFileList([]); 
                fetchAllProducts(setProducts ,isLoading)
                setOpen(false);
            } else {
                message.error(response.data.message || 'Failed to upload product');
            }

        }catch(error){
            console.error(error.message);
            message.error('An error occurred while uploading the product');
        }
        finally{
            isBtnLoading(false);
            setDescription(null)
        }
    };
    const onFinishFailed = () => {
        message.error('Submit failed!');
    };
    const { TextArea } = Input;

    const [size, setSize] = useState('small');
    const onChange = (e) => {
        setSize(e.target.value);
    };
    const hanldeDescr = (event) =>{
        setDescription(event)
    }

    const [products, setProducts] = useState([]);
    
    
    useEffect(()=>{fetchAllProducts(setProducts ,isLoading)},[]);


    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: "3%",
        },
        {
            title: "PRODUCT",
            dataIndex: "name",
            key: "name",
            width: "32%",
        },
        {
            title: "CATEGORY",
            dataIndex: "category",
            key: "category",
        },
    
        {
            title: "STATUS",
            key: "status",
            dataIndex: "status",
        },
    
        {
            title: "INVENTORY",
            key: "inventory",
            render: (_, record) => (
                <div style={styles.centered}>
                    <Button
                        type="secondary" // Use primary color for better visibility
                        icon={<CheckCircleOutlined />} // Icon to represent the action
                        onClick={() => handleCheck(record.key)}
                        style={styles.button} // Apply consistent styles
                    >
                        Check
                    </Button>
                </div>
            ),
        },
    
        {
            title: "ACTIONS",
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
    const styles = {
    centered: {
        display: 'flex',
        justifyContent: 'center', // Center the content horizontally
        alignItems: 'center',  
        padding: '0'   // Center the content vertically (optional)
    },
    button: {
        borderRadius: '20px',   // Add rounded corners for a modern look
        fontWeight: '600',     // Bold text for better readability
        fontSize: '14px',      // Set a readable font size
        transition: 'all 0.3s ease',
        // height: '100%',          
    },
};
    
    const data = products.map((prod,index) => {
       return (
        {
            key: prod.id,
            id : (
                <>
                    <div className="author-info">
                        <Title level={5}>{index < 9 ? `0${index + 1}`: index + 1}</Title>
                    </div>
                </>
            ),
            name: (
                <>
                    <Avatar.Group>
                        <Avatar
                            className="shape-avatar"
                            shape="square"
                            size={60}
                            src={prod.image_url}
                        ></Avatar>
                        <div className="avatar-info">
                            <Title level={5}>{prod.name.charAt(0).toUpperCase() + prod.name.slice(1)}</Title>
                            <p>{prod.brand_name}</p>
                        </div>
                    </Avatar.Group>{" "}
                </>
            ),
            category: (
                <>
                    <div className="author-info">
                        <p>{prod.category_name}</p>
                    </div>
                </>
            ),
            status: (
                <ProductStatus prod={prod}/>
            ),
            
        }
       );
    });


    // Your delete handler function
    // Handle the deletion before ask the user:
    const handleDelete = async (key) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this product?',
            content: 'Once deleted, you will not be able to recover this product.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    const response = await apiClient.delete(`${process.env.REACT_APP_API_BASE_URL}/products/${key}`);
    
                    if (response.data.success) {
                        message.success(response.data.message || "Product deleted successfully");
                        fetchAllProducts();
                    } else {
                        message.error(response.data.message || "There was an error while deleting");
                    }
                } catch (error) {
                    console.error(error.message);
                    message.error("An unexpected error occurred.");
                } 
            },
        });
    }   
    
    const handleEdit = (key) => {
        history.push(`/products/edit/${key}`);// Navigate to the edit route with product ID
    };

    const [view , setView] = useState(null);
    const [modalVisible , setModalVisible] = useState(false)

    const handleCheck = async (key) => {
        try {
            const response = await apiClient.get(`${process.env.REACT_APP_API_BASE_URL}/products/${key}`);
            
            setView(response.data.data)
            setModalVisible(true)

        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };
    
    
    
    return (
        <>
      <Modal
        title={view?.name || 'Product Details'}
        open={modalVisible}  // Ensure this matches your state variable name
        onCancel={() => setModalVisible(false)}  // Toggle modal visibility
        footer={null}
    >
        <div>
        {view ? (
            <Card
                bordered={false}
                style={{ width: '100%' }}
            >
                {/* Product Image */}
                {view.image_url ? (
                    <Image
                        src={view.image_url}
                        alt={view.name}
                        style={{
                            width: '100%',
                            maxHeight: '300px',
                            objectFit: 'contain',
                            marginBottom: '16px',
                        }}
                        placeholder={
                            <div
                                style={{
                                    width: '100%',
                                    height: '300px',
                                    backgroundColor: '#f5f5f5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text>Loading Image...</Text>
                            </div>
                        }
                    />
                ) : (
                    <div
                        style={{
                            width: '100%',
                            height: '300px',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '16px',
                        }}
                    >
                        <Text type="secondary">No image available</Text>
                    </div>
                )}

                <Divider />

                {/* Product Details */}
                <Text strong>Selling Price:</Text> <Text>{view.price - view.tax}</Text>
                <br />
                <Text strong>Tax:</Text> <Text>{view.tax}</Text>
                <br />
                <Text strong>Price:</Text> <Text>{view.price}</Text>
                <br />
                <Text strong>Inventory:</Text> <Text>{view.inventory}</Text>
                <br />
                <Text strong>Status:</Text> <Text>{view.available == 0 ? "Unavailable" : "Available"}</Text>
                <br />
                <Text strong>Brand:</Text> <Text>{view.brand_name}</Text>
                <br />
                <Text strong>Category:</Text> <Text>{view.category_name}</Text>
                <br />
                <Text strong>Attribute:</Text> <Text>{view.attribute_name + " " + view.attribute_unit}</Text>
                <br />
                
                <Text strong>Description:</Text>{' '}
                <Text>{view.description || 'No description available'}</Text>
                
            </Card>
        ) : (
            // Skeleton Loading State
            <Card bordered={false} style={{ width: '100%' }}>
                <Skeleton active paragraph={{ rows: 5 }} />
            </Card>
        )}
        </div>
    </Modal>

            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>


                        <Modal
                            title={
                                <div
                                    style={{
                                        width: '100%',
                                        cursor: 'move',
                                    }}
                                    onMouseOver={() => {
                                        if (disabled) {
                                            setDisabled(false);
                                        }
                                    }}
                                    onMouseOut={() => {
                                        setDisabled(true);
                                    }}
                                >
                                    Add New Product
                                </div>
                            }

                            width={1000}

                            open={open}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={null}
                            modalRender={(modal) => (
                                <Draggable
                                    disabled={disabled}
                                    bounds={bounds}
                                    nodeRef={draggleRef}
                                    onStart={(event, uiData) => onStart(event, uiData)}
                                >
                                    <div ref={draggleRef}>{modal}</div>
                                </Draggable>
                            )}
                        >
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                    <Col span={6}>
                                        <Form.Item
                                            name="name"
                                            label="Name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the product name',
                                                },
                                                
                                            ]}
                                        >
                                            <Input placeholder="Product Name" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={6}>
                                        <Form.Item
                                            name="category_id"
                                            label="Category"
                                        
                                        >
                                            <CategorySelect onChange={(value)=>setCategory(value)} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={6}>
                                        <Form.Item
                                            name="brand_id"
                                            label="Brand"
                                           
                                        >
                                            <BrandSelect onChange={(value) => setBrand(value)} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            name="attribute_id"
                                            label="Attribute"
                                            
                                        >
                                            <AttribSelect onChange={(value) => setAttribute(value)} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                    

                                    <Col span={6}>
                                        <Form.Item
                                            name="sold_as"
                                            label="Sold as"
                                        >
                                            <SoldAs onChange={(value) => setSoldValue(value)}/>
                                        </Form.Item>
                                    </Col>

                                    <Col span={6}>
                                        <Form.Item
                                            name="price"
                                            label="Price"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter price for the product',
                                                },
                                            
                                            ]}
                                        >
                                            <Input placeholder="eg. Tsh 2000" type="number"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            name="tax"
                                            label="Tax"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the tax',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="eg. 500" type="number" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            name="inventory"
                                            label="Inventory"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the product category',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="eg. 50" type="number"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                


                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="uploadfile pb-15 shadow-none">
                                        <Upload 
                                            fileList={fileList}
                                            onChange={handleChangePicture}
                                            beforeUpload={()=>false}>
                                                <Button
                                                    type="dashed"
                                                    className="ant-full-box"
                                                    icon={<ToTopOutlined />}
                                                >
                                                    Upload Image
                                                </Button>
                                            </Upload>
                                            <div style={{ marginTop: 16 }}>
                                                {fileList.map((file) => (
                                                    <div key={file.uid} style={{ display: 'inline-block', marginRight: 8 }}>
                                                        <img
                                                            src={URL.createObjectURL(file.originFileObj)} // Create URL for preview
                                                            alt="preview"
                                                            style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 4 }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <TextArea 
                                            onChange={(e) => hanldeDescr(e.target.value)}
                                            name="description"
                                            label="Description" 
                                            rows={3} 
                                            placeholder="Product short decription" 
                                            maxLength={500}/>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item>
                                            <Button 
                                              type="primary" 
                                              htmlType="submit"
                                              style={{float: 'right',marginTop: '20px'}}
                                              loading={btnLoading}
                                            >
                                                Add Product
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal>


                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Products"
                            extra={
                                <>
                                    <Radio.Group onChange={onChange} defaultValue="a">
                                        <Button style={{ backgroundColor: '#0E1573', borderColor: '#0E1573', color: '#fff' }} onClick={showModal}>Add Product</Button>
                                    </Radio.Group>
                                </>
                            }
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    pagination={true}
                                    loading={loading}
                                    className="ant-border-space"
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

 ;

export default Products  ;
