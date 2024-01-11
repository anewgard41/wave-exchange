import React, { useState, useEffect } from "react";
import { Layout, Input, Space, Tooltip, Button, Flex } from "antd";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js/dist/react-stripe";
import { loadStripe } from "@stripe/stripe-js";
import {
  InfoCircleOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

import { GET_ME } from "../utils/queries";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      color: "#ffffff",
      fontFamily: "Arial, Helvetica, sans-serif",
      fontSize: "20px",
    },
  },
};

const { Content } = Layout;

// Styling for the layout
const layoutStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#252422",
};

const PUBLIC_KEY =
  "pk_test_51OVg6UJiSz0z5LGkkgL7TCPW4kcuNoxVY4GMfM5m1dugVUGdrRUsgrzfIecf2HMhe0u1WrTVC0cL3yAwfyl4o0yJ00ldmksGIn";

const stripePromise = loadStripe(PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
    </form>
  );
};

const PaymentPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const total = params.get("amount");

  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  const [success, setSuccess] = useState(false);
  //    //options={options}
  //    //above line should be pasted as a prop in Elements, line 59, but you need the actual secret key
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (total) {
      const amountInCents = Math.round(parseFloat(total));

      setOptions({
        mode: "payment",
        amount: amountInCents,
        currency: "usd",
      });
    }
  }, [total]);
  return (
    <Elements stripe={stripePromise} options={options}>
      {options ? (
        !success ? (
          <CheckoutForm />
        ) : (
          <div>
            <h2>Payment Successful!</h2>
            <Button href="./donate">Return to Donations</Button>
          </div>
        )
      ) : (
        <h1>Loading...</h1>
      )}
    </Elements>
  );
};

export default PaymentPage;
