import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateShipping } from "./Shipping";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { orderCompleted } from "../../slices/cartSlice";
import { createOrder } from "../../actions/orderActions";

export default function Paymenting() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get the data value of total price,tax price
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, shippingInfo } = useSelector(
    (state) => state.cartState
  );
  const { error: orderError } = useSelector((state) => state.orderState);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 3),
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        postal_code: shippingInfo.postalCode,
        country: shippingInfo.country,
        state: shippingInfo.state,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNo,
    },
  };
  const order = {
    orderItems: cartItems, // product details
    shippingInfo,   //place country
    itemPrice: orderInfo.itemPrice,
    shippingPrice: orderInfo.shippingPrice,
    totalPrice: orderInfo.totalPrice,
  };

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
    if (orderError) {
      toast(orderError, {
        position: "bottom-center",
        type: "error",
      });
      return;
    }
  }, [shippingInfo, navigate, orderError]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const payButton = document.querySelector("#pay_btn");
    payButton.disabled = true;

    try {
      const { data } = await axios.post("api/v1/payment/process", paymentData);
      const clientSecret = data.client_secret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });
        //error
      if (result.error) {
        toast.error(result.error.message, {
          position: "bottom-center",
        });
        payButton.disabled = false;
      } else {
        if ((await result).paymentIntent.status === "succeeded") {  //success
          toast.success("Payment Success", {
            position: "bottom-center",
          });
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(orderCompleted());
          dispatch(createOrder(order));
          navigate("/order/success");
        } else {
          toast.warn("Please Try again", {
            position: "bottom-center",
          });
          payButton.disabled = false;
        }
      }
    } catch (error) {
      toast.error("Payment failed, please try again.", {
        position: "bottom-center",
      });
      console.error("Payment error:", error);
      payButton.disabled = false;
    }
  };

  return (
    <div className="payment-container">
      <form onSubmit={submitHandler} className="payment-form">
        <label>Card Number</label>
        <CardNumberElement className="stripe-input" />

        <label>Card Expiry</label>
        <CardExpiryElement className="stripe-input" />

        <label>Card Cvc</label>
        <CardCvcElement className="stripe-input" />

        <button id="pay_btn" type="submit" className="payment-button">
          {orderInfo ? `Pay - $${orderInfo.totalPrice}` : "Pay"}
        </button>
      </form>
    </div>
  );
}
