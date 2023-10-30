import { configureStore } from '@reduxjs/toolkit';

import { productApi } from './ProductApi';
import cartReducer from '../redux/Cart'

const store = configureStore({
  reducer: {
  cart: cartReducer  ,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});



export default store;
