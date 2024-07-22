import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import productReducer from "./slices/ProductSlice";
import authReducer from './slices/authSlce'
import cartReducer from './slices/cartSlice'
import orderReducer from  './slices/orderSlice'


export const store = configureStore({
  reducer: {
    data: productsReducer,
    productState: productReducer,
    authState:authReducer,
    cartState: cartReducer ,
    orderState:orderReducer
  },
});
