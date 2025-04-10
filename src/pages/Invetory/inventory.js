import { Row, Col, Card, Radio, Table, message, Button, Avatar, Typography, Modal, Upload, Tabs, Form, Input, Space} from "antd";
import { DeleteOutlined, EditOutlined, ToTopOutlined } from "@ant-design/icons";
import Draggable from 'react-draggable';
import { useEffect, useRef, useState } from "react";
import { fetchAllProducts } from "../products/productFetcher";



const face = "https://images.pexels.com/photos/5217897/pexels-photo-5217897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const face2 = "https://images.unsplash.com/photo-1604603815783-2bd94c5a819f?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const face3 = "https://images.pexels.com/photos/5218014/pexels-photo-5218014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const face4 = "https://images.pexels.com/photos/7262480/pexels-photo-7262480.jpeg?auto=compress&cs=tinysrgb&w=800";
const face5 = "https://images.pexels.com/photos/5217911/pexels-photo-5217911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const face6 = "https://images.pexels.com/photos/5217911/pexels-photo-5217911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

function Inventory() {

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
// table code start

const [product , setProduct]  = useState([]);
const [loading , isLoading] = useState(false)

useEffect( () => {fetchAllProducts(setProduct , isLoading)} ,[])

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
        title: "Attribute",
        dataIndex: "attribute",
        key: "attribute",
    },
    {
        title: "Tax",
        key: "tax",
        dataIndex: "tax",
    },
    {
        title: "Price",
        key: "price",
        dataIndex: "price",
    },
    {
        title: "Selling Price",
        key: "selling_price",
        dataIndex: "selling_price",
    },
    {
        title: "Inventory",
        key: "inventory",
        dataIndex: "inventory",
    },
    
];

const data = product.map((prod,index) => { 
    return (
        {
            
                key: prod.id,
                id: (
                    <div className="author-info">
                        <Title level={5}>{index < 9 ? `0${index + 1}`: index + 1}</Title>
                    </div>
                ),
                name: (
                    <Avatar.Group>
                        <Avatar
                            className="shape-avatar"
                            shape="square"
                            size={60}
                            src={prod.image_url}
                        />
                        <div className="avatar-info">
                            <Title level={5}>{prod.name}</Title>
                            <p>{prod.brand_name}</p>
                        </div>
                    </Avatar.Group>
                ),
                attribute: (
                    <div className="author-info">
                        <p>{prod.attribute_name + `(${prod.attribute_unit})`}</p>
                    </div>
                ),
                tax: prod.tax,
                price: prod.price,
                selling_price: `${prod.price - prod.tax}.00`,
                inventory: (
                    <Input  value={prod.inventory} />
                ),
                
            
                
        }
    )
})



// Your delete handler function
const handleDelete = (key) => {
    // Logic to delete the row
    console.log('Delete record with key:', key);
    // Add your delete logic here, such as updating the state or calling an API
};

const handleEdit = (key) => {
    console.log('Edit record with key:', key);
}



    // const onChange = (e) => console.log(`radio checked:${e.target.value}`);

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
    const onFinish = () => {
        message.success('Submit success!');
    };
    const onFinishFailed = () => {
        message.error('Submit failed!');
    };
    const onFill = () => {
        form.setFieldsValue({
            url: 'https://taobao.com/',
        });
    };

    const { TextArea } = Input;

    const [size, setSize] = useState('small');
    const onChange = (e) => {
        setSize(e.target.value);
    };

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
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="name"
                                            label="Name"
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
                                </Row>


                                <Row gutter={16}>



                                    <Col span={24}>
                                        <div className="uploadfile pb-15 shadow-none">
                                            <Upload {...formProps}>
                                                <Button
                                                    type="dashed"
                                                    className="ant-full-box"
                                                    icon={<ToTopOutlined />}
                                                >
                                                    Upload Image
                                                </Button>
                                            </Upload>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <TextArea label="Description" rows={3} placeholder="Product short decription" maxLength={6} />
                                    </Col>
                                </Row>

                                <Row span={24}>

                                    <div className="attributes">
                                        <Tabs
                                            defaultActiveKey="1"
                                            type="card"
                                            size={size}

                                            items={[
                                                {
                                                    label: 'Attributes',
                                                    key: '1',
                                                    children: <Table dataSource={data} loading={loading}/>,
                                                },
                                                {
                                                    label: 'Attribute Value',
                                                    key: '2',
                                                    children: 'Content of Attribute Value tab',
                                                },
                                                {
                                                    label: 'Sold As',
                                                    key: '3',
                                                    children: 'Content of Sold As tab',
                                                },
                                                {
                                                    label: 'Price',
                                                    key: '4',
                                                    children: 'Content of Price tab',
                                                },
                                                {
                                                    label: 'Tax',
                                                    key: '5',
                                                    children: 'Content of Tax tab',
                                                },
                                                {
                                                    label: 'Inventory',
                                                    key: '6',
                                                    children: 'Content of Inventory tab',
                                                },
                                            ]}

                                        />
                                    </div>

                                </Row>
                            </Form>
                        </Modal>


                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Inventory"
                            extra={
                                <>
                                    <Radio.Group onChange={onChange} defaultValue="a">
                                        {/* <Button style={{ backgroundColor: '#0E1573', borderColor: '#0E1573', color: '#fff' }} onClick={showModal}>Add Product</Button> */}
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

export default Inventory;
