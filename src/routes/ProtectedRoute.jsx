//Chặn trang yêu cầu login
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";

export default function ProtectedRoute() {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
