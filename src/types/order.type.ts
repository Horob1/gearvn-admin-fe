import { ProductType } from "./product.type";

export type CartItemType = {
  quantity: number;
  detail: ProductType;
};

export type OrderType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalAmount: number;
  product: CartItemType[];
  isPaided: boolean;
  status: string;
  createAt: number;
  updateAt: null | number;
  userId: string;
};
