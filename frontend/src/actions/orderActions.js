import axios from "axios";
import {
  adminOrderFail,
  adminOrderRequest,
  adminOrderSuccess,
  createOrderFail,
  createOrderRequest,
  createOrderSuccess,
  deleteOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  orderDetailFail,
  orderDetailRequest,
  orderDetailSuccess,
  updateOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  userOrderFail,
  userOrderRequest,
  userOrderSuccess,
} from "../slices/orderSlice";
import {
  createReviewFail,
  createReviewRequest,
  createReviewSuccess,
} from "../slices/ProductSlice";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const { data } = await axios.post("/api/v1/order/new", order);
    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(createOrderFail(error.response.data.message));
  }
};

export const userOrder = async (dispatch) => {
  try {
    dispatch(userOrderRequest());
    const { data } = await axios.get("/api/v1/myorders");
    dispatch(userOrderSuccess(data));
  } catch (error) {
    dispatch(userOrderFail(error.response.data.message));
  }
};

export const orderDetail = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailRequest());
    const { data } = await axios.get(`/api/v1/order/${id}`);

    dispatch(orderDetailSuccess(data));
  } catch (error) {
    dispatch(orderDetailFail(error.response.data.message));
  }
};

export const createReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(createReviewRequest());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch(createReviewSuccess(data));
  } catch (error) {
    dispatch(createReviewFail(error.response.data.message));
  }
};

export const adminOrder = async (dispatch) => {
  try {
    dispatch(adminOrderRequest());
    const { data } = await axios.get("/api/v1/admin/orders");
    dispatch(adminOrderSuccess(data));
  } catch (error) {
    dispatch(adminOrderFail(error.response.data.message));
  }
};

//delete admin

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());
    await axios.delete(`/api/v1/admin/orders/${id}`);

    dispatch(deleteOrderSuccess());
  } catch (error) {
    dispatch(deleteOrderFail(error.response.data.message));
  }
};

export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch(updateOrderRequest());
    const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData);
    dispatch(updateOrderSuccess(data));
  } catch (error) {
    dispatch(updateOrderFail(error.response.data.message));
  }
};
