//Dashboard admin (sidebar/menu/quản trị)
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import SideBar from "./SideBar.jsx";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Navbar />
      <main
        className="content-admin"
        style={{ minHeight: "calc(100vh - 120px)" }}
      >
        <SideBar />

        <div className="children-admin">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
