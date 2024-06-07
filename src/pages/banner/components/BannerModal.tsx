import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  deleteBanner,
  getBanners,
  unSetCurrent,
} from "../../../slice/banner.slice.ts";
import { RootState, useAppDispatch } from "../../../store.ts";
import axios from "./../../../utils/customAxios.ts";
import { TwitterPicker } from "react-color";
import { useSelector } from "react-redux";
type NewBannerType = { position: number; color: string };

export const AddBannerModal = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [newBanner, setNewBanner] = useState<NewBannerType>({
    position: 1,
    color: "#000000",
  });
  const [newImg, setNewImg] = useState<File | null>(null);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const handleAddBannerBtn = async () => {
    if (newImg) {
      const data = new FormData();
      data.append("color", newBanner.color);
      if (newBanner.position === 1) data.append("position", "top");
      if (newBanner.position === 2) data.append("position", "center");
      if (newBanner.position === 3) data.append("position", "rear");
      data.append("image", newImg);
      try {
        setIsDisabled(true);
        await axios.post("/api/admin/banner", data);
        dispatch(getBanners());
        toast.success("Thêm mới quảng cáo thành công!");
        handleCloseModal();
        setIsDisabled(false);
      } catch (error) {
        toast.error("Có lỗi xin thử lại!");
      }
    }
    //close modal
    else toast.error("Chưa đủ thông tin");
  };
  const handleCloseModal = () => {
    setNewImg(null);
    setIsShowModal(false);
    setNewBanner({ position: 1, color: "#000000" });
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the input file
    }
  };
  return (
    <div>
      <label className="btn btn-error" htmlFor="add-modal-banner">
        Thêm quảng cáo
      </label>
      <input
        className="modal-state"
        id="add-modal-banner"
        type="checkbox"
        onChange={() => setIsShowModal(true)}
        // onClick={}
        checked={isShowModal}
      />
      <div className="modal">
        <label className="modal-overlay" htmlFor="add-modal-banner"></label>
        <div className="modal-content flex flex-col gap-5 min-w-[600px]">
          <label
            onClick={handleCloseModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">Tạo quảng cáo mới</h2>
          <div className="modal-contents flex flex-col gap-4">
            <div>
              <h1 className="font-medium text-error">Vị trí quảng cáo</h1>
              <div id="positon-new-banner" className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  Trên cùng
                  <input
                    type="radio"
                    className="radio radio-error"
                    onChange={() => setNewBanner({ ...newBanner, position: 1 })}
                    name="positon-new-banner"
                    checked={newBanner.position === 1}
                  />
                </div>
                <div className="flex flex-col items-center">
                  Giữa
                  <input
                    type="radio"
                    className="radio radio-error"
                    onChange={() => setNewBanner({ ...newBanner, position: 2 })}
                    name="positon-new-banner"
                    checked={newBanner.position === 2}
                  />
                </div>
                <div className="flex flex-col items-center">
                  Rìa
                  <input
                    type="radio"
                    className="radio radio-error"
                    onChange={() => setNewBanner({ ...newBanner, position: 3 })}
                    name="positon-new-banner"
                    checked={newBanner.position === 3}
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <h1 className="font-medium text-error">Màu nền</h1>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <TwitterPicker
                  color={newBanner.color}
                  onChange={(e) => {
                    setNewBanner({ ...newBanner, color: e.hex });
                  }}
                />
                <div
                  className="rounded-md shadow"
                  style={{
                    backgroundColor: newBanner.color,
                  }}
                ></div>
              </div>
            </div>
            <div className="flex  flex-col gap-2">
              <h1 className="font-medium text-error">Ảnh quảng cáo</h1>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  setNewImg(e?.target?.files?.[0] ?? null);
                }}
                className="input-file file:bg-pink-600 border-pink-500 file:text-white"
              />
              {newImg && (
                <img
                  src={URL.createObjectURL(newImg)}
                  className="rounded-md"
                  alt="preview"
                />
              )}
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

export const DeleteBannerModal = () => {
  const current = useSelector((state: RootState) => state.banner.current);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  return (
    <>
      <input
        className="modal-state"
        id="delete-banner-modal"
        type="checkbox"
        onChange={() => setIsShowModal(!isShowModal)}
        checked={isShowModal}
      />
      <div className="modal">
        <label className="modal-overlay" htmlFor="delete-banner-modal"></label>
        <div className="modal-content flex flex-col gap-5 min-w-96">
          <label
            htmlFor="delete-banner-modal"
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
                if (current) dispatch(deleteBanner(current?._id));
                setIsShowModal(false);
              }}
            >
              Delete
            </label>

            <label
              onClick={() => {
                dispatch(unSetCurrent());
              }}
              htmlFor="delete-banner-modal"
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

export const UpdateBannerModel = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const current = useSelector((state: RootState) => state.banner.current);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [newBanner, setNewBanner] = useState<NewBannerType>({
    position: 1,
    color: current?.color ?? "#000000",
  });
  useEffect(() => {
    if (current) {
      setNewBanner({
        position:
          current?.position === "top"
            ? 1
            : current?.position === "center"
            ? 2
            : 3,
        color: current?.color ?? "#000000",
      });
    }
  }, [current]);

  const [newImg, setNewImg] = useState<File | null>(null);
  const handleUpdateBtn = async () => {
    const data = new FormData();
    data.append("color", newBanner.color);
    if (newBanner.position === 1) data.append("position", "top");
    if (newBanner.position === 2) data.append("position", "center");
    if (newBanner.position === 3) data.append("position", "rear");
    if (newImg) data.append("image", newImg);
    try {
      setIsDisabled(true);
      await axios.patch("/api/admin/banner/" + current?._id, data);
      dispatch(getBanners());
      toast.success("Sửa quảng cáo thành công!");
      handleCloseModal();
      setIsDisabled(false);
    } catch (error) {
      toast.error("Có lỗi xin thử lại!");
    }
  };
  const handleCloseModal = () => {
    setNewImg(null);
    setNewBanner({
      position:
        current?.position === "top"
          ? 1
          : current?.position === "center"
          ? 2
          : 3,
      color: current?.color ?? "#000000",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the input file
    }
    setIsShowModal(false);
    dispatch(unSetCurrent());
  };
  return (
    <>
      <input
        className="modal-state"
        id="updateBannerModel"
        type="checkbox"
        onChange={() => setIsShowModal(!isShowModal)}
        checked={isShowModal}
      />
      <div className="modal">
        <label className="modal-overlay" htmlFor="updateBannerModel"></label>
        <div className="modal-content flex flex-col gap-5 min-w-[640px]">
          <label
            onClick={handleCloseModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">Sửa quảng cáo</h2>
          <div className="modal-contents flex flex-col gap-4">
            <div>
              <h1 className="font-medium text-error">Vị trí quảng cáo</h1>
              <div id="positon-new-banner" className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  Trên cùng
                  <input
                    type="radio"
                    className="radio radio-error"
                    onChange={() => setNewBanner({ ...newBanner, position: 1 })}
                    name="position-update-banner"
                    checked={newBanner.position === 1}
                  />
                </div>
                <div className="flex flex-col items-center">
                  Giữa
                  <input
                    type="radio"
                    className="radio radio-error"
                    onChange={() => setNewBanner({ ...newBanner, position: 2 })}
                    name="position-update-banner"
                    checked={newBanner.position === 2}
                  />
                </div>
                <div className="flex flex-col items-center">
                  Rìa
                  <input
                    type="radio"
                    className="radio radio-error"
                    onChange={() => setNewBanner({ ...newBanner, position: 3 })}
                    name="position-update-banner"
                    checked={newBanner.position === 3}
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <h1 className="font-medium text-error">Màu nền</h1>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <TwitterPicker
                  color={newBanner.color}
                  onChange={(e) => {
                    setNewBanner({ ...newBanner, color: e.hex });
                  }}
                />
                <div
                  className="rounded-md shadow"
                  style={{
                    backgroundColor: newBanner.color,
                  }}
                ></div>
              </div>
            </div>
            <div className="flex  flex-col gap-2">
              <h1 className="font-medium text-error">Ảnh quảng cáo</h1>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  setNewImg(e?.target?.files?.[0] ?? null);
                }}
                className="input-file file:bg-pink-600 border-pink-500 file:text-white"
              />
              {newImg ? (
                <img
                  src={URL.createObjectURL(newImg)}
                  className="rounded-md"
                  alt="preview"
                />
              ) : (
                <img
                  src={current?.imageURL ?? ""}
                  className="rounded-md"
                  alt="preview"
                />
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              disabled={isDisabled}
              className="btn btn-error btn-block"
              onClick={handleUpdateBtn}
            >
              Lưu
            </button>

            <label onClick={handleCloseModal} className="btn btn-block">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
