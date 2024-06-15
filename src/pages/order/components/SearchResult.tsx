import "./searchResult.css";
import { ProductType } from "../../../types/product.type";
import { useAppDispatch } from "../../../store";
import { addProductToCart } from "../../../slice/cart.slice";

type SearchResultProps = {
  result: ProductType[];
  isOpen: boolean;
};
export const SearchResult = ({ isOpen, result }: SearchResultProps) => {
  const dispatch = useAppDispatch();
  return (
    <label
      htmlFor=""
      className={`search-result ${
        result.length === 0 || !isOpen ? "hidden" : ""
      }`}
    >
      <div className="px-4 pt-2 z-50 border-t-2 bg-white shadow-md rounded-md absolute w-full max-h-[300px] top-[110%] left-0 overflow-y-auto">
        {result &&
          isOpen &&
          result.map((item) => (
            <div
              onClick={() => {
                dispatch(addProductToCart(item));
              }}
              onMouseDown={(e) => e.preventDefault()}
              key={item._id}
              className="flex cursor-pointer justify-between items-center pb-2 border-b-2"
            >
              <div className="pr-5 pt-2">
                <span className="line-clamp-1 text-sm">{item?.name}</span>
              </div>
              <img
                src={item?.imageList?.[0] ?? ""}
                className="h-[50px] aspect-square"
                alt=""
              />
            </div>
          ))}
      </div>
    </label>
  );
};
