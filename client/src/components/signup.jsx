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
import { ADD_USER } from "../utils/mutations.js";

import Auth from "../utils/auth.js";

const { Content } = Layout;

// SignupPage component
const SignupPage = () => {
  const [loginError, setLoginError] = useState('');
  // State for managing the visibility of the password
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  // State for managing button loading state
  const [loadings, setLoadings] = useState([]);
  
  // Function to simulate loading state for the button
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

  // Apollo mutation for adding a user
  const [addUser] = useMutation(ADD_USER);

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      // Attempt to add a new user using the addUser mutation
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      // Log the token and user data, then login the user
      console.log(data.addUser.token);
      console.log(data);
      Auth.login(data.addUser.token);
      setLoginError('');
    } catch (err) {
      setLoginError('Username taken. Please choose a different one.');
      console.error(err);
    }

    // Reset the user input data
    setUserFormData({
      username: "",
      password: "",
    });
  };

  // Render the SignupPage component
  return (
    <div className="info-container">
      {/* Main content area */}
      {/* "Sign Up Today" text */}
      <h2>
        Sign Up Today
      </h2>

      {/* Signup form */}
      <form className="info-form" onSubmit={handleFormSubmit}>
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
        <div className="login-error" style={{ color: "red", fontSize: "18px", marginTop: "10px" }}>
          {loginError && <p className="login-error">{loginError}</p>}
        </div>
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
    </div>
  );
};

export default SignupPage;
