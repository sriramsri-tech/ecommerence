// productsActions.js

import axios from "axios";
import {
  adminProductsFail,
  adminProductsRequest,
  adminProductsSuccess,
  productsFail,
  productsRequest,
  productsSuccess,
} from "../slices/productsSlice";

import {
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  deleteReviewFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  newProductFail,
  newProductRequest,
  newProductSuccess,
  productFail,
  productRequest,
  productSuccess,
  reviewFail,
  reviewRequest,
  reviewSuccess,
  updateProductFail,
  updateProductRequest,
  updateProductSuccess,
} from "../slices/ProductSlice";
//import { errorMonitor } from "nodemailer/lib/xoauth2";

export const getProducts = (keyword, currentPage) => async (dispatch) => {
  try {
    dispatch(productsRequest());
    let link = `/api/v1/products?page=${currentPage}`;
    if (keyword) {
      link += `&keyword=${keyword}`;
    }

    const { data } = await axios.get(link); // Adjust the URL to include the current page
    dispatch(productsSuccess(data)); // Pass data directly
  } catch (error) {
    dispatch(productsFail(error.response.data.message));
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch(productRequest());
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch(productSuccess(data));
  } catch (error) {
    dispatch(productFail(error.response.data.message));
  }
};

export const getAdminProducts = async (dispatch) => {
  try {
    dispatch(adminProductsRequest());
    const { data } = await axios.get("/api/v1/admin/products");
    dispatch(adminProductsSuccess(data));
  } catch (error) {
    dispatch(adminProductsFail(error.response.data.message));
  }
};

export const createNewProduct = (productData) => async (dispatch) => {
  try {
    dispatch(newProductRequest());

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      "/api/v1/admin/product/new",
      productData,
      config
    );
    dispatch(newProductSuccess(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(newProductFail(errorMessage));
    console.error(
      "Error response data:",
      error.response ? error.response.data : "No response data"
    );
    console.error(
      "Error response status:",
      error.response ? error.response.status : "No response status"
    );
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    await axios.delete(`/api/v1/admin/products/${id}`);
    dispatch(deleteProductSuccess());
  } catch (error) {
    dispatch(deleteProductFail(error.response.data.message));
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch(updateProductRequest());

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/products/${id}`,
      productData,
      config
    );
    dispatch(updateProductSuccess(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(updateProductFail(errorMessage));
    console.error(
      "Error response data:",
      error.response ? error.response.data : "No response data"
    );
    console.error(
      "Error response status:",
      error.response ? error.response.status : "No response status"
    );
  }
};

export const getReviews = id => async (dispatch) => {
  try {
    dispatch(reviewRequest());
    const { data } = await axios.get(`/api/v1/admin/reviews`,{params : {id}});

    dispatch(reviewSuccess(data));
  } catch (error) {
    dispatch(reviewFail(error.response.data.message));
  }
};

export const deleteReview = (productId,id) => async (dispatch) => {
  try {
    dispatch(deleteReviewRequest());
     await axios.delete(`/api/v1/admin/reviews`, {
      params: { productId,id },
    });

    dispatch(deleteReviewSuccess());
  } catch (error) {
    dispatch(deleteReviewFail(error.response.data.message));
  }
};