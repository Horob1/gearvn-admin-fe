import { PackageSearch } from "lucide-react";
import { useRef, useState } from "react";
import { SearchResult } from "./SearchResult";
import { ProductType } from "../../../types/product.type";
import axios from "./../../../utils/customAxios.ts";

export const SearchProduct = () => {
  const searchRef = useRef<AbortController>();
  const [isOpen, setIsOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<ProductType[]>([]);
  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setSearchResult([]);
      return;
    }
    if (searchRef.current) searchRef.current.abort();
    searchRef.current = new AbortController();
    const signal = searchRef.current.signal;
    //trycatch(() =>
    try {
      const res = await axios.get(
        "/api/product?limit=10&name=" + event.target.value,
        {
          signal,
        }
      );

      setSearchResult(res?.data?.filterProduct ?? []);
    } catch (error) {
      //
    }
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
    <div className="relative">
      <input
        id="search-product"
        type="text"
        onChange={handleSearch}
        onFocus={() => setIsOpen(true)}
        onBlur={handleBlur}
        className="input w-96 border-error pr-8"
        placeholder="Tên sản phẩm"
      ></input>
      <PackageSearch
        color="#F31260"
        className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
      />
      <div id="search-result-item">
        <SearchResult isOpen={isOpen} result={searchResult} />
      </div>
    </div>
  );
};
