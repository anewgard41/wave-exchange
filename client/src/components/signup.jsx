import React, { useState } from "react";
import { Layout, Input, Space, Tooltip, Button, Flex } from "antd";
import {
  InfoCircleOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations.js";

import Auth from "../utils/auth.js";

const { Content } = Layout;

// Styling for the layout
const layoutStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#252422",
};

// SignupPage component
const SignupPage = () => {
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

  const [userFormData, setUserFormData] = useState({
    username: "",
    password: "",
  });

  const [addUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      console.log(data.addUser.token);
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: "",
      password: "",
    });
  };

  return (
    <>
      <Layout style={layoutStyle}>
        {/* Main content area */}
        <Content style={layoutStyle}>
          {/* "Sign Up Today" text */}
          <p
            style={{ color: "#FFFCF2", fontSize: "36px", marginBottom: "10px" }}
          >
            Sign Up Today
          </p>
          <form onSubmit={handleFormSubmit}>
            {/* Input components for username and password */}
            <Space
              direction="vertical"
              style={{ width: "100%", maxWidth: "300px" }}
            >
              {/* Username input */}
              <Input
                type="text"
                name="username"
                placeholder="Please enter username"
                onChange={handleInputChange}
                value={userFormData.username}
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
                type="password"
                placeholder="Please enter password"
                name="password"
                onChange={handleInputChange}
                value={userFormData.password}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Space>
            <Flex gap="small" wrap="wrap" align="center" justify="center">
              <Button
                type="primary"
                direction="vertical"
                disabled={!(userFormData.username && userFormData.password)}
                loading={loadings[0]}
                onClick={() => enterLoading(0)}
                htmlType="submit"
                style={{ backgroundColor: "#EB5E28", color: "#252422" }}
              >
                Signup!
              </Button>
            </Flex>
          </form>
        </Content>
      </Layout>
    </>
  );
};

export default SignupPage;
