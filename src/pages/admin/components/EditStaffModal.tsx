import { useEffect, useState } from "react";
import axios from "../../../utils/customAxios.ts";
import toast from "react-hot-toast";
import { RootState, useAppDispatch } from "../../../store.ts";
import { getStaffList, unSetCurrent } from "../../../slice/staff.slice.ts";
import { useSelector } from "react-redux";

export const EditStaffModal = () => {
  const dispatch = useAppDispatch();
  const current = useSelector((state: RootState) => state.admin.current);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    staffCode: "",
  });
  useEffect(() => {
    if (current)
      setFormData({
        username: current?.username ?? "",
        password: "",
        name: current?.name,
        staffCode: current?.staffCode,
      });
  }, [current]);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const handleUpdateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //
      setIsDisabled(true);
      await axios.patch("/api/admin/staff/" + current?._id, formData);
      dispatch(getStaffList());
      handleCloseModal();
      toast.success("Update staff thành công");
    } catch (error) {
      //
      setIsDisabled(false);
      toast.error("Có lỗi xin thử lại!");
    }
  };
  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCloseModal = () => {
    dispatch(unSetCurrent());
    setFormData({
      username: "",
      password: "",
      name: "",
      staffCode: "",
    });

    setIsShowModal(false);
    setIsDisabled(false);
  };

  return (
    <div>
      <input
        className="modal-state"
        id="update-staff-modal"
        type="checkbox"
        onChange={() => setIsShowModal(true)}
        // onClick={}
        checked={isShowModal}
      />
      <div className="modal">
        <label className="modal-overlay" htmlFor="update-staff-modal"></label>
        <form
          onSubmit={handleUpdateStaff}
          className="modal-content flex flex-col gap-5 min-w-96"
        >
          <label
            onClick={handleCloseModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">Sửa nhân viên {current?.staffCode ?? ""}</h2>
          <div className="modal-contents flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="font-medium text-error">Tên nhân viên</h1>
              <input
                className="border-2 p-2 rounded-md"
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleOnchange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-medium text-error">Tên đăng nhập</h1>
              <input
                className="border-2 p-2 rounded-md"
                required
                type="text"
                name="username"
                value={formData.username}
                onChange={handleOnchange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-medium text-error">Mã nhân viên</h1>
              <input
                className="border-2 p-2 rounded-md"
                required
                type="text"
                name="staffCode"
                value={formData.staffCode}
                onChange={handleOnchange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-medium text-error">Mật khẩu</h1>
              <input
                className="border-2 p-2 rounded-md"
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleOnchange}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button disabled={isDisabled} className="btn btn-error btn-block">
              Lưu
            </button>
            <label onClick={handleCloseModal} className="btn btn-block">
              Huỷ
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};
