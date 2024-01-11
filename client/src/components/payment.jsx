import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import axios from "axios";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js/dist/react-stripe";
import { loadStripe } from "@stripe/stripe-js";

import { GET_ME } from "../utils/queries";

const PUBLIC_KEY =
  "pk_test_51OVg6UJiSz0z5LGkkgL7TCPW4kcuNoxVY4GMfM5m1dugVUGdrRUsgrzfIecf2HMhe0u1WrTVC0cL3yAwfyl4o0yJ00ldmksGIn";

const stripePromise = loadStripe(PUBLIC_KEY);

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/payment", {
        amount: props.amount,
      });

      if (response.data.success === true) {
        props.onPaymentSuccess();
      } else {
        setPaymentError("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error making payment request:", error);
      setPaymentError(
        "An error occurred while processing your payment. Please try again later."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {paymentError && <p style={{ color: "red" }}>{paymentError}</p>}
    </form>
  );
};

const PaymentPage = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  const [success, setSuccess] = useState(false);
  const [options, setOptions] = useState(null);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const total = params.get("amount");

  useEffect(() => {
    if (total) {
      const amount = parseFloat(total);
      console.log(amount);

      setOptions({
        mode: "payment",
        amount: amount,
        currency: "usd",
      });
    }
  }, [total]);

  const handlePaymentSuccess = () => {
    setSuccess(true);
  };

  return (
    <div className="donations">
    <Elements stripe={stripePromise} options={options}>
      {!success ? (
        <CheckoutForm amount={options?.amount} onPaymentSuccess={handlePaymentSuccess} />
      ) : (
        <div>
          <h2>Payment Successful!</h2>
          <Button href="./donate">Return to Donations</Button>
        </div>
      )}
    </Elements>
    </div>
  );
};

export default PaymentPage;
