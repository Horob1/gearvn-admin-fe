import { ClipboardList, Edit, Eye } from "lucide-react";
import { GetOrders } from "./components/GetOrders";
import { useState } from "react";
import { ORDER_TAB, PAGE_ITEMS } from "../../utils/constants";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { convertDate } from "../../utils/convertDate";
import { setTabAction } from "../../slice/order.slice";

export const OrderPage = () => {
  const [tab, setTab] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.order.isLoading);
  const length = useSelector((state: RootState) => state.order.length);
  const order = useSelector((state: RootState) => state.order.list);
  const current = useSelector((state: RootState) => state.order.current);
  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-red-600">
          <ClipboardList size={28} />
          <h1 className="text-2xl font-semibold">Đơn hàng</h1>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="tabs m-auto">
          {ORDER_TAB.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setTab(index);
                //dispatch action
                dispatch(setTabAction(index));
                setPage(1);
              }}
              className={`tab px-6 border-b-2 hover:border-red-500 hover:!text-red-500 ${
                tab == index && "border-red-500 !text-red-500"
              }`}
            >
              {item.titile}
            </div>
          ))}
        </div>
        {!isLoading ? (
          <div className="flex flex-col gap-3 w-full">
            <div className="min-h-[500px]">
              <table className="table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>ID</th>
                    <th>Ngày tạo</th>
                    <th>Trạng thái</th>
                    <th>View</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {tab === 0 &&
                    order
                      .filter(
                        (item, index) =>
                          item &&
                          index < page * PAGE_ITEMS &&
                          index >= PAGE_ITEMS * (page - 1)
                      )
                      .map((item, index) => (
                        <tr key={item._id}>
                          <th>{index + 1 + (page - 1) * PAGE_ITEMS}</th>
                          <th>{item._id}</th>
                          <th>{convertDate(item.createAt)}</th>
                          <th>{item.status}</th>
                          <th>
                            <Eye />
                          </th>
                          <th>
                            <Edit />
                          </th>
                        </tr>
                      ))}
                  {current &&
                    current?.length !== 0 &&
                    current
                      .filter(
                        (item, index) =>
                          item &&
                          index < page * PAGE_ITEMS &&
                          index >= PAGE_ITEMS * (page - 1)
                      )
                      .map((item, index) => (
                        <tr key={item._id}>
                          <th>{index + 1 + (page - 1) * PAGE_ITEMS}</th>
                          <th>{item._id}</th>
                          <th>{convertDate(item.createAt)}</th>
                          <th>{item.status}</th>
                          <th>
                            <Eye />
                          </th>
                          <th>
                            <Edit />
                          </th>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>

            {tab === 0 && (
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
            )}
            {current && current?.length !== 0 && (
              <div className="pagination m-auto">
                {page - 1 > 0 ? (
                  <button className="btn" onClick={() => setPage(page - 1)}>
                    {page - 1}
                  </button>
                ) : (
                  <button className="btn" disabled></button>
                )}
                <button className="btn btn-error !px-2">
                  {page}/{Math.ceil(current?.length / PAGE_ITEMS)}
                </button>
                {/* thay length vào */}
                {page + 1 <= Math.ceil(current?.length / PAGE_ITEMS) ? (
                  <button className="btn" onClick={() => setPage(page + 1)}>
                    {page + 1}
                  </button>
                ) : (
                  <button className="btn" disabled></button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="skeleton h-[500px] rounded-md"></div>
        )}
      </div>
      <GetOrders />
    </div>
  );
};
