import { useSelector } from "react-redux";
import { SearchProduct } from "./SearchProduct";
import { RootState } from "../../../store";
import ProductCart from "./ProductCart";

export const AddProductToCart = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  return (
    <>
      <SearchProduct />
      {cart.length !== 0 && (
        <>
          <ul className="mt-6">
            {cart.map((item) => (
              <li key={item.product._id} className="mt-4">
                <ProductCart cart={item}></ProductCart>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
