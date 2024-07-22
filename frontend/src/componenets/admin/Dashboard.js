import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./DashBoard.css";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../actions/productActions";
import { adminOrder } from "../../actions/orderActions";

export default function DashBoard() {
  const { products = [] } = useSelector((state) => state.data);
  const { adminOrders = [] } = useSelector((state) => state.orderState);
  // const { user = [] } = useSelector((state) => state.userState);

  const dispatch = useDispatch();
  let outOfStock = 0;
  if (products.length > 0) {
    products.forEach((product) => {
      if (product.stock === 0) {
        outOfStock = outOfStock + 1;
      }
    });
  }
   let totalAmount = 0;
  if (adminOrders.length > 0) {
    adminOrders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  }

  useEffect(() => {
    dispatch(getAdminProducts);
    dispatch(adminOrder);
  }, []);
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h2 className="dashboard-heading">dashboard</h2>
        <div className="total-amount">
          <h1>Total Amount</h1>
          <h2>${totalAmount} rs</h2>
        </div>
        <div className="stats">
          <div className="stat-card products">
            <h1>Products</h1>
            <h3>{products.length}</h3>
            <button>View Details</button>
          </div>

          <div className="stat-card orders">
            <h1>Orders</h1>
            <h3>{adminOrders.length}</h3>
            <button>View Details</button>
          </div>
          <div className="stat-card users">
            <h1>Users</h1>
            <h3>23</h3>
            <button>View Details</button>
          </div>
          <div className="stat-card out-of-stock">
            <h1>Out of Stock</h1>
            <h3>{outOfStock}</h3>
            <button>View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}
