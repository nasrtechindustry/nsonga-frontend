import { Row, Col, Button, Upload, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ToTopOutlined } from "@ant-design/icons";
import apiClient from "../../axios-client";
import { SoldAs } from "./SoldAsTab";
import CategorySelect from "./CategoryTab";
import AttribSelect from "./AttributesTab";
import BrandSelect from "./BrandTab";

const { TextArea } = Input;

function EditProduct() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const history = useHistory();
  
  const [fileList, setFileList] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/products/${id}`);
        const productData = response.data.data;

        setProduct(productData);
        // Set form values including category_id, brand_id, attribute_id, sold_as
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
        });

        // Handle initial file list if needed
        if (productData.images) {
          const initialFileList = productData.images.map((image, index) => ({
            uid: index,
            name: image.name,
            status: 'done',
            url: image.url, // Use correct image URL here
          }));
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

  const onFinish = async (values) => {
    try {
      setBtnLoading(true);
      const response = await apiClient.put(`/products/${id}`, values);
      if (response.data.success) {
        message.success("Product updated successfully.");
        history.push("/products");
      } else {
        message.error("Failed to update product.");
      }
    } catch (error) {
      message.error("An error occurred while updating the product.");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleChangePicture = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <div className="tabled">
      <h2>Edit Product</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={product} // You can still keep this, but it's not necessary since we set fields directly
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={6}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter the product name" }]}
            >
              <Input placeholder="Product Name" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="category_id" label="Category">
              <CategorySelect
                value={form.getFieldValue("category_id")} // Set the value directly from the form
                onSelect={(value) => form.setFieldsValue({ category_id: value })}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="brand_id" label="Brand">
              <BrandSelect
                value={form.getFieldValue("brand_id")} // Set the value directly from the form
                onSelect={(value) => form.setFieldsValue({ brand_id: value })}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="attribute_id" label="Attribute">
              <AttribSelect
                value={form.getFieldValue("attribute_id")} // Set the value directly from the form
                onSelect={(value) => form.setFieldsValue({ attribute_id: value })}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={6}>
            <Form.Item name="sold_as" label="Sold as">
              <SoldAs
                value={form.getFieldValue("sold_as")} // Set the value directly from the form
                onSelect={(value) => form.setFieldsValue({ sold_as: value })}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please enter price for the product" }]}
            >
              <Input placeholder="eg. Tsh 2000" type="number" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="tax"
              label="Tax"
              rules={[{ required: true, message: "Please enter the tax" }]}
            >
              <Input placeholder="eg. 500" type="number" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="inventory"
              label="Inventory"
              rules={[{ required: true, message: "Please enter the product inventory" }]}
            >
              <Input placeholder="eg. 50" type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <div className="uploadfile pb-15 shadow-none">
              <Upload
                fileList={fileList}
                onChange={handleChangePicture}
                beforeUpload={() => false}
              >
                <Button type="dashed" className="ant-full-box" icon={<ToTopOutlined />}>
                  Upload Image
                </Button>
              </Upload>
              <div style={{ marginTop: 16 }}>
                {fileList.map((file) => (
                  <div key={file.uid} style={{ display: "inline-block", marginRight: 8 }}>
                    <img
                      src={file.url} // Use the correct URL for the preview
                      alt="preview"
                      style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 4 }}
                    />
                  </div>
                ))}
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
                onChange={(e) => form.setFieldsValue({ description: e.target.value })} // Updated to use form method
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ float: "right", marginTop: "20px" }}
                loading={btnLoading}
              >
                Save Product
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EditProduct;
