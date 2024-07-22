import React, { useEffect } from "react";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.authState);

  const { items: cartItems } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout);
  };

  return (
    <div>
      <div>
        <div className="search">
          <Link to="/">
            <h2>Sriram</h2>
          </Link>

          <input type="text" placeholder="Enter name" />
          <label>Search</label>
        </div>
        <Search />

        {isAuthenticated ? (
          <>
            <div className="logged">
              <button>Logged In</button>
              <button>
                <span>{user.name}</span>
              </button>
              {user.role === "admin" && (
                <button
                  onClick={() => {
                    navigate("/admin/dashboard");
                  }}
                >
                  DashBoard
                </button>
              )}
              <button
                onClick={() => {
                  navigate("/myprofile");
                }}
              >
                Profile
              </button>

              <button
                onClick={() => {
                  navigate("/orders");
                }}
              >
                Orders
              </button>

              <div className="logout">
                <button onClick={logoutHandler}>Log Out</button>
              </div>
            </div>
          </>
        ) : (
          <Link to="/login">
            <button className="login">Loggin</button>
          </Link>
        )}
      </div>
      <div className="cart">
        <Link to="/cart">
          <h3>Cart</h3>
          <span>{Array.isArray(cartItems) ? cartItems.length : "N/A"}</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
