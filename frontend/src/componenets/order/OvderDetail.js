import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { orderDetail as orderDetailAction } from "../../actions/orderActions";

export default function OrderDetail() {
  const { orderDetails, loading } = useSelector((state) => state.orderState);
  const {
    shippingInfo = {},
    user = {},
    orderStatus = "processing",
    orderItems = [],
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetails;

  const IsPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(orderDetailAction(id));
  }, [id]);
  return (
    <Fragment>
      <div className="order-detail">
        <div>
          <h2>Order ID: {orderDetails._id}</h2>
          <h3>Shipping Info:</h3>
          <div className="shipping-info">
            <h2>
              <span>Name:</span> {user.name}
            </h2>
            <h2>
              <span>Phone no:</span> {shippingInfo.phoneNo}
            </h2>
            <h2>
              <span>Address:</span> {shippingInfo.address}, {shippingInfo.city},{" "}
              {shippingInfo.state}
            </h2>
            <h2>
              <span>Amount:</span> ${totalPrice}
            </h2>
          </div>
          <div className="order-summary">
            <div>
              <h1 className={IsPaid ? "green" : "red"}>
                Payment: <b>{IsPaid ? "Paid" : "Not Paid"}</b>
              </h1>
              <h2
                className={`order-status ${
                  orderStatus.includes("Delivered")
                    ? "status-delivered"
                    : "status-not-delivered"
                }`}
              >
                {orderStatus}
              </h2>
              <div>
                {orderItems.map((item) => (
                  <div key={item._id}>
                    <div>{item.name}</div>
                    <div>{item.price}</div>
                    <div>{item.quantity}</div>
                    <div>{item.user}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
