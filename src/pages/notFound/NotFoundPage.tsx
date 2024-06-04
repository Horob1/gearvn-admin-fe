import { useNavigate } from "react-router-dom";
import notFound from "./../../assets/404.webp";
export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-8 m-auto rounded-md backdrop-blur-3xl shadow-xl flex flex-col gap-4 animate-growth">
      <img src={notFound} className="w-[500px]" alt="" />
      <h1 className="text-white text-[26px] font-semibold text-center">
        Rất tiếc trang bạn tìm không tồn tại.
      </h1>
      <button
        onClick={() => navigate("/")}
        className="btn btn-error mx-auto px-8 hover:opacity-75"
      >
        Về trang chủ
      </button>
    </div>
  );
};
