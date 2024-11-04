import { Row, Col, Card, Radio, Table, message, Button, Avatar, Typography, Modal, Upload, Tabs, Form, Input, Space, Select} from "antd";
import { DeleteOutlined, EditOutlined, ToTopOutlined } from "@ant-design/icons";
import Draggable from 'react-draggable';
import { useRef, useState } from "react";
import { SoldAs } from "./SoldAsTab";
import CategorySelect  from "./CategoryTab";
import AttribSelect  from "./AttributesTab";
import BrandSelect from "./BrandTab";
import apiClient from "../../axios-client";



const face = "https://images.pexels.com/photos/5217897/pexels-photo-5217897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const face2 = "https://images.unsplash.com/photo-1604603815783-2bd94c5a819f?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const face3 = "https://images.pexels.com/photos/5218014/pexels-photo-5218014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const face4 = "https://images.pexels.com/photos/7262480/pexels-photo-7262480.jpeg?auto=compress&cs=tinysrgb&w=800";
const face5 = "https://images.pexels.com/photos/5217911/pexels-photo-5217911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const face6 = "https://images.pexels.com/photos/5217911/pexels-photo-5217911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";



const { Title } = Typography;


// table code start

const columns = [
    {
        title: "Id",
        dataIndex: "id",
        key: "id",
        width: "3%",
    },
    {
        title: "Product",
        dataIndex: "name",
        key: "name",
        width: "32%",
    },
    {
        title: "Category",
        dataIndex: "category",
        key: "category",
    },

    {
        title: "STATUS",
        key: "status",
        dataIndex: "status",
    },

    {
        title: "Inventory",
        key: "employed",
        dataIndex: "employed",
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

const data = [
    {
        key: "1",
        id: (
            <>
                <div className="author-info">
                    <Title level={5}>#001</Title>
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
                        src={face2}
                    ></Avatar>
                    <div className="avatar-info">
                        <Title level={5}>Dishwashing</Title>
                        <p>Nsonga brand 002</p>
                    </div>
                </Avatar.Group>{" "}
            </>
        ),
        category: (
            <>
                <div className="author-info">
                    <p>Category007</p>
                </div>
            </>
        ),
        function: (
            <>
                <div className="author-info">
                    <Title level={5}>Manager</Title>
                    <p>Organization</p>
                </div>
            </>
        ),

        status: (
            <>
                <Button type="primary" className="tag-primary">
                    Availlable
                </Button>
            </>
        ),
        employed: (
            <>
                <div className="ant-employed">
                    <Button type="dashed" >
                        Check
                    </Button>
                </div>
            </>
        ),
    },

    {
        key: "2",
        id: (
            <>
                <div className="author-info">
                    <Title level={5}>#002</Title>
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
                        src={face3}
                    ></Avatar>
                    <div className="avatar-info">
                        <Title level={5}>Handwash</Title>
                        <p>Nsonga brand 005</p>
                    </div>
                </Avatar.Group>{" "}
            </>
        ),
        category: (
            <>
                <div className="author-info">
                    <p>Category001</p>
                </div>
            </>
        ),
        function: (
            <>
                <div className="author-info">
                    <Title level={5}>Programator</Title>
                    <p>Developer</p>
                </div>
            </>
        ),

        status: (
            <>
                <Button className="tag-badge">Avallable</Button>
            </>
        ),
        employed: (
            <>
                <div className="ant-employed">
                    <Button type="dashed" >
                        Check
                    </Button>

                </div>
            </>
        ),
    },

    {
        key: "3",
        id: (
            <>
                <div className="author-info">
                    <Title level={5}>#003</Title>
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
                        src={face}
                    ></Avatar>
                    <div className="avatar-info">
                        <Title level={5}>Multipurpose</Title>
                        <p>Nsonga brand 001</p>
                    </div>
                </Avatar.Group>{" "}
            </>
        ),
        category: (
            <>
                <div className="author-info">
                    <p>Category004</p>
                </div>
            </>
        ),
        function: (
            <>
                <div className="author-info">
                    <Title level={5}>Executive</Title>
                    <p>Projects</p>
                </div>
            </>
        ),

        status: (
            <>
                <Button type="primary" className="tag-primary">
                    Availlable
                </Button>
            </>
        ),
        employed: (
            <>
                <div className="ant-employed">
                    <Button type="dashed" >
                        Check
                    </Button>
                </div>
            </>
        ),
    },
    {
        key: "4",
        id: (
            <>
                <div className="author-info">
                    <Title level={5}>#004</Title>
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
                        src={face4}
                    ></Avatar>
                    <div className="avatar-info">
                        <Title level={5}>Tiles Cleaner</Title>
                        <p>Nsonga brand 002</p>
                    </div>
                </Avatar.Group>{" "}
            </>
        ),
        category: (
            <>
                <div className="author-info">
                    <p>Category001</p>
                </div>
            </>
        ),
        function: (
            <>
                <div className="author-info">
                    <Title level={5}>Marketing</Title>
                    <p>Organization</p>
                </div>
            </>
        ),

        status: (
            <>
                <Button type="primary" className="tag-primary">
                    Availlable
                </Button>
            </>
        ),
        employed: (
            <>
                <div className="ant-employed">
                    <Button type="dashed" >
                        Check
                    </Button>

                </div>
            </>
        ),
    },
    {
        key: "5",
        id: (
            <>
                <div className="author-info">
                    <Title level={5}>#005</Title>
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
                        src={face5}
                    ></Avatar>
                    <div className="avatar-info">
                        <Title level={5}>Rust remover</Title>
                        <p>Nsonga brand 002</p>
                    </div>
                </Avatar.Group>{" "}
            </>
        ),
        category: (
            <>
                <div className="author-info">
                    <p>Category005</p>
                </div>
            </>
        ),
        function: (
            <>
                <div className="author-info">
                    <Title level={5}>Manager</Title>
                    <p>Organization</p>
                </div>
            </>
        ),

        status: (
            <>
                <Button className="tag-badge">Unavaillable</Button>
            </>
        ),
        employed: (
            <>
                <div className="ant-employed">
                    <Button type="dashed" >
                        Check
                    </Button>

                </div>
            </>
        ),
    },

    {
        key: "6",
        id: (
            <>
                <div className="author-info">
                    <Title level={5}>#006</Title>
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
                        src={face6}
                    ></Avatar>
                    <div className="avatar-info">
                        <Title level={5}>Blood remover</Title>
                        <p>Nsonga brand 006</p>
                    </div>
                </Avatar.Group>{" "}
            </>
        ),
        category: (
            <>
                <div className="author-info">
                    <p>Category001</p>
                </div>
            </>
        ),
        function: (
            <>
                <div className="author-info">
                    <Title level={5}>Tester</Title>
                    <p>Developer</p>
                </div>
            </>
        ),

        status: (
            <>
                <Button className="tag-badge">Unavaillable</Button>
            </>
        ),
        employed: (
            <>
                <div className="ant-employed">
                    <Button type="dashed" >
                        Check
                    </Button>


                </div>
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


function Products() {

    const [loading,isLoading] = useState(false);
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
            'sold_as': soldValue
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
        // for (const [key, value] of formData.entries()) {
        //     console.log(key, value); // This will log each key and value in FormData
        // }

        try{
            isLoading(true)
            const response = await apiClient.post('/products',formData ,{
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            });
            if (response.data.success) {
                message.success(response.data.message);
                form.resetFields(); 
                setFileList([]); 
            } else {
                message.error(response.data.message || 'Failed to upload product');
            }

        }catch(error){
            console.error(error.message);
            message.error('An error occurred while uploading the product');
        }
        finally{
            isLoading(false);
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

    return (
        <>
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
                                            <CategorySelect onSelect={(value)=>setCategory(value)} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={6}>
                                        <Form.Item
                                            name="brand_id"
                                            label="Brand"
                                           
                                        >
                                            <BrandSelect onSelect={(value) => setBrand(value)} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            name="attribute_id"
                                            label="Attribute"
                                            
                                        >
                                            <AttribSelect onSelect={(value) => setAttribute(value)} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                    

                                    <Col span={6}>
                                        <Form.Item
                                            name="sold_as"
                                            label="Sold as"
                                        >
                                            <SoldAs onSelect={(value) => setSoldValue(value)}/>
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
                                              loading={loading}
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

export default Products;
