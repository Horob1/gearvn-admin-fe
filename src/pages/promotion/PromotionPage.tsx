import { useState } from "react";
import { PAGE_ITEMS } from "../../utils/constants";
import { Delete, SquarePen, TicketPercent } from "lucide-react";
import {
  AddPromotionModal,
  DeletePromotionModal,
  UpdatePromotionModal,
} from "./components/PromotionBanner";
import { GetPromotions } from "./components/GetPromotions";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { setCurrent } from "../../slice/promotion.slice";
import { convertDate } from "../../utils/convertDate";

export const PromotionPage = () => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const promotions = useSelector((state: RootState) => state.promotion.list);
  const length = useSelector((state: RootState) => state.promotion.length);
  const isLoading = useSelector(
    (state: RootState) => state.promotion.isLoading
  );
  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-red-600">
          <TicketPercent size={28} />
          <h1 className="text-2xl font-semibold">Khuyến mãi</h1>
        </div>
        <AddPromotionModal />
      </div>

      {!isLoading ? (
        <div className="flex flex-col gap-3 w-full">
          <div className="min-h-[500px]">
            <table className="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Loại sản phẩm</th>
                  <th>Mô tả</th>
                  <th>Ngày tạo</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {promotions
                  .filter(
                    (item, index) =>
                      item &&
                      index < page * PAGE_ITEMS &&
                      index >= PAGE_ITEMS * (page - 1)
                  )
                  .map((item, index) => (
                    <tr key={item._id}>
                      <th>{index + 1 + (page - 1) * PAGE_ITEMS}</th>
                      <td>{item?.typeDevice}</td>
                      <td>{item?.description}</td>
                      <td>{convertDate(item?.createAt)}</td>
                      <td>
                        <label
                          htmlFor="update-promotion-banner"
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
                          htmlFor="delete-promotion-modal"
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
            <button className="btn btn-error">{page}</button>
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
      <DeletePromotionModal />
      <UpdatePromotionModal />
      <GetPromotions />
    </div>
  );
};
