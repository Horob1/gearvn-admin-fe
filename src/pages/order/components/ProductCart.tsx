import { useAppDispatch } from "../../../store";
import {
  addProductToCart,
  decreaseProductFromCart,
} from "../../../slice/cart.slice";
import { ProductType } from "../../../types/product.type";
type ProductCardProps = {
  cart: {
    product: ProductType;
    quantity: number;
  };
};
const ProductCart = ({ cart }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="grid grid-cols-5 w-full gap-4 relative pb-2 border-b-2">
      <div className="col-span-2 h-32 w-full">
        <img
          src={cart?.product?.imageList?.[0] ?? ""}
          className="h-full m-auto aspect-square"
          alt=""
        />
      </div>
      <div className="col-span-3 flex flex-col justify-between gap-3">
        <h6 className="text-base line-clamp-2">{cart?.product?.name}</h6>
        <div>
          <span className="text-gray-500 line-through">
            {new Intl.NumberFormat("de-DE").format(cart?.product?.price ?? 0)}đ
          </span>
          <div className="flex items-center">
            <h4 className="text-red-600">
              {new Intl.NumberFormat("de-DE").format(
                ((cart?.product?.price ?? 0) *
                  (100 - (cart?.product?.discount ?? 0))) /
                  100
              )}
              đ
            </h4>{" "}
            <div className="ml-2 text-red-600 border border-red-600  px-2 rounded-md">
              {" "}
              -{cart?.product?.discount ?? 0}%{" "}
            </div>
          </div>
        </div>
        <div className="join">
          <button
            type="button"
            onClick={() => {
              dispatch(decreaseProductFromCart(cart.product));
            }}
            className="join-item btn"
          >
            -
          </button>
          <button
            type="button"
            disabled={true}
            className="join-item btn !text-black"
          >
            {cart?.quantity}
          </button>
          <button
            type="button"
            onClick={() => dispatch(addProductToCart(cart.product))}
            className="join-item btn"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
