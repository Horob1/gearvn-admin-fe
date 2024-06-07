import { Delete, LaptopMinimal, SquarePen } from "lucide-react";
import { PAGE_ITEMS } from "../../utils/constants";
import { useState } from "react";
import { SearchProduct } from "./components/SearchProduct";
import { GetProducts } from "./components/GetProducts";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { convertDate } from "../../utils/convertDate";
import { setCurrent } from "../../slice/product.slice";
import { AddProductModal } from "./components/AddProductModal";
import { UpdateProductModal } from "./components/UpdateProductModal";
import { DeleteProductModal } from "./components/DeleteProductModal";

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const products = useSelector((state: RootState) => state.product.list);
  const length = useSelector((state: RootState) => state.product.length);
  const isLoading = useSelector((state: RootState) => state.product.isLoading);
  return (
    <div>
      <div className="p-4 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-red-600">
            <LaptopMinimal size={28} />
            <h1 className="text-2xl font-semibold">Sản phẩm</h1>
          </div>
          <SearchProduct />
          <AddProductModal />
        </div>

        {!isLoading ? (
          <div className="flex flex-col gap-3 w-full">
            <div className="min-h-[500px]">
              <table className="table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Ngày tạo</th>
                    <th>Tồn kho</th>

                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products
                    .filter(
                      (item, index) =>
                        item &&
                        index < page * PAGE_ITEMS &&
                        index >= PAGE_ITEMS * (page - 1)
                    )
                    .map((item, index) => (
                      <tr key={item._id}>
                        <th>{index + 1 + (page - 1) * PAGE_ITEMS}</th>
                        <th
                          className="tooltip tooltip-top tooltip-error"
                          data-tooltip={item?.name}
                        >
                          {item?.name?.length > 50
                            ? item?.name.slice(0, 49)
                            : item?.name}
                          ...
                        </th>
                        <th>{item?.typeDevice}</th>
                        <td>{convertDate(item?.createAt)}</td>
                        <td>{item?.stock}</td>
                        <td>
                          <label
                            htmlFor="update-product-banner"
                            className="cursor-pointer"
                          >
                            <SquarePen
                              onClick={() => {
                                dispatch(setCurrent(item._id));
                              }}
                            />
                          </label>
                        </td>
                        <td>
                          <label
                            htmlFor="delete-product-modal"
                            className="cursor-pointer"
                          >
                            <Delete
                              onClick={() => {
                                dispatch(setCurrent(item._id));
                              }}
                            />
                          </label>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="pagination m-auto">
              {page - 1 > 0 ? (
                <button className="btn" onClick={() => setPage(page - 1)}>
                  {page - 1}
                </button>
              ) : (
                <button className="btn" disabled></button>
              )}
              <button className="btn btn-error !px-2">
                {page}/{Math.ceil(length / PAGE_ITEMS)}
              </button>
              {/* thay length vào */}
              {page + 1 <= Math.ceil(length / PAGE_ITEMS) ? (
                <button className="btn" onClick={() => setPage(page + 1)}>
                  {page + 1}
                </button>
              ) : (
                <button className="btn" disabled></button>
              )}
            </div>
          </div>
        ) : (
          <div className="skeleton h-[500px] rounded-md"></div>
        )}
      </div>
      <DeleteProductModal />
      <UpdateProductModal />
      <GetProducts />
    </div>
  );
};

export default ProductPage;
