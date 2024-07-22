// Cart.js

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseCartItemQty, removeItemFromCart } from "../../slices/cartSlice";
import {  useNavigate } from "react-router-dom";



export default function Cart() {

  const { items } = useSelector(state => state.cartState);
  const dispatch= useDispatch()
  const navigate = useNavigate();
 
  const increaseQty= (item)=>{
    const count= item.quantity;
    if(item.stock==0 || count> item.stock) return
    dispatch(increaseCartItemQty(item.product)) 
  }
  const checkOutHandler=()=>{
      navigate("/login?redirect=shipping")
  }

  return (
    <div className="cart-container">
      <div className="cart-wrapper">
        <h3>{items.length}</h3>
        {items.map((item) => (
          <>
            <div className="cart-header">
              <h1>{item.name}</h1>
            </div>
            <h3>{item.price}</h3>
            <div className="cart-item">
              <p>{item.description}</p>
              <img />
              <div>
                <button className="quantity-btn">-</button>
                <input type="number" defaultValue="1" />
                <button
                  className="quantity-btn"
                  onClick={() => increaseQty(item)}
                >
                  +
                </button>
                <button
                  className="delete-btn"
                  onClick={() => dispatch(removeItemFromCart(item.product))}
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        ))}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div>
            <h3>
              Subtotal: {items.reduce((acc, item) => acc + item.quantity, 0)}
            </h3>
            <h3>
              Total: ${" "}
              {items.reduce((acc, item) => acc + item.quantity * item.price, 0)}
            </h3>
            <button className="checkout-btn" onClick={checkOutHandler}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
