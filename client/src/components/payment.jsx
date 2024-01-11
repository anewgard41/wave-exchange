import React, { useState, useEffect } from "react";
import { Layout, Input, Space, Tooltip, Button, Flex } from "antd";
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

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post("/payment", { amount: props.amount })
    
    if(response.success === true){
      setSuccess(true);

    };
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

  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  const [success, setSuccess] = useState(false);
  //    //options={options}
  //    //above line should be pasted as a prop in Elements, line 59, but you need the actual secret key
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
      // appearance: "night",
    });
  }
}, [total]);
  return (
    <Elements stripe={stripePromise} options={options}>
      
        {!success ? (
          <CheckoutForm amount={options?.amount} />
        ) : (
          <div>
            <h2>Payment Successful!</h2>
            <Button href="./donate">Return to Donations</Button>
          </div>
        )}
    </Elements>
  );
};

//   const [amount, setAmount] = React.useState(0);

//    //options={options}
//    //above line should be pasted as a prop in Elements, line 59, but you need the actual secret key

//   const { search } = useLocation();
//   useEffect(() => {

//     const params = new URLSearchParams(search);
//     const total = params.get("amount");
//     if (total) {
//       setAmount(total);
//     }
//   });

// const {loading, error, data} = useQuery(GET_ME);
// const [user, setUser] = React.useState(null);
// useEffect(()=>{
//   console.log(data);
// }), [data];

// const [success, setSuccess] = useState(false);

//   const handleSubmit = async(e)=>{
//     e.preventDefault();
//     console.log('handling Submission');
//     const {err, paymentMethod} = await stripe.createPaymentMethod({
//         type: "card",
//         card: CardElement
//     });
//     console.log(paymentMethod);

//     if(!err){
//         try{
//             const {id} = paymentMethod;
//             const response = await axios.post("/payment", {
//                 amount,
//                 id
//             });
//             if(response.data.success){
//                 //Set up donation post
//                 setSuccess(true);
//             }
//         } catch(error){
//             console.log("Error", error);
//         }
//     } else {
//         console.log("Error", err);
//     }
//   }
//   return (
//     <Layout style={layoutStyle}>
//       {/* Main content area */}
//       <Content style={layoutStyle}>
//         {/* "Login" text */}
//         <p style={{ color: "#FFFCF2", fontSize: "36px", marginBottom: "10px" }}>
//           Payment Information
//         </p>
//         <Elements stripe={stripePromise}>
//           {/* {
//            !success
//           ? <form onSubmit={handleSubmit}>
//                 <fieldset className="FormGroup">
//                     <div className="FormRow">
//                         <CardElement options={CARD_OPTIONS} />
//                     </div>
//                 </fieldset>
//                 <input type="submit" value="Submit"/>
//             </form>
//           : <div>
//             <h2>Payment Successful!</h2>
//             <Button href="./donate">Return to Donations</Button>
//           </div>
//           } */}
//         </Elements>
//       </Content>
//     </Layout>
//   );
// };

export default PaymentPage;
