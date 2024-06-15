// import { Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { LoginPage } from "./pages/login/LoginPage";
import { Route, Routes } from "react-router-dom";
import { GetUserInfo } from "./components/GetUserInfo";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "./components/ProtectedRoute";
import { RootState } from "./store";
import { useSelector } from "react-redux";
import PublicRoute from "./components/PublicRoute";
import { NotFoundPage } from "./pages/notFound/NotFoundPage";
import bg from "./assets/bg.jpg";
import HomePage from "./pages/home/HomePage";
import { LiveChatPage } from "./pages/liveChat/LiveChatPage";
import ProductPage from "./pages/product/ProductPage";
import { BannerPage } from "./pages/banner/BannerPage";
import { PromotionPage } from "./pages/promotion/PromotionPage";
import { WarantyPage } from "./pages/warranty/WarantyPage";
import { OrderPage } from "./pages/order/OrderPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { AdminPage } from "./pages/admin/AdminPage";
function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const role = useSelector((state: RootState) => state.user.info.role);
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    isAuthenticated: isAuthenticated,
  };

  return (
    <div
      className="flex w-full min-h-[100vh] "
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<HomePage />}
            />
          }
        >
          //các nested route
          <Route index element={<DashboardPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/banner" element={<BannerPage />} />
          <Route path="/promotion" element={<PromotionPage />} />
          <Route path="/warranty" element={<WarantyPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route
            path="/admin"
            element={role === "admin" ? <AdminPage /> : <></>}
          />
        </Route>

        <Route
          path="/login"
          element={
            <PublicRoute
              {...defaultProtectedRouteProps}
              outlet={<LoginPage />}
            />
          }
        />
        <Route
          path="/live-chat"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<LiveChatPage />}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
      <GetUserInfo />
    </div>
  );
}

export default App;
