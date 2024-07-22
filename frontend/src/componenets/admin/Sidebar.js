import React from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <Link to="/admin/dashboard">
          <h2>DashBoard</h2>
        </Link>
      </div>
      <div className="sidebar-section">
        <button onClick={() => navigate("/admin/products")}>Products</button>
      </div>
      <div className="sidebar-section">
        <button onClick={() => navigate("/admin/products")}>All</button>
      </div>

      <div className="sidebar-section">
        <button onClick={() => navigate("/admin/products/create")}>
          Create
        </button>
      </div>

      <div className="sidebar-section">
        <button onClick={() => navigate("/admin/orders")}>Orders</button>
      </div>

      <div className="sidebar-section">
        <button onClick={() => navigate("/products/users")}>Users</button>
      </div>
      <div className="sidebar-section">
        <button onClick={() => navigate("/admin/reviews")}>Reviews</button>
      </div>
    </div>
  );
}
