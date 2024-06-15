import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../types/product.type";



export type Cart = {
  product: ProductType;
  quantity: number;
};

type InitialStateType = {
  cart: Cart[];
};
const initialState: InitialStateType = {
  cart: [],
};

const cartSlice = createSlice({
  name: "CART",
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const product = action.payload;
      const index = state.cart.findIndex(
        (item) => item.product._id === product._id
      );
      if (index !== -1) {
        state.cart[index].quantity += 1;
      } else {
        state.cart.push({ product, quantity: 1 });
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(state.cart.map((item) => item))
      );
    },
    removeProductFromCart(state, action) {
      const product = action.payload;
      const index = state.cart.findIndex(
        (item) => item.product._id === product._id
      );
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
      localStorage.setItem(
        "cart",
        JSON.stringify(state.cart.map((item) => item))
      );
    },
    decreaseProductFromCart(state, action) {
      const product = action.payload;
      const index = state.cart.findIndex(
        (item) => item.product._id === product._id
      );
      if (index !== -1) {
        state.cart[index].quantity -= 1;
        if (state.cart[index].quantity === 0) {
          state.cart.splice(index, 1);
        }
      }
      localStorage.setItem(
        "cart",
        JSON.stringify(state.cart.map((item) => item))
      );
    },
    clearCart(state) {
      state.cart = [];
      localStorage.setItem(
        "cart",
        JSON.stringify(state.cart.map((item) => item))
      );
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  decreaseProductFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
