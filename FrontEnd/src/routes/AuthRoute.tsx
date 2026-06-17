import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const AuthRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const token = localStorage.getItem("token");

  return isAuthenticated || token ? (
    <Navigate to="/" replace />
  ) : (
    <Outlet />
  );
};

export default AuthRoute;