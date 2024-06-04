/* eslint-disable @typescript-eslint/no-explicit-any */
import { Shell } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "./../../utils/customAxios.ts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store.ts";
import { getMe } from "../../slice/user.slice.ts";
import gearVN from "./../../assets/gearvn.png";
type FromLoginData = {
  username: string;
  password: string;
};

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFromData] = useState<FromLoginData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<boolean[]>([false, false]);
  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "username" && error[0] === true)
      setError([false, error[1]]);
    else if (event.target.name === "password" && error[1] === true)
      setError([error[0], false]);

    setFromData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      if (formData.username && formData.password) {
        await axios.post("/api/admin/auth/login", formData);
        toast.success("Đăng nhập thành công");
        dispatch(getMe());

        navigate("/");
      } else {
        toast.error("Nhập chưa đủ thông tin");
        setError([true, true]);
      }

      setIsLoading(false);
    } catch (error: any) {
      if (
        error?.message &&
        error?.message === "Request failed with status code 404"
      ) {
        toast.error("Không tìm thấy tài khoản!");
        setError([false, false]);
      } else if (
        error?.message &&
        error?.message === "Request failed with status code 401"
      ) {
        setError([false, true]);
        toast.error("Sai mật khẩu!");
      } else {
        setError([true, true]);
        toast.error("Không tìm thấy tài khoản!");
      }
      setIsLoading(false);
    }
  };
  return (
    <div className="m-auto backdrop-blur-3xl h-fit p-8 rounded-md shadow-md flex w-full max-w-sm flex-col gap-6 text-white animate-growth">
      <div className="flex flex-col items-center">
        <img
          src={gearVN}
          className="rounded-full shadow-md border-red-900 border-4"
          alt="logo"
        />
        <h1 className="text-3xl font-semibold">GearVN Admin</h1>
        <p className="text-sm">Đăng nhập để truy cập hệ thống GearVN Admin</p>
      </div>
      <div className="form-group">
        <div className="form-field">
          <label
            className={`form-label text-white ${
              error[0] ? "text-red-500 font-medium" : ""
            }`}
          >
            Tên đăng nhập
          </label>
          <input
            placeholder="Tên đăng nhập"
            name="username"
            value={formData.username}
            onChange={handleOnchange}
            required
            type="text"
            className={`input max-w-full ${
              error[0] ? "border-[2px] border-red-500" : ""
            }`}
          />
        </div>
        <div className="form-field">
          <label
            className={`form-label text-white ${
              error[1] ? "text-red-500 font-medium" : ""
            }`}
          >
            Password
          </label>
          <div className="form-control">
            <input
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleOnchange}
              required
              type="password"
              className={`input max-w-full ${
                error[1] ? "border-[2px] border-red-500" : ""
              }`}
            />
          </div>
        </div>

        <div className="form-field pt-5">
          <div className="form-control justify-between">
            <button
              type="button"
              onClick={handleLogin}
              className="btn btn-error w-full"
              disabled={isLoading}
            >
              {!isLoading ? "Đăng nhập" : <Shell className="animate-spin" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
