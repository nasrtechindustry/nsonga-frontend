import { Col, Row, Card, Radio, Table,InputNumber, Upload, message, Progress, Button, Avatar, Typography, Modal, Input, Form, Space ,DatePicker} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined, ContactsOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from 'react';
import ProductSelect from "./ProductSelect";
import apiClient from "../../axios-client";

const ava1 = "https://images.pexels.com/photos/5217897/pexels-photo-5217897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const ava2 = "https://images.unsplash.com/photo-1604603815783-2bd94c5a819f?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const ava3 = "https://images.pexels.com/photos/5218014/pexels-photo-5218014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const ava5 = "https://images.pexels.com/photos/7262480/pexels-photo-7262480.jpeg?auto=compress&cs=tinysrgb&w=800";
const ava6 = "https://images.pexels.com/photos/5217911/pexels-photo-5217911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
// const face6 = "https://images.pexels.com/photos/5217911/pexels-photo-5217911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";


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



const project = [
    {
        title: "Sales Id",
        dataIndex: "id",
        width: "10%",
    },
    {
        title: "Order Id",
        dataIndex: "order",
        width: "10%",
    },
    {
        title: "Product",
        dataIndex: "name",
        width: "22%",
    },
    {
        title: "Price",
        dataIndex: "price",
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
    },
    {
        title: "Status",
        dataIndex: "status",
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


const dataproject = [
    {
        key: "1",
        id: "P001",
        order: "O001",
        name: (
            <Avatar.Group>
                <Avatar className="shape-avatar" src={ava1} size={25} alt="" />
                <div className="avatar-info">
                    <Title level={5}>Disinfectant</Title>
                </div>
            </Avatar.Group>
        ),
        price: "TSh 10,000",
        quantity: "5",
        status: (
            <Progress percent={50} size="small" />
        ),
    },
    {
        key: "2",
        id: "P002",
        order: "O002",
        name: (
            <Avatar.Group>
                <Avatar className="shape-avatar" src={ava2} size={25} alt="" />
                <div className="avatar-info">
                    <Title level={5}>Dishwashing</Title>
                </div>
            </Avatar.Group>
        ),
        price: "TSh 8,500",
        quantity: "10",
        status: (
            <Progress percent={30} size="small" />
        ),
    },
    {
        key: "3",
        id: "P003",
        order: "O003",
        name: (
            <Avatar.Group>
                <Avatar className="shape-avatar" src={ava3} size={25} alt="" />
                <div className="avatar-info">
                    <Title level={5}>Handwash</Title>
                </div>
            </Avatar.Group>
        ),
        price: "TSh 5,000",
        quantity: "8",
        status: (
            <Progress percent={80} size="small" />
        ),
    },
    {
        key: "4",
        id: "P004",
        order: "O004",
        name: (
            <Avatar.Group>
                <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
                <div className="avatar-info">
                    <Title level={5}>Multipurpose Cleaner</Title>
                </div>
            </Avatar.Group>
        ),
        price: "TSh 12,000",
        quantity: "3",
        status: (
            <Progress percent={70} size="small" />
        ),
    },
    {
        key: "5",
        id: "P005",
        order: "O005",
        name: (
            <Avatar.Group>
                <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
                <div className="avatar-info">
                    <Title level={5}>Tiles Cleaner</Title>
                </div>
            </Avatar.Group>
        ),
        price: "TSh 15,000",
        quantity: "6",
        status: (
            <Progress percent={40} size="small" />
        ),
    },
    {
        key: "6",
        id: "P006",
        order: "O006",
        name: (
            <Avatar.Group>
                <Avatar className="shape-avatar" src={ava6} size={25} alt="" />
                <div className="avatar-info">
                    <Title level={5}>Tiles Cleaner (1lit)</Title>
                </div>
            </Avatar.Group>
        ),
        price: "TSh 20,000",
        quantity: "2",
        status: (
            <Progress percent={60} size="small" />
        ),
    },
    // Add more products as needed
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




function SalesList() {
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);

    const [open, setOpen] = useState(false);

    const [form] = Form.useForm();
    const [cat , addToCat] = useState([])
    const [productName, setProductName] = useState(''); // Product name input
    const [quantity, setQuantity] = useState(''); // Quantity input
    const [prod, setProd] = useState([])
    const [openCartEdit , setCartEdit]  = useState(false)

    const handleDeleteCart = (key) => {
        // Remove the item from the cart using the key (or product ID)
        const updatedCart = cat.filter(item => item.id !== key);
        addToCat(updatedCart);
    };



    const generateRandomId = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        
        // Generate a random 6-character string (2 letters/digits + 4 digits/letters)
        let randomId = '';
        for (let i = 0; i < 6; i++) {
            randomId += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    
        // Shuffle the generated string to ensure random order
        randomId = randomId.split('').sort(() => Math.random() - 0.5).join('');
    
        return randomId;
    };

    const fetchOneProduct = async (productName) => {
        try {
            const response = await apiClient.get(`${process.env.REACT_APP_API_BASE_URL}/products/${productName}`);
            const productData = response.data.data;
            setProd(productData)
        }catch{
            console.log("failed to fetch product")
        }
    }

    useEffect(()=> {
        fetchOneProduct(productName);
    } , [productName])

    const handleCat = () => {
        if (!productName || !quantity) {
            message.warning("Please enter both product name and quantity!")
            return;
        }
        console.log(productName , quantity)

        const productId = generateRandomId();

        const newItem = { 
            id: productId,
            name: prod.name, 
            quantity: quantity ,
            sold_as:prod.sold_as, 
            price: prod.price ,
            tax: prod.tax

        };
        addToCat([...cat, newItem]);
    
        // Clear inputs after adding to cart
        setProductName('');
        setQuantity('');
    };

    
    const dataSource = cat.map((item, index) => ({
        key: index,
        id: item.id,
        product: item.name,
        quantity: item.quantity,
        as: item.sold_as,
        price: item.price,
        // amount: ((Number(item.price) + Number(item.tax)) * item.quantity).toFixed(2),
        amount: (
            (parseFloat(item.price.replace('TSh ', '').replace(',', '')) + parseFloat(item.tax)) * item.quantity
        ).toFixed(2),
        tax: item.tax


    }));


    
    
    

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Sold As',
            dataIndex: 'as',
            key: 'as',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Tax',
            dataIndex: 'tax',
            key: 'tax',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button
                        type="text"
                        icon={<EyeOutlined style={{ color: 'orange' }} />}
                        onClick={() => handleEditCart(record.quantity)}
                        style={{ padding: 2, width: 'auto' }}
                    />
                    <Button
                        type="text"
                        icon={<DeleteOutlined style={{ color: 'red' }} />}
                        onClick={() => handleDeleteCart(record.id)}
                        style={{ padding: 0, width: 'auto' }}
                    />
                </>
            ),
        },
    ];
    
    const handleEditCart = (key) => {
        // Find the item based on the key
        const itemToEdit = cat.find(item => item.id === key);
        if (itemToEdit) {
            setQuantity(itemToEdit.quantity); // Set the quantity in the modal form
            setCartEdit(true); // Open the modal
        }
    };
    
    const handleSaveEdit = (key) => {
        // Update the cart with the new quantity for the specific item
        const updatedCart = cat.map(item => 
            item.id === key ? { ...item, quantity: quantity } : item
        );
        addToCat(updatedCart); // Update the cart state
        setCartEdit(false); // Close the modal
    };
    

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>

                        <Modal 
                            title="Edit Quantity"
                            centered
                            open={openCartEdit}
                            onCancel={() => setCartEdit(false)}
                            footer= {
                                <>
                                    
                                    <Button type="primary" onClick={handleSaveEdit}>Save</Button>
                                  
                                </>
                            }
                        >
                            <Form 
                            layout="vertical"
                            autoComplete="off">

                                <Form.Item >
                                    <InputNumber 
                                        style={{width: "100%"}} 
                                        value={quantity}
                                        onChange={setQuantity}
                                    />
                                </Form.Item>

                            </Form>
                        </Modal>


                        <Modal
                            title="Add New Sales"
                            centered
                            open={open}
                            footer={
                                <>
                                <Button 
                                    type="danger"
                                    onClick={() => setOpen(false)}
                                
                                >Cancel</Button>
                                <Button 
                                    type="primary"
                                    // onClick={() => sendData()}
                                
                                >Send data</Button>
                                </>
                            }

                            onOk={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                            width={1000}
                        >
                            <Form

                                layout="vertical"

                                autoComplete="off"
                            >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="name"
                                            label="Sales Date"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the date for the product purchase',
                                                },
                                            ]}
                                        >
                                            <DatePicker
                                             style={{ width: '100%'  , padding: "8px" , borderRadius: "5px" }}/>
                                        </Form.Item>
                                    </Col>

                                   
                                    <Col span={12}>
                                        <Form.Item
                                            name="product"
                                            label="Product"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please Select the product name',
                                                },
                                            ]}
                                        >
                                            <ProductSelect onChange={(value) => setProductName(value) } style={{ width: '100%'  , padding: "8px" , borderRadius: "5px" }}/>
                                        </Form.Item>
                                    </Col>
                                </Row>


                                <Row gutter={16}>
                                    <Col span={23}>
                                    <Form.Item
                                        name="quantity"
                                        label="Quantity"
                                        rules={[
                                            { required: true, message: 'Please enter a quantity' },
                                            { type: 'number', min: 1, message: 'Quantity must be a positive number' },
                                        ]}
                                    >
                                        <InputNumber
                                        onChange={(value) => setQuantity(value)} placeholder="Quantity" style={{ width: '100%' }} />
                                    </Form.Item>


                                    </Col>
                                    <Col span={1} style={{display: "flex" , height: "100% !important" , alignItems: "center"}}>

                                    <Button 
                                        style={{ backgroundColor: '#0E1573', borderColor: '#0E1573', color: '#fff' }} 
                                        type="primary"
                                        onClick={() => handleCat()}
                                        
                                    >+</Button>
                                    </Col>
                                </Row>



                                <Row span={24}>
                                    <Col span={24}>
                                        <Table dataSource={dataSource} columns={columns} />
                                        {/* <h4 >Total Amount: ${calculateTotalAmount().toFixed(2)}</h4> */}

                                    </Col>
                                </Row>
                            </Form>
                        </Modal>



                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Sales List"
                            extra={
                                <>
                                    <Radio.Group onChange={onChange} defaultValue="all">

                                        <Button style={{ backgroundColor: '#0E1573', borderColor: '#0E1573', color: '#fff' }} type="primary" onClick={() => setOpen(true)}>
                                            Add Sales
                                        </Button>
                                    </Radio.Group>
                                </>
                            }
                        >   
                            <div className="table-responsive">
                                <Table
                                    columns={project}
                                    dataSource={dataproject}
                                    pagination={true}
                                    className="ant-border-space"
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div >
        </>
    );
}

export default SalesList;
