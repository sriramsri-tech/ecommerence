import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "react-toastify/dist/ReactToastify.css";

import { adminOrder, deleteOrder } from "../../actions/orderActions";
import { clearOrderDeleted } from "../../slices/orderSlice";
import Sidebar from "./Sidebar";

export default function OrderList() {
  const {
    adminOrders = [],
    loading = true,
    isOrderDeleted,
    error,
  } = useSelector((state) => state.orderState);

  const dispatch = useDispatch();

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Number of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status", // Fixed field name to lowercase
          sort: "asc",
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
        },
      ],
      rows: [],
    };

    adminOrders.forEach((order) => {
      console.log("Order Status:", order.orderStatus); // Debug log
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`, // Fixed string interpolation
        status: (
          <p
            style={{
              color: order.orderStatus.includes("Processing") ? "green" : "red",
            }}
          >
            {order.orderStatus}
          </p>
        ),
        action: (
          <Fragment>
            <Link
              to={`admin/orders/${order._id}`}
              className="btn btn-primary btn-sm mr-2"
            >
              <button onClick={(e) => deleteHandler(e, order._id)}>
                Delete
              </button>
              <i className="fas fa-edit"></i>
            </Link>
            <Link to={`/admin/order/${order._id}`}>
              <button className="btn btn-danger btn-sm">Edit</button>
            </Link>
          </Fragment>
        ),
      });
    });
    return data;
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
      return;
    }

    if (isOrderDeleted) {
      toast("Order deleted successfully", {
        type: "success",
        position: "bottom-center",
        onOpen: () => dispatch(clearOrderDeleted()),
      });

      return;
    }

    dispatch(adminOrder);
  }, [dispatch, error, isOrderDeleted]);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <h2 className="my-4">Order List</h2>
        <Fragment>
          {loading ? (
            "Loading..."
          ) : (
            <MDBDataTable
              data={setOrders()}
              bordered
              striped
              hover
              className="product-list-table"
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}
