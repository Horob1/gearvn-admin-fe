import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { useState } from "react";
import { deleteProduct, unSetCurrent } from "../../../slice/product.slice";

export const DeleteProductModal = () => {
  const current = useSelector((state: RootState) => state.product.current);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  return (
    <>
      <input
        className="modal-state"
        id="delete-product-modal"
        type="checkbox"
        onChange={() => setIsShowModal(!isShowModal)}
        checked={isShowModal}
      />
      <div className="modal">
        <label
          className="modal-overlay"
          htmlFor="delete-product-modal"
        ></label>
        <div className="modal-content flex flex-col gap-5 min-w-96">
          <label
            htmlFor="delete-product-modal"
            onClick={() => {
              dispatch(unSetCurrent());
            }}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">Có chắc chắn xoá hay không?</h2>

          <div className="flex gap-3">
            <label
              className="btn btn-error btn-block"
              onClick={() => {
                if (current) dispatch(deleteProduct(current?._id));
                setIsShowModal(false);
              }}
            >
              Delete
            </label>

            <label
              onClick={() => {
                dispatch(unSetCurrent());
              }}
              htmlFor="delete-product-modal"
              className="btn btn-block"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
