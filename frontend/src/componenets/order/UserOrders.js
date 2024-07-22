import React, { Fragment, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { userOrder as userOrdersAction } from "../../actions/orderActions";
import {Link}  from "react-router-dom"


export default function UserOrders() {

  const { userOrders = [] } = useSelector(state => state.orderState);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(userOrdersAction);
  },[])
  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
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
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    }
    userOrders.forEach((userOrder) => {
      data.rows.push({
        id: userOrder._id,
        numOfItems: userOrder.orderItems.length,
        amount: `$${userOrder.totalPrice}`,
        status:
          userOrder.orderStatus &&
          userOrder.orderStatus.includes("Processing") ? (
            <p style={{ color: "green" }}></p>
          ) : (
            <p style={{ color: "red" }}></p>
          ),
        actions: (
          <Link to={`/order/${userOrder._id}`}>
            <button>Go</button>
          </Link>
        ),
      });
    });
    return data;
  };

  return (
    <Fragment>
      <div className="container">
        <h1>My Orders</h1>
        <MDBDataTable bordered striped hover data={setOrders()} />
      </div>
    </Fragment>
  );
}
