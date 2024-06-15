import { useState } from "react";
import { SearchResult } from "./SearchResult";
import { ProductType } from "../../../types/product.type";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { GetProducts } from "../../product/components/GetProducts";

export const SearchProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const product = useSelector((state: RootState) => state.product.list);
  const [searchResult, setSearchResult] = useState<ProductType[]>([]);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setSearchResult([]);
      return;
    }
    //tìm kiếm
    const result = product.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResult(result);
  };
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (
      event.relatedTarget &&
      event.relatedTarget.id === "search-result-item"
    ) {
      return;
    }
    setIsOpen(false);
  };
  return (
    <div className="relative flex gap-4 items-center m-auto">
      <h1 className="text-error font-semibold"> Tìm sản phẩm</h1>
      <input
        id="search-product"
        type="text"
        onChange={handleSearch}
        onFocus={() => setIsOpen(true)}
        onBlur={handleBlur}
        className="input border-error pr-8"
        placeholder="Tên sản phẩm"
      ></input>
      <div id="search-result-item">
        <SearchResult isOpen={isOpen} result={searchResult} />
      </div>
      <GetProducts />
    </div>
  );
};
