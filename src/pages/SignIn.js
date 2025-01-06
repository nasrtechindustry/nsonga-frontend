import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { useAuth } from "../components/auth/auth";
import { Layout, Menu, Button, Row, Col, Typography, Form, Input, Switch, notification, message } from "antd";
import signinbg from "../assets/images/nsonga-login-1.avif";
import { DribbbleOutlined, TwitterOutlined, InstagramOutlined, GithubOutlined } from "@ant-design/icons";
import apiClient from '../axios-client';
import Password from "antd/lib/input/Password";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

/**
 * Sign in Component as a Functional Component
 */
const SignIn = (props) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values) => {
    setIsLoading(true);
  
    const payload = {
      email: values.email,
      password: values.password,
      remember: values.remember,
    };

    apiClient.post('/login', payload)
      .then(response => {
        if (response.data.success) {
          setSuccess(response.data.message);
          setError(null);
          setIsLoading(false);

          localStorage.setItem('nsonga-auth-token', response.data.data.user.token);
          localStorage.setItem('showLoginToast', 'true');
          props.setAuth(true);  // Call setAuth to update App's isAuth state

        } else {
          const errorDics = response.data.data[0];
          for (let i in errorDics) {
            let error = errorDics[i];
            message.error(error);
          }

          setSuccess(null);
          setError(response.data.data[0]);
          setIsLoading(false);
          localStorage.removeItem('nsonga-auth-token');
        }
      });
  };

  // Handle form submission failure
  const onFinishFailed = () => {
    notification.error({
      message: 'Fields are mandatory',
      description: 'All Fields are required',
      placement: 'topRight',
    });
  };

  // Menu items array for the Footer Menu
  const menuItems = [
    { key: "1", label: "Company" },
    { key: "2", label: "About Us" },
    { key: "3", label: "Teams" },
    { key: "4", label: "Products" },
    { key: "5", label: "Blogs" },
    { key: "6", label: "Pricing" },
  ];

  // Social Media Menu items array
  const socialMenuItems = [
    { key: "1", icon: <DribbbleOutlined /> },
    { key: "2", icon: <TwitterOutlined /> },
    { key: "3", icon: <InstagramOutlined /> },
    { key: "4", icon: (
      <svg
        width="18"
        height="18"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"></path>
      </svg>
    )},
    { key: "5", icon: <GithubOutlined /> },
  ];

  return (
    <Layout className="layout-default layout-signin">
      {/* {isLoading && <Loader />} */}
      <Header>
        <div className="header-col header-brand">
          <h5>Nsonga Sales | Inventory</h5>
        </div>
      </Header>
      <Content className="signin">
        <Row gutter={[24, 0]} justify="space-around">
          <Col xs={{ span: 24 }} lg={{ span: 6, offset: 2 }} md={{ span: 12 }}>
            <Title className="mb-15">Sign In</Title>
            <Title className="font-regular text-muted" level={5}>
              Enter your email and password to sign in
            </Title>
            {success && 
              <div style={{
                  color: 'green',
                  backgroundColor: '#e6ffe6', 
                  border: '1px solid green',
                  padding: '10px',
                  borderRadius: '5px',
                  margin: '10px 0'
              }}>
                {success}
              </div>
            }

            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
              >
                <Switch defaultChecked />
                Remember me
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={isLoading}>
                  SIGN IN
                </Button>
              </Form.Item>
              <p className="font-semibold text-muted">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-dark font-bold">Sign Up</Link>
              </p>
            </Form>
          </Col>
          <Col className="sign-img" style={{ padding: 12 }} xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
            <img src={signinbg} alt="Sign In Background" />
          </Col>
        </Row>
      </Content>
      <Footer>
        <Menu mode="horizontal" items={menuItems} />
        <Menu mode="horizontal" className="menu-nav-social" items={socialMenuItems} />
        <p className="copyright">
          Copyright © {new Date().getFullYear()} Nsonga&trade; Sales &amp; Inventory 
        </p>
      </Footer>
    </Layout>
  );
};

export default SignIn;
