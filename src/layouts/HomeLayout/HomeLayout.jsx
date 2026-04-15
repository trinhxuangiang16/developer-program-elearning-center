import React from "react";
import { Layout } from "antd"; // Nhớ import Layout từ antd
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// Destructuring Content từ Layout
const { Content } = Layout;

const HomeLayout = () => {
  return (
    // minHeight: 100vh giúp trang luôn cao bằng màn hình
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#001529",
      }}
    >
      <Header />

      {/* flex: 1 giúp Content giãn nở, đẩy Footer xuống đáy */}
      <Content style={{ flex: "1", backgroundColor: "#f0f2f5" }}>
        <Outlet />
      </Content>

      <Footer />
    </Layout>
  );
};

export default HomeLayout;
