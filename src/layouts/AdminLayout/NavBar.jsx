// Navbar.jsx
import { Link, useMatch, useNavigate } from "react-router-dom";
import Logo from "./Logo.jsx";
import { Form, Input, message } from "antd";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../feature/auth/authSlice.js";

export default function Navbar() {
  const matchCourses = useMatch("/admin/courses/*");
  const matchUsers = useMatch("/admin/users/*");
  const matchEnroll = useMatch("/admin/enroll/*");

  const dispatch = useDispatch();

  // Lấy user từ Redux
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutAction());
    message.success("Đăng xuất thành công!");
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm">
      <div className="container-fluid nav-wrap">
        <Logo />

        <div className="collapse navbar-collapse nav-left" id="mainNavbar">
          <div className="d-flex align-items-center">
            <Link
              to="/admin/courses"
              className={`link-route ${matchCourses ? "active-navbar" : ""}`}
            >
              QUẢN LÝ KHÓA HỌC
            </Link>
            <Link
              to="/admin/users"
              className={`link-route ${matchUsers ? "active-navbar" : ""}`}
            >
              QUAN LÝ NGƯỜI DÙNG
            </Link>
            <Link
              to="/admin/enroll"
              className={`link-route ${matchEnroll ? "active-navbar" : ""}`}
            >
              QUAN LÝ GHI DANH
            </Link>

            <Link to="/" className="link-route">
              TRANG NGƯỜI DÙNG
            </Link>
          </div>

          <div className="ms-auto d-flex nav-right">
            {user ? (
              <button className="btn btn-auth">{`Hello! ${user.hoTen}`}</button>
            ) : (
              <Link to="/login" className="btn btn-auth">
                Đăng nhập
              </Link>
            )}
            <Link
              onClick={() => handleLogout()}
              to="/login"
              className="btn btn-auth"
            >
              Đăng xuất
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
