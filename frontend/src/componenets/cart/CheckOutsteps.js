import React from "react";
import { Link } from "react-router-dom";
//import "./CheckoutSteps.css"; // Ensure this path matches the location of your CSS file

export default function CheckoutSteps({ shipping, confirmOrder, payment }) {
  return (
    <div className="checkout-steps-container">
      {shipping ? (
        <Link to="/shipping">
          <div className="checkout-step">
            <h3>Shipping Info</h3>
          </div>
        </Link>
      ) : (
        <Link to="/shipping">
          <div className="checkout-step">
            <h3>Shipping Info</h3>
          </div>
        </Link>
      )}
      {confirmOrder ? (
        <Link to="/shipping/order/confirm">
          <div className="checkout-step">
            <h3>Confirm Order</h3>
          </div>
        </Link>
      ) : (
        <Link to="/shipping/order/confirm">
          <div className="checkout-step">
            <h3>Confirm Order</h3>
          </div>
        </Link>
      )}
      {payment ? (
        <Link to="/payment">
          <div className="checkout-step">
            <h3>Payment</h3>
          </div>
        </Link>
      ) : (
        <Link to="/payment">
          <div className="checkout-step">
            <h3>Payment</h3>
          </div>
        </Link>
      )}
    </div>
  );
}
