import { Delete, LayoutDashboard, SquarePen } from "lucide-react";
import { useState } from "react";
import { GetBanners } from "./components/GetBanners";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { convertDate } from "../../utils/convertDate";
import { PAGE_ITEMS } from "../../utils/constants";
import {
  AddBannerModal,
  DeleteBannerModal,
  UpdateBannerModel,
} from "./components/BannerModal";
import { setCurrent } from "../../slice/banner.slice";

export const BannerPage = () => {
  const [page, setPage] = useState<number>(1);
  const banners = useSelector((state: RootState) => state.banner.list);
  const length = useSelector((state: RootState) => state.banner.length);
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.banner.isLoading);

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-red-600">
          <LayoutDashboard size={28} />
          <h1 className="text-2xl font-semibold">Quảng cáo</h1>
        </div>
        <AddBannerModal />
      </div>

      {!isLoading ? (
        <div className="flex flex-col gap-3 w-full" >
          <div className="min-h-[500px]">
            <table className="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Vị trí</th>
                  <th>Màu sắc</th>
                  <th>Ngày tạo</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {banners
                  .filter(
                    (item, index) =>
                      item &&
                      index < page * PAGE_ITEMS &&
                      index >= PAGE_ITEMS * (page - 1)
                  )
                  .map((item, index) => (
                    <tr key={item._id}>
                      <th>{index + 1 + (page - 1) * PAGE_ITEMS}</th>
                      <td>{item?.position}</td>
                      <td
                        style={{
                          backgroundColor: item?.color ?? "#ffffff",
                        }}
                      ></td>
                      <td>{convertDate(item?.createAt)}</td>
                      <td>
                        <div className="popover popover-hover">
                          <label className="popover-trigger">Show</label>
                          <div className="popover-content p-0 bg-transparent shadow-transparent">
                            <img
                              className="min-h-14 max-h-56 m-auto"
                              src={item?.imageURL ?? ""}
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <label
                          htmlFor="updateBannerModel"
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
                          htmlFor="delete-banner-modal"
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
      <DeleteBannerModal />
      <UpdateBannerModel />
      <GetBanners />
    </div>
  );
};
