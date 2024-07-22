import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    product: {},
    isReviewSubmitted: false,
    isProductCreated: false,
    isProductDeleted: false,
    isProductUpdated: false,
    isReviewDeleted: false,
    reviews: [],
  },
  reducers: {
    productRequest(state, action) {
      return {
        loading: true,
      };
    },
    productSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product, // Set products from the action payload
        productsCount: action.payload.count,
      };
    },
    productFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    createReviewRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    createReviewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isReviewSubmitted: true,
      };
    },
    createReviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    clearReviewSubmitted: (state, action) => {
      return {
        ...state,
        isReviewSubmitted: false,
      };
    },

    clearProduct: (state, action) => {
      return {
        ...state,
        product: {},
      };
    },

    newProductRequest(state, action) {
      return {
        loading: true,
      };
    },
    newProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product, // Set products from the action payload
        isProductCreated: true,
      };
    },
    newProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isProductCreated: false,
      };
    },
    clearProductCreated(state, action) {
      return {
        ...state,
        isProductCreated: false,
      };
    },

    deleteProductRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isProductDeleted: true,
      };
    },
    deleteProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    clearProductFail(state, action) {
      return {
        ...state,
        isProductDeleted: false,
      };
    },

    updateProductRequest(state, action) {
      return {
        loading: true,
      };
    },
    updateProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product, // Set products from the action payload
        isProductUpdated: true,
      };
    },
    updateProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearProductUpdated(state, action) {
      return {
        ...state,
        isProductUpdated: false,
      };
    },

    reviewRequest(state, action) {
      return {
        loading: true,
      };
    },
    reviewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        reviews: action.payload.reviews, // Set products from the action payload
      };
    },
    reviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    deleteReviewRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteReviewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isReviewDeleted: true,
      };
    },
    deleteReviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearReviewDeleted(state,action){
      return{
        ...state,
        isReviewDeleted:false
      }
    }
  },
});

const { actions, reducer } = productSlice;

export const { productRequest, productSuccess, productFail ,createReviewRequest,createReviewSuccess,createReviewFail,
  clearReviewSubmitted,clearProduct,newProductRequest,newProductSuccess,newProductFail,clearProductCreated,
  deleteProductRequest,deleteProductSuccess,deleteProductFail,clearProductFail,updateProductRequest,updateProductSuccess,
   updateProductFail,clearProductUpdated,reviewRequest,reviewSuccess,reviewFail,deleteReviewRequest,
   deleteReviewSuccess,deleteReviewFail,clearReviewDeleted
 } = actions;
export default reducer;
