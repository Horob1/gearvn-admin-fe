import { Eye, ShieldCheck } from "lucide-react";
import { SearchWarranty } from "./components/SearchWarranty";
import { GetWarranties } from "./components/GetWarranty";
import { RootState, useAppDispatch } from "../../store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { PAGE_ITEMS } from "../../utils/constants";
import { convertDate } from "../../utils/convertDate";
import { setCurrent } from "../../slice/warranty.slice";
import { WarrantyCardModal } from "./components/WarrantyCardModal";

export const WarantyPage = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const warrantyList = useSelector((state: RootState) => state.warranty.list);
  const length = useSelector((state: RootState) => state.warranty.length);
  const isLoading = useSelector((state: RootState) => state.warranty.isLoading);
  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-red-600">
          <ShieldCheck size={28} />
          <h1 className="text-2xl font-semibold">Bảo hành</h1>
        </div>
        <SearchWarranty />
        <div></div>
      </div>
      {!isLoading ? (
        <div className="flex flex-col gap-3 w-full">
          <div className="min-h-[500px]">
            <table className="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>OrderId</th>
                  <th>Ngày tạo</th>
                  <th>Người đặt</th>
                  <th>Email</th>

                  <th>SĐT</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {warrantyList
                  .filter(
                    (item, index) =>
                      item &&
                      index < page * PAGE_ITEMS &&
                      index >= PAGE_ITEMS * (page - 1)
                  )
                  .map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1 + (page - 1) * PAGE_ITEMS}</td>
                      <td>{item.orderId}</td>
                      <td>{convertDate(item.createAt)}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        <label className="cursor-pointer">
                          <Eye
                            onClick={() => {
                              dispatch(setCurrent(item));
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
      <WarrantyCardModal />
      <GetWarranties />
    </div>
  );
};
