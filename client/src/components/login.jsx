import React, { useState } from "react";
import { Layout, Input, Space, Tooltip, Button, Flex } from "antd";
import {
  InfoCircleOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import Header from "./Header.jsx";

const { Content } = Layout;

// Styling for the layout
const layoutStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#252422',
};

const LoginPage = () => {
  // State for managing the visibility of the password
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  return (
    <div className="body-container">
      <Header />
      <Layout style={layoutStyle}>
        {/* Main content area */}
        <Content style={layoutStyle}>
          {/* "Login" text */}
          <p
            style={{ color: "#FFFCF2", fontSize: "36px", marginBottom: "10px" }}
          >
            Login
          </p>

          {/* Input components for username and password */}
          <Space
            direction="vertical"
            style={{ width: "100%", maxWidth: "300px" }}
          >
            {/* Username input */}
            <Input
              placeholder="Please enter username"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                // Tooltip for extra information about the username input
                <Tooltip title="Username is case-sensitive">
                  <InfoCircleOutlined
                    style={{
                      color: "rgba(0, 0, 0, 0.45)",
                    }}
                  />
                </Tooltip>
              }
            />

          {/* Password input with eye icon */}
          <Input.Password
            placeholder="Please enter password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Space>
        <Flex gap="small" wrap="wrap" align='center' justify='center'>
            <Button type="primary" direction="vertical" loading={loadings[0]} onClick={() => enterLoading(0)} style={{ backgroundColor: '#CCC5B9', color: '#252422' }}>
              Login!
            </Button>
        </Flex>
      </Content>
    </Layout>
    </div>
  );
};

export default LoginPage;
