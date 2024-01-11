import "../css/SignupLogin.css";
import React, { useState } from "react";
import { Layout, Input, Space, Tooltip, Button, Flex } from "antd";
import {
  InfoCircleOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const { Content } = Layout;

// Styling for the layout
const layoutStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#252422",
};

const LoginPage = () => {
  const [loginError, setLoginError] = useState('');
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

  // State for storing user input data
  const [userFormData, setUserFormData] = useState({
    username: "",
    password: "",
  });

  // Apollo mutation for login
  const [loginUser] = useMutation(LOGIN_USER);

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Check if the form has everything
    const form = event.currentTarget;

    try {
      // Attempt to log in the user using the login mutation
      const { data } = await loginUser({
        variables: { ...userFormData },
      });
      console.log(data);

      // If successful, log the user in
      Auth.login(data.login.token);
      console.log(data.login.token);
      setLoginError('');
    } catch (err) {
      setLoginError('Could not log you in. Please double check your username and password.');
      console.error(err);
    }

    // Reset the user input data
    setUserFormData({
      username: "",
      password: "",
    });
  };

  // Render the login page component
  return (
    <div className="info-container">
      {/* Main content area */}
      {/* "Login" text */}
      <h2>
        Login
      </h2>
      <form className="info-form" onSubmit={handleFormSubmit}>
        {/* Input components for username and password */}
        <Space
          direction="vertical"
          style={{ width: "100%", maxWidth: "300px" }}
        >
          {/* Username input */}
          <Input
            type="text"
            placeholder="Please enter username"
            name="username"
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
        <div className="login-error" style={{ color: "red", fontSize: "18px", marginTop: "10px" }}>
          {loginError && <p className="login-error">{loginError}</p>}
        </div>
        <Flex gap="small" wrap="wrap" align="center" justify="center">
          <Button
            disabled={!(userFormData.username && userFormData.password)}
            type="primary"
            direction="vertical"
            loading={loadings[0]}
            onClick={() => enterLoading(0)}
            htmlType="submit"
            style={{ backgroundColor: "#CCC5B9", color: "#252422" }}
          >
            Login!
          </Button>
        </Flex>
      </form>

    </div>
  );
};

export default LoginPage;
