import { Shell } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "./../../utils/customAxios.ts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store.ts";
import { getMe } from "../../slice/user.slice.ts";
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
  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        dispatch(getMe())

        navigate("/");
      } else {
        toast.error("Nhập chưa đủ thông tin");
      }

      setIsLoading(false);
    } catch (error) {
      toast.error("Sai mật khẩu hoặc tài khoản!");

      setIsLoading(false);
    }
  };
  return (
    <div className="flex h-[100vh]">
      <div className="m-auto h-fit p-8 rounded-md shadow-md justify-center flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold">Sign In</h1>
          <p className="text-sm">Đăng nhập để truy cập hệ thống</p>
        </div>
        <div className="form-group">
          <div className="form-field">
            <label className="form-label">Tên đăng nhập</label>
            <input
              placeholder="Tên đăng nhập"
              name="username"
              value={formData.username}
              onChange={handleOnchange}
              required
              type="text"
              className="input max-w-full"
            />
          </div>
          <div className="form-field">
            <label className="form-label">Password</label>
            <div className="form-control">
              <input
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleOnchange}
                required
                type="password"
                className="input max-w-full"
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
    </div>
  );
};
