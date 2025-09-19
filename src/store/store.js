import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import favoritesReducer from "./favorites/favoritesSlice";
import productsReducer from "./products/productsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    products: productsReducer,
  },
});

export default store;
