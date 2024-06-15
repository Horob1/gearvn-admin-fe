import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../../store";
import { getOrders, unSetCurrentOrder } from "../../../slice/order.slice";
import { useSelector } from "react-redux";
import { ORDER_STATUS } from "../../../utils/constants";
import axios from "./../../../utils/customAxios.ts";
import toast from "react-hot-toast";

export const UpdateOrder = () => {
  const dispatch = useAppDispatch();
  const [isPaided, setIsPaided] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    id: "",
    status: "pending",
  });
  const currentOrder = useSelector(
    (state: RootState) => state.order.currentOrder
  );
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const handleAddBannerBtn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      if (currentOrder) {
        await axios.post(`/api/admin/order/update-status`, {
          ...formData,
          isPaided: isPaided,
        });
        toast.success("Order updated successfully!");
        dispatch(unSetCurrentOrder());
        dispatch(getOrders());
        handleCloseModal();
      }
    } catch (error) {
      // TODO: toast error
      toast.error("Có lỗi!");
    }
    setIsDisabled(false);
  };
  const handleCloseModal = () => {
    setFormData({ id: "", status: "pending" });
    setIsPaided(false);
    dispatch(unSetCurrentOrder());
    setIsShowModal(false);
    setIsDisabled(false);
  };
  useEffect(() => {
    if (currentOrder) {
      setIsPaided(currentOrder?.isPaided);
      setFormData({
        id: currentOrder._id,
        status: currentOrder.status,
      });
    }
  }, [currentOrder]);
  return (
    <div>
      <input
        className="modal-state"
        id="update-modal-order"
        type="checkbox"
        onChange={() => setIsShowModal(true)}
        // onClick={}
        checked={isShowModal}
      />
      <div className="modal">
        <label className="modal-overlay" htmlFor="update-modal-order"></label>
        <div className="modal-content flex flex-col gap-5 min-w-[900px]">
          <label
            onClick={handleCloseModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">Update order</h2>
          <div className="modal-contents grid grid-cols-2 gap-4">
            <div className="px-4 flex flex-col gap-4">
              {!(
                currentOrder?.status === "complete" ||
                currentOrder?.status === "rejected"
              ) && (
                <div className="flex flex-col gap-2">
                  <h1 className="font-medium text-error">Status</h1>
                  <select
                    name="status"
                    value={formData?.status ?? "pending"}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="select select-error"
                  >
                    {ORDER_STATUS.map((item, index) => (
                      <option className="px-4 py-2" key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {!currentOrder?.isPaided && (
                <label className="flex cursor-pointer gap-2">
                  <input
                    type="checkbox"
                    className="switch switch-error"
                    onChange={() => setIsPaided(!isPaided)}
                    checked={isPaided}
                  />
                  <span>Đã thanh toán?</span>
                </label>
              )}
            </div>
            <div className="px-4 bg-red-50 rounded-md">
              <h4 className="text-center pt-4">Chi tiết đơn hàng:</h4>
              <div className="mt-4 h-80 overflow-auto rounded-md">
                {currentOrder?.product &&
                  currentOrder?.product?.map((item) => (
                    <div
                      key={item?.detail._id}
                      className="grid grid-cols-5 w-full gap-4 pb-2 border-t-2"
                    >
                      <div className="col-span-2 h-16 w-full">
                        <img
                          src={item.detail?.imageList?.[0] ?? ""}
                          className="h-full m-auto aspect-square"
                          alt=""
                        />
                      </div>
                      <div className="col-span-2 ">
                        <h6 className="text-sm line-clamp-1">
                          {item.detail?.name}
                        </h6>

                        <div>
                          <h4 className="text-red-600 text-sm">
                            {new Intl.NumberFormat("de-DE").format(
                              ((item.detail?.price ?? 0) *
                                (100 - (item.detail?.discount ?? 0))) /
                                100
                            )}
                            đ
                          </h4>
                        </div>
                      </div>
                      <div className="h-full flex">
                        <span className="my-auto">x{item.quantity}</span>
                      </div>
                    </div>
                  ))}
              </div>
              <h4 className="text-center mt-4">Tổng tiền:</h4>
              <h2 className="text-red-500 text-center">
                {new Intl.NumberFormat("de-DE").format(
                  currentOrder?.totalAmount ?? 0
                )}
                đ
              </h2>
              <h2 className="text-red-500 text-center">
                Trạng thái: {currentOrder?.status}
              </h2>
              <h2 className="text-red-500 text-center">
                Đã thanh toán: {currentOrder?.isPaided ? "Đúng" : "Sai"}
              </h2>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              disabled={isDisabled}
              onClick={handleAddBannerBtn}
              className="btn btn-error btn-block"
            >
              Lưu
            </button>

            <label onClick={handleCloseModal} className="btn btn-block">
              Huỷ
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
