import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../../store";
import toast from "react-hot-toast";
import { NewPromotionType } from "../../../types/promotion.type";
import {
  deletePromotion,
  getPromotions,
  unSetCurrent,
} from "../../../slice/promotion.slice";
import axios from "./../../../utils/customAxios.ts";
import { TYPE_DEVICE } from "../../../utils/constants.ts";
import { useSelector } from "react-redux";
export const AddPromotionModal = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [newPromotion, setNewPromotion] = useState<NewPromotionType>({
    description: "",
    typeDevice: "Pc",
  });
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const handleAddPromotionBtn = async () => {
    if (newPromotion.description) {
      try {
        //
        setIsDisabled(true);
        await axios.post("/api/admin/promotion", newPromotion);
        dispatch(getPromotions());
        toast.success("Thêm mới khuyến mãi thành công!");
        setIsDisabled(false);
        handleCloseModal();
      } catch (error) {
        toast.error("Có lỗi xin thử lại!");
        setIsDisabled(false);
      }
    } else toast.error("Chưa nhập đủ thông tin!");
  };
  const handleCloseModal = () => {
    setNewPromotion({
      description: "",
      typeDevice: "Pc",
    });
    setIsShowModal(false);
  };
  return (
    <div>
      <label className="btn btn-error" htmlFor="add-promotion-banner">
        Thêm quảng cáo
      </label>
      <input
        className="modal-state"
        id="add-promotion-banner"
        type="checkbox"
        onChange={() => setIsShowModal(true)}
        // onClick={}
        checked={isShowModal}
      />
      <div className="modal">
        <label className="modal-overlay" htmlFor="add-promotion-banner"></label>
        <div className="modal-content flex flex-col gap-5 min-w-[600px]">
          <label
            onClick={handleCloseModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">Tạo khuyến mãi mới</h2>
          <div className="modal-contents flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="font-medium text-error">Loại thiết bị</h1>
              <div
                id="typedevice-new-promotion"
                className="grid grid-cols-4 gap-4"
              >
                {TYPE_DEVICE.map((item, index) => (
                  <div className="flex flex-col items-center" key={index}>
                    {item}
                    <input
                      type="radio"
                      className="radio radio-error"
                      onChange={() =>
                        setNewPromotion({ ...newPromotion, typeDevice: item })
                      }
                      name="typedevice-new-promotion"
                      checked={newPromotion.typeDevice === item}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-medium text-error">Mô tả</h1>
              <textarea
                className="w-full outline-none p-4 border-2 border-error rounded-lg"
                onChange={(e) =>
                  setNewPromotion({
                    ...newPromotion,
                    description: e.target.value,
                  })
                }
                placeholder="Nhập mô tả"
                value={newPromotion.description}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              disabled={isDisabled}
              onClick={handleAddPromotionBtn}
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

export const DeletePromotionModal = () => {
  const current = useSelector((state: RootState) => state.promotion.current);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  return (
    <>
      <input
        className="modal-state"
        id="delete-promotion-modal"
        type="checkbox"
        onChange={() => setIsShowModal(!isShowModal)}
        checked={isShowModal}
      />
      <div className="modal">
        <label
          className="modal-overlay"
          htmlFor="delete-promotion-modal"
        ></label>
        <div className="modal-content flex flex-col gap-5 min-w-96">
          <label
            htmlFor="delete-promotion-modal"
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
                if (current) dispatch(deletePromotion(current?._id));
                setIsShowModal(false);
              }}
            >
              Delete
            </label>

            <label
              onClick={() => {
                dispatch(unSetCurrent());
              }}
              htmlFor="delete-promotion-modal"
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

export const UpdatePromotionModal = () => {
  const current = useSelector((state: RootState) => state.promotion.current);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [newPromotion, setNewPromotion] = useState<NewPromotionType>({
    description: "",
    typeDevice: "Pc",
  });
  useEffect(() => {
    if (current) {
      setNewPromotion({
        description: current.description,
        typeDevice: current.typeDevice,
      });
    }
  }, [current]);
  const handleUpdatePromotionBtn = async () => {
    if (newPromotion.description) {
      try {
        //
        setIsDisabled(true);
        await axios.patch("/api/admin/promotion/" + current?._id, newPromotion);
        dispatch(getPromotions());
        toast.success("Sửa khuyến mãi thành công!");
        setIsDisabled(false);
        handleCloseModal();
      } catch (error) {
        toast.error("Có lỗi xin thử lại!");
        setIsDisabled(false);
      }
    } else toast.error("Chưa nhập đủ thông tin!");
  };
  const handleCloseModal = () => {
    setNewPromotion({
      description: "",
      typeDevice: "Pc",
    });
    dispatch(unSetCurrent());
    setIsShowModal(false);
  };
  return (
    <div>
      <input
        className="modal-state"
        id="update-promotion-banner"
        type="checkbox"
        onChange={() => setIsShowModal(true)}
        // onClick={}
        checked={isShowModal}
      />
      <div className="modal">
        <label
          className="modal-overlay"
          htmlFor="update-promotion-banner"
        ></label>
        <div className="modal-content flex flex-col gap-5  min-w-[600px]">
          <label
            onClick={handleCloseModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">Tạo khuyến mãi mới</h2>
          <div className="modal-contents flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="font-medium text-error">Loại thiết bị</h1>
              <div
                id="typedevice-update-promotion"
                className="grid grid-cols-4 gap-4"
              >
                {TYPE_DEVICE.map((item, index) => (
                  <div className="flex flex-col items-center" key={index}>
                    {item}
                    <input
                      type="radio"
                      className="radio radio-error"
                      onChange={() =>
                        setNewPromotion({ ...newPromotion, typeDevice: item })
                      }
                      name="typedevice-update-promotion"
                      checked={newPromotion.typeDevice === item}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-medium text-error">Mô tả</h1>
              <textarea
                className="w-full outline-none p-4 border-2 border-error rounded-lg"
                onChange={(e) =>
                  setNewPromotion({
                    ...newPromotion,
                    description: e.target.value,
                  })
                }
                placeholder="Nhập mô tả"
                value={newPromotion.description}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              disabled={isDisabled}
              onClick={handleUpdatePromotionBtn}
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
