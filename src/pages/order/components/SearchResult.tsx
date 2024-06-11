import "./searchResult.css";
import { ProductType } from "../../../types/product.type";
import { useAppDispatch } from "../../../store";
import { setCurrent } from "../../../slice/product.slice";
import { Delete, SquarePen } from "lucide-react";

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
                dispatch(setCurrent(item._id));
              }}
              onMouseDown={(e) => e.preventDefault()}
              key={item._id}
              className="flex justify-between items-center pb-2 border-b-2"
            >
              <div className="pr-5 pt-2">
                <span className="line-clamp-1 text-sm">{item?.name}</span>
                <div className="flex gap-4 line-clamp-1 mt-4">
                  <label
                    htmlFor="update-product-banner"
                    className="cursor-pointer"
                  >
                    <SquarePen />
                  </label>
                  <label
                    htmlFor="delete-product-modal"
                    className="cursor-pointer"
                  >
                    <Delete />
                  </label>
                </div>
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
