//Chặn trang chỉ dành cho admin
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/login" replace />;

  if (user.maLoaiNguoiDung !== "GV") return <Navigate to="/" replace />;
  return <Outlet />;
}
