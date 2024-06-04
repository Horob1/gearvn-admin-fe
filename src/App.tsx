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

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    isAuthenticated: isAuthenticated,
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<>Home</>}
            />
          }
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
    </>
  );
}

export default App;
