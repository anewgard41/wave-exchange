import React, { useState, useEffect } from "react";
import { Layout, Input, Space, Tooltip, Button, Flex } from "antd";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Elements, PaymentElement } from "@stripe/react-stripe-js/dist/react-stripe";
import { loadStripe } from "@stripe/stripe-js";
import {
  InfoCircleOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

import { GET_ME } from "../utils/queries";

const { Content } = Layout;

// Styling for the layout
const layoutStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#252422",
};

const PUBLIC_KEY = "pk_test_TYooMQauvdEDq54NiTphI7jx";

const stripePromise = loadStripe(PUBLIC_KEY);

const PaymentPage = () => {
  const [user, setUser] = React.useState(null);
  const [amount, setAmount] = React.useState(0);
  const { search } = useLocation();
  // const options = {
  //   // error will be caused by below line, needs and actual secret key
  //   clientSecret: '{{CLIENT_SECRET}}',
  // };

  // options={options}
  // above line should be pasted as a prop in Elements, line 59, but you need the actual secret key

  useEffect(() => {
    const params = new URLSearchParams(search);
    const total = params.get("amount");
    if (total) {
      setAmount(total);
    }
  });

  return (
    <Layout style={layoutStyle}>
      {/* Main content area */}
      <Content style={layoutStyle}>
        {/* "Login" text */}
        <p style={{ color: "#FFFCF2", fontSize: "36px", marginBottom: "10px" }}>
          Payment Information
        </p>
        <Elements stripe={stripePromise}>
          {/* <form>
            <PaymentElement />
            <button>Submit</button>
          </form> */}
        </Elements>
      </Content>
    </Layout>
  );
};

export default PaymentPage;
