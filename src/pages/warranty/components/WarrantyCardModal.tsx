import { useSelector } from "react-redux";
import { unSetCurrent } from "../../../slice/warranty.slice";
import { RootState, useAppDispatch } from "../../../store";
import { useEffect, useState } from "react";
import {
  convertDate,
  convertDateForWarranty,
} from "../../../utils/convertDate";

export const WarrantyCardModal = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const current = useSelector((state: RootState) => state.warranty.current);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (current) setIsShowModal(true);
  }, [current]);
  const handleCloseModal = () => {
    setIsShowModal(false);
    dispatch(unSetCurrent());
  };
  useEffect(() => {}, []);
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
          <h2 className="text-xl">Phiếu bảo hành</h2>
          <div className="modal-contents flex flex-col gap-4">
            <h1 className="font-medium ">Người mua: {current?.name ?? ""}</h1>
            <h1 className="font-medium ">Email: {current?.email ?? ""}</h1>
            <h1 className="font-medium ">Phone: {current?.phone ?? ""}</h1>
            <h1 className="font-medium ">
              Ngày bắt đầu: {convertDate(current?.createAt ?? 0) ?? ""}
            </h1>
            <h1 className="font-medium ">
              Ngày hết hạn:{" "}
              {convertDateForWarranty(current?.createAt ?? 0) ?? ""}
            </h1>
            <h1 className="font-medium ">Danh sách sản phẩm: </h1>
            <div className="p-4 border-2">
              {current?.products &&
                current?.products?.map((item, index) => (
                  <h1 key={item.productId} className="font-medium ">
                    {index + 1} : {item.name} x {item.quantity}
                  </h1>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
