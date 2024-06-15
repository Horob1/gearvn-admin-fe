type ProductItemType = {
  productId: string;
  name: string;
  quantity: number;
};
export type WarrantyType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  orderId: string;
  products: ProductItemType[];
  createAt: number;
};
