import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userSlice from "./slice/user.slice";
import bannerSlice from "./slice/banner.slice";
import promotionSlide from "./slice/promotion.slice";
import productSlice from "./slice/product.slice";
import orderSlice from "./slice/order.slice";
import cartSlice from "./slice/cart.slice";
import warrantySlice from "./slice/warranty.slice";
import staffSlice from "./slice/staff.slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    banner: bannerSlice,
    promotion: promotionSlide,
    product: productSlice,
    order: orderSlice,
    cart: cartSlice,
    warranty: warrantySlice,
    admin: staffSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
