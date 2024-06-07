import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "./../../assets/gearvn.png";
import {
  ClipboardList,
  Github,
  Home,
  LaptopMinimal,
  LayoutDashboard,
  Lock,
  LogOut,
  ShieldCheck,
  TicketPercent,
} from "lucide-react";
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
          <Link to={"/live-chat"}>
            <button className="btn btn-error hover:opacity-75">
              Live Chat
            </button>
          </Link>
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
      <div className="grid grid-cols-12 h-full flex-1 mb-4 px-4 gap-4">
        <div className="rounded-l-xl col-span-2 h-full text-white">
          <ul className="flex flex-col gap-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#37373a] px-4 py-2 rounded-md"
                  : "px-4 py-2 hover:bg-[#212226] rounded-md"
              }
            >
              <span className="flex items-center gap-2">
                <Home size={20} />
                Thống kê
              </span>
            </NavLink>
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#37373a] px-4 py-2 rounded-md"
                  : "px-4 py-2 hover:bg-[#212226] rounded-md"
              }
            >
              <span className="flex items-center gap-2">
                <LaptopMinimal size={20} />
                Sản phẩm
              </span>
            </NavLink>
            <NavLink
              to="/banner"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#37373a] px-4 py-2 rounded-md"
                  : "px-4 py-2 hover:bg-[#212226] rounded-md"
              }
            >
              <span className="flex items-center gap-2">
                <LayoutDashboard size={20} />
                Quảng cáo
              </span>
            </NavLink>
            <NavLink
              to="/promotion"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#37373a] px-4 py-2 rounded-md"
                  : "px-4 py-2 hover:bg-[#212226] rounded-md"
              }
            >
              <span className="flex items-center gap-2">
                <TicketPercent size={20} />
                Khuyến mãi
              </span>
            </NavLink>
            <NavLink
              to="/warranty"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#37373a] px-4 py-2 rounded-md"
                  : "px-4 py-2 hover:bg-[#212226] rounded-md"
              }
            >
              <span className="flex items-center gap-2">
                <ShieldCheck size={20} />
                Bảo hành
              </span>
            </NavLink>
            <NavLink
              to="/order"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#37373a] px-4 py-2 rounded-md"
                  : "px-4 py-2 hover:bg-[#212226] rounded-md"
              }
            >
              <span className="flex items-center gap-2">
                <ClipboardList size={20} />
                Đơn hàng
              </span>
            </NavLink>
            {userInfo.role === "admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#37373a] px-4 py-2 rounded-md"
                    : "px-4 py-2 hover:bg-[#212226] rounded-md"
                }
              >
                <span className="flex items-center gap-2">
                  <Lock size={20} />
                  Admin
                </span>
              </NavLink>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="px-4 py-2 w-full rounded-md text-start hover:bg-[#212226]"
              >
                <span className="flex items-center gap-2">
                  <LogOut size={20} />
                  Đăng xuất
                </span>
              </button>
            </li>
          </ul>
        </div>
        <div className="rounded-xl col-span-10 bg-white min-h-[680px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
