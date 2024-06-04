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
function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    isAuthenticated: isAuthenticated,
  };

  return (
    <div
      className="flex w-full h-[100vh]"
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
          //các nested route
        />
        <Route
          path="/login"
          element={
            <PublicRoute
              {...defaultProtectedRouteProps}
              outlet={<LoginPage />}
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
