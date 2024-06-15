import { useState } from "react";
import axios from "../../../utils/customAxios.ts";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../../store.ts";
import { getStaffList } from "../../../slice/staff.slice.ts";

export const AddStaffModal = () => {
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    staffCode: "",
  });
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //
      setIsDisabled(true);
      await axios.post("/api/admin/staff", formData);
      dispatch(getStaffList());
      handleCloseModal();
      toast.success("Thêm staff thành công");
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
      <label className="btn btn-error" htmlFor="add-staff-modal">
        Thêm staff
      </label>
      <input
        className="modal-state"
        id="add-staff-modal"
        type="checkbox"
        onChange={() => setIsShowModal(true)}
        // onClick={}
        checked={isShowModal}
      />
      <div className="modal">
        <label className="modal-overlay" htmlFor="add-staff-modal"></label>
        <form
          onSubmit={handleAddStaff}
          className="modal-content flex flex-col gap-5 min-w-96"
        >
          <label
            onClick={handleCloseModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">Tạo nhân viên mới</h2>
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
