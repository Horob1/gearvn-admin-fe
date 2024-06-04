import { Link, Outlet } from "react-router-dom";
import logo from "./../../assets/gearvn.png";
import { Github } from "lucide-react";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { logOut } from "../../slice/user.slice";
import toast from "react-hot-toast";
import axios from "./../../utils/customAxios.ts";
const HomePage = () => {
  const userInfo = useSelector((state: RootState) => state.user.info);
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      await axios.post("/api/admin/auth/logout");
      dispatch(logOut());
    } catch (error) {
      toast.error("Có lỗi xin thử lại sau!");
    }
  };
  return (
    <div className="main-container m-auto backdrop-blur-3xl flex flex-col rounded-xl shadow-xl w-full md:max-w-[90%] xl:max-w-screen-xl  md:min-h-[80%] bg-main animate-growth">
      <div className="flex justify-between items-center py-4 px-6 text-white h-fit">
        <Link to={"/"}>
          <div className="flex gap-2 items-center">
            <img
              src={logo}
              className="rounded-full aspect-square w-6 h-6"
              alt="logo"
            />
            <h1 className="text-xl font-semibold">
              Gear<span className="text-red-600 font-bold">VN</span>
            </h1>
          </div>
        </Link>
        <div className="flex gap-4 items-center">
          <button className="btn btn-error hover:opacity-75">Live Chat</button>
          <div className="dropdown">
            <label className="btn p-0 rounded-full " tabIndex={0}>
              <div className="avatar flex bg-red-600">
                <Github className="m-auto text-white" size={32} />
              </div>
            </label>
            <div className="dropdown-menu">
              <a className="dropdown-item text-sm text-black">
                {userInfo.name + " (" + userInfo.staffCode + ")"}
              </a>
              <a
                tabIndex={-1}
                onClick={handleLogout}
                className="dropdown-item text-sm text-black"
              >
                Đăng xuất
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 h-full flex-1 mb-4 px-4">
        <div className="rounded-l-xl col-span-2 h-full text-white">Navbar</div>
        <div className="rounded-xl col-span-10 bg-white h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
