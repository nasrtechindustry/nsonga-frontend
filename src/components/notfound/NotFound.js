import React from 'react';
import { Button, Typography, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { FrownOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

/**
 * 
 * @returns not found page
 */
const NotFound = () => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '0 20px' }}>
      <Col style={{ textAlign: 'center' }}>
        <FrownOutlined style={{ fontSize: '64px', color: '#faad14' }} />
        <Title level={2} style={{ marginTop: '20px', color: '#595959' }}>Oops! Page Not Found</Title>
        <Text type="secondary" style={{ fontSize: '16px' }}>
          It looks like the page you're looking for doesn’t exist or has been moved.
        </Text>
        <div style={{ marginTop: '30px' }}>
          <Link to="/dashboard">
            <Button type="primary" size="large">
              Go Back to Dashboard
            </Button>
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default NotFound;
