import React from "react";
import { Layout, Menu, Button, Space, Avatar, Dropdown, message } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  UserOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  HomeOutlined,
  ReadOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../feature/auth/authSlice";

const { Header: AntHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Lấy user từ Redux
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutAction());
    message.success("Đăng xuất thành công!");
    navigate("/login");
  };

  // --- SỬA LỖI Ở ĐÂY: Khai báo items dưới dạng mảng (Array) ---
  const dropdownItems = [
    {
      key: "profile",
      label: <Link to="/profile">Hồ sơ cá nhân</Link>,
      icon: <UserOutlined />,
    },
    // Kiểm tra nếu là Giáo vụ (GV) thì thêm nút Admin
    ...(user?.maLoaiNguoiDung === "GV"
      ? [
          {
            key: "admin",
            label: <Link to="/admin">Trang quản trị</Link>,
            icon: <SafetyCertificateOutlined />,
            danger: false, // Để màu bình thường
          },
        ]
      : []),
    {
      type: "divider",
    },
    {
      key: "logout",
      label: <span onClick={handleLogout}>Đăng xuất</span>,
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  // Menu chính (Trang chủ, Danh mục...)
  const mainMenuItems = [
    { key: "/", label: <Link to="/">Trang chủ</Link>, icon: <HomeOutlined /> },
    {
      key: "/danh-muc-khoa-hoc",
      label: <Link to="/danh-muc-khoa-hoc">Danh mục</Link>,
      icon: <AppstoreOutlined />,
    },
    {
      key: "/khoa-hoc",
      label: <Link to="/khoa-hoc">Khóa học</Link>,
      icon: <ReadOutlined />,
    },
  ];

  return (
    <AntHeader
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        boxShadow: "0 2px 8px #f0f1f2",
        padding: "0 24px",
      }}
    >
      {/* 1. LOGO */}
      <div className="logo" style={{ marginRight: 40 }}>
        <Link
          to="/"
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#1890ff",
            textDecoration: "none",
          }}
        >
          <span style={{ color: "#001529" }}>Cyber</span>My
        </Link>
      </div>

      {/* 2. MAIN MENU */}
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={mainMenuItems}
        style={{ flex: 1, borderBottom: "none", background: "transparent" }}
      />

      {/* 3. USER ACTIONS */}
      <div className="auth-actions">
        {user ? (
          // --- SỬA LỖI: Dùng prop menu={{ items }} thay vì overlay ---
          <Dropdown
            menu={{ items: dropdownItems }}
            placement="bottomRight"
            arrow
            trigger={["click"]}
          >
            <Space style={{ cursor: "pointer", padding: "8px 0" }}>
              <Avatar
                size="large"
                src={user.hinhAnh}
                icon={<UserOutlined />}
                style={{ backgroundColor: "#1890ff" }}
              />
              {/* Hiển thị Tên hoặc Tài khoản nếu chưa có tên */}
              <span
                style={{
                  fontWeight: 500,
                  color: "#001529",
                  display: "inline-block",
                }}
              >
                {user.hoTen || user.taiKhoan || "Người dùng"}
              </span>
            </Space>
          </Dropdown>
        ) : (
          <Space>
            <Button type="text" onClick={() => navigate("/login")}>
              Đăng nhập
            </Button>
            <Button
              type="primary"
              shape="round"
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </Button>
          </Space>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;
