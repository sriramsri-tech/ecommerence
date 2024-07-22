import React, { useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/productActions";
import { toast } from "react-toastify";
import { clearProductUpdated } from "../../slices/ProductSlice";
import { orderDetail, updateOrder } from "../../actions/orderActions";
import { clearOrderUpdated } from "../../slices/orderSlice";

export default function UpdateOrder() {
  const { loading, isOrderUpdated, error, orderDetails } = useSelector(
    (state) => state.orderState
  );
  const {
    shippingInfo = {},
    user = {},
    orderItems = [],
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetails;
  const IsPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;
  const [orderStatus, setOrderStatus] = useState("Processing");
  const { id: orderId } = useParams();

  //const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const orderData = {};
    orderData.orderStatus = orderStatus;
    dispatch(updateOrder(orderId, orderData));
  };

  useEffect(() => {
    if (isOrderUpdated) {
      toast("Order updated successfully", {
        type: "success",
        position: "bottom-center",
        onOpen: () => dispatch(clearOrderUpdated()),
      });
      return;
    }
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
      return;
    }
    dispatch(orderDetail(orderId));
  }, [isOrderUpdated, error, dispatch]);

  useEffect(() => {
    if (orderDetails._id) {
      setOrderStatus(orderDetails.orderStatus);
    }
  }, [orderDetails]);
  return (
    <div className="newproduct">
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
                  <div>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>{item.name}</div>
                  <div>{item.price}</div>
                  <div>{item.quantity}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h4>Order Status</h4>
          <div>
            <select
              onChange={(e) => setOrderStatus(e.target.value)}
              value={orderStatus}
              name="status"
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <button disabled={loading} onClick={submitHandler}>
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
