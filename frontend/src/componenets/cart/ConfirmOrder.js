import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { validateShipping } from "./Shipping";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckOutsteps";

export default function ConfirmOrder() {
   const {shippingInfo, items: cartItems} = useSelector(state=> state.cartState)
   const {user} =useSelector(state=> state.authState)
   const navigate = useNavigate()
   const itemsPrice = cartItems.reduce((acc,item)=> ( acc+ item.price * item.quantity),0)
   const shippingPrice = itemsPrice > 200 ? 0: 25;
   const taxPrice = Number( 0.05 * itemsPrice).toFixed(2)
      const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
 
       const processPayment =()=>{
        const data = {
          itemsPrice,shippingPrice,taxPrice,totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate("/paymenting");
       }
    useEffect(()=>{
        validateShipping(shippingInfo, navigate);
    },[])
  return (
    <Fragment>
      <div className="confirm-order-container">
        <CheckoutSteps shipping ConfirmOrder />
        <div className="confirm-order-header">
          <h2>Confirm Order</h2>
        </div>
        <div className="confirm-order-details">
          <h2>Product Name: {user.name}</h2>
          <h3> Contact No: {shippingInfo.phoneNo}</h3>
          <h2>
            Address: {shippingInfo.address}, {shippingInfo.city},{" "}
            {shippingInfo.postalCode},{shippingInfo.state},{" "}
            {shippingInfo.country}
          </h2>
        </div>
        <div className="cart-items-container">
          {cartItems.map((item) => (
            <div>
              <h2>{item.name}</h2>
              <div>{item.user}</div>
              <div>
                {item.quantity} * {item.price} ={" "}
                <b>
                  {item.quantity}* {item.price}
                </b>
              </div>
            </div>
          ))}
          <div className="cart-items-header">
            <h2>Your Cart Items</h2>
          </div>
          <p className="cart-item-description">Description</p>
        </div>
        <div>
          <button onClick={processPayment}>Proceed to Payment</button>
        </div>
      </div>
    </Fragment>
  );
}
