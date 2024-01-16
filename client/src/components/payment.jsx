import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";

// stripe key
const PUBLIC_KEY =
  "pk_test_51OVg6UJiSz0z5LGkkgL7TCPW4kcuNoxVY4GMfM5m1dugVUGdrRUsgrzfIecf2HMhe0u1WrTVC0cL3yAwfyl4o0yJ00ldmksGIn";
const stripePromise = loadStripe(PUBLIC_KEY);

// ChecoutForm component
const PaymentPage = (props) => {

  const [clientSecret, setClientSecret] = useState("");

  // const { data } = useQuery(GET_ME);
  // const userData = data?.me || {};
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const total = params.get("amount");
  // userData.donations = total;
  // console.log(userData.donations);
  
  useEffect(() => {
    // Create a Checkout Session as soon as the page loads
     async function fetchClientSecret() {
   const params = new URLSearchParams(search);
   const total = params.get("amount");
   const amount = parseFloat(total);
   try {
     const response = await axios.post("/api/payment", {amount}, {
       headers: {
         "Content-Type": "application/json",
       },
     });
     setClientSecret(response.data.clientSecret);
   } catch (error) {
     console.error(error);
   }
 }

 fetchClientSecret();
}, []);

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};

export default PaymentPage;

// code that could be used to make a "Thank you for donation" page. Would need to be added to the router in main.jsx/be a separate component

// const Return = () => {
//   const [status, setStatus] = useState(null);
//   const [username, setUsername] = useState(null);

//   useEffect(() => {
   
//     async function fetchSessionStatus() {
//       const { queryString } = useLocation();
//       const params = new URLSearchParams(queryString);
//       const sessionId = params.get("session_id");

//       const res = await fetch(`/session-status?session_id=${sessionId}`);
//       const data = await res.json();

//       setStatus(data.status);
//       setUsername(data.username);
//     }

//     fetchSessionStatus();
//   }, []);

//   if (status === "open") {
//     return <div>Processing...</div>;
//   }

//   if (status === "complete") {
//     return (
//       <div>
//         <h2>Payment Successful! Thank you {username} </h2>
//         <Button href="./donate">Return to Donations</Button>
//       </div>
//     );
//   }
// };

