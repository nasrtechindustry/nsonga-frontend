import { Row, Col, Button, Upload, Form, Input, message, Select} from "antd";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ToTopOutlined } from "@ant-design/icons";
import apiClient from "../../axios-client";
import { SoldAs } from "./SoldAsTab";
import CategorySelect from "./CategoryTab";
import AttribSelect from "./AttributesTab";
import Status from "./StatusTab";

import BrandSelect from "./BrandTab";
import { formToJSON } from "axios";

const { TextArea } = Input;
const {Option} = Select;

function EditProduct() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [fileList, setFileList] = useState([]); // Only one image
  const [btnLoading, setBtnLoading] = useState(false);



  // Fetch product data when the component is mounted
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/products/${id}`);
        const productData = response.data.data;
        // console.log(productData)
        setProduct(productData);

        // Set form fields
        form.setFieldsValue({
          name: productData.name,
          category_id: productData.category_id,
          brand_id: productData.brand_id,
          attribute_id: productData.attribute_id,
          sold_as: productData.sold_as,
          price: productData.price,
          tax: productData.tax,
          inventory: productData.inventory,
          description: productData.description,
          status: productData.available
        });

        // Set initial image file if available
        if (productData.image) {
          const initialFileList = [{
            uid: -1,
            name: productData.image.split('/').pop(),
            status: 'done',
            url: productData.image, // This is the full image URL from backend
          }];
          setFileList(initialFileList);
        }
      } catch (error) {
        message.error("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, form]);

  // Handle form submission
  const onFinish = async (values) => {

    const formData = new FormData();

    // Append other fields to FormData
    for (const key in values) {
      formData.append(key, values[key]);
    }

    // for (const key in values) {
    //   formData.append(key === 'status' ? 'available' : key, values[key]);
    // }


    // Append the image file if available
    if (fileList.length > 0 && fileList[0].originFileObj) {
      // console.log("Appending image:", fileList[0].originFileObj); // Debug log to check the image file
      formData.append('image', fileList[0].originFileObj);
    }

    // for debugging only
    // for (const [key, value] of formData.entries()) {
    //     console.log(key, value); // This will log each key and value in FormData
    // }


    try {
      setBtnLoading(true);
      // Send PUT request with FormData
      const response = await apiClient.put(`/products/${id}`, formData );


      if (response.data.success) {
        message.success("Product updated successfully.");
        history.push("/products");
      } else {
        message.error("Failed to update product.");
      }
    } catch (error) {
      message.error("An error occurred while updating the product.");
      console.error("Error details:", error);
    } finally {
      setBtnLoading(false);
    }
  };

  // Handle image changes (preview and setting the file)
  const handleImageChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      const imageUrl = URL.createObjectURL(newFileList[0].originFileObj);
      newFileList[0].url = imageUrl; // Set the generated object URL for preview
    }
    setFileList(newFileList.slice(0, 1)); // Ensure only 1 image
  };

  // Handle back button click
  const handleBack = () => {
    history.push("/products");
  };

  return (
    <div className="tabled editproduct">
      <h2>Edit Product</h2>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={product}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={6}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter the product name" }]} >
              <Input placeholder="Product Name" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="category_id" label="Category">
              <CategorySelect
                value={form.getFieldValue("category_id")}
                onChange={(value) => form.setFieldValue({ category_id: value })} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="brand_id" label="Brand">
              <BrandSelect
                value={form.getFieldValue("brand_id")}
                onChange={(value) => form.setFieldValue({brand_id: value}) } />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="attribute_id" label="Attribute">
              <AttribSelect
                value={form.getFieldValue("attribute_id")}
                onChange={(value) => form.setFieldValue({attribute_id: value})} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={6}>
            <Form.Item name="sold_as" label="Sold as">
              <SoldAs
                value={form.getFieldValue("sold_as")}
                onChange={(value) => form.setFieldValue({sold_as : value})} 
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please enter price for the product" }]}>
              <Input placeholder="eg. Tsh 2000" type="number" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="tax" label="Tax" rules={[{ required: true, message: "Please enter the tax" }]}>
              <Input placeholder="eg. 500" type="number" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="inventory" label="Inventory" rules={[{ required: true, message: "Please enter the product inventory" }]}>
              <Input placeholder="eg. 50" type="number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={6}>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select the product status" }]}
            >
              <Select placeholder="Select status">
                <Option value={1}>Available</Option>
                <Option value={0}>Unavailable</Option>
              </Select>
            </Form.Item>
          </Col>
      </Row>


        <Row gutter={16}>
          <Col span={24}>
            <div className="uploadfile pb-15 shadow-none">
              <Upload
                fileList={fileList}
                onChange={handleImageChange}
                beforeUpload={() => false} // Prevent automatic upload
                maxCount={1} // Restrict to one image only
              >
                <Button type="dashed" className="ant-full-box" icon={<ToTopOutlined />}>
                  Upload Image
                </Button>
              </Upload>
              <div style={{ marginTop: 16 }}>
                {fileList.length > 0 && fileList[0].url ? (
                  <div style={{ display: "inline-block", marginRight: 8 }}>
                    <img
                      src={fileList[0].url}
                      alt="preview"
                      style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 4 }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="description" label="Description">
              <TextArea
                rows={3}
                placeholder="Product short description"
                maxLength={500}
                onChange={(e) => form.setFieldValue({description: e.target.value})} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={btnLoading}
                disabled={btnLoading}
              >
                Save Changes
              </Button>

              <Button
                type="info"
                onClick={handleBack}
                style={
                  {marginLeft: "10px"}
                }
              >
                Back
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EditProduct;
