import React from "react";
import { Layout, Row, Col, Typography, Space, Divider } from "antd";
import {
  FacebookFilled,
  YoutubeFilled,
  InstagramFilled,
  PhoneFilled,
  MailFilled,
  EnvironmentFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

// Sử dụng Footer của Ant Design
const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const Footer = () => {
  return (
    <AntFooter
      style={{
        backgroundColor: "#001529",
        color: "#fff",
        padding: "60px 24px 24px",
        height: "auto",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <Row gutter={[40, 40]}>
          {/* CỘT 1: THÔNG TIN CHUNG */}
          <Col xs={24} md={8}>
            <div style={{ marginBottom: 20 }}>
              <Link
                to="/"
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                <span style={{ color: "#1890ff" }}>Cyber</span>My
              </Link>
            </div>
            <Text
              style={{
                color: "rgba(255,255,255,0.65)",
                display: "block",
                marginBottom: 20,
                lineHeight: 1.8,
              }}
            >
              Hệ thống đào tạo lập trình chuyên nghiệp. <br />
              Chúng tôi cam kết chất lượng đầu ra và hỗ trợ việc làm trọn đời
              cho học viên.
            </Text>
            <Space size="middle">
              <a href="#" style={iconStyle}>
                <FacebookFilled />
              </a>
              <a href="#" style={iconStyle}>
                <YoutubeFilled />
              </a>
              <a href="#" style={iconStyle}>
                <InstagramFilled />
              </a>
            </Space>
          </Col>

          {/* CỘT 2: LIÊN KẾT */}
          <Col xs={24} md={8}>
            <Title level={4} style={{ color: "#fff", marginBottom: 20 }}>
              Liên Kết Nhanh
            </Title>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <Link to="/danh-muc-khoa-hoc" style={linkStyle}>
                › Danh mục khóa học
              </Link>
              <Link to="/khoa-hoc" style={linkStyle}>
                › Tất cả khóa học
              </Link>
              <Link to="/register" style={linkStyle}>
                › Đăng ký tài khoản
              </Link>
              <a href="#" style={linkStyle}>
                › Chính sách bảo mật
              </a>
            </div>
          </Col>

          {/* CỘT 3: LIÊN HỆ */}
          <Col xs={24} md={8}>
            <Title level={4} style={{ color: "#fff", marginBottom: 20 }}>
              Liên Hệ
            </Title>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div style={contactItemStyle}>
                <EnvironmentFilled
                  style={{ color: "#1890ff", fontSize: 20, marginRight: 10 }}
                />
                <Text style={{ color: "rgba(255,255,255,0.65)" }}>
                  123 Đ. Cao Thắng, Q.3, TP.HCM
                </Text>
              </div>
              <div style={contactItemStyle}>
                <PhoneFilled
                  style={{ color: "#1890ff", fontSize: 20, marginRight: 10 }}
                />
                <Text style={{ color: "rgba(255,255,255,0.65)" }}>
                  096.105.1014
                </Text>
              </div>
              <div style={contactItemStyle}>
                <MailFilled
                  style={{ color: "#1890ff", fontSize: 20, marginRight: 10 }}
                />
                <Text style={{ color: "rgba(255,255,255,0.65)" }}>
                  support@cybermy.edu.vn
                </Text>
              </div>
            </Space>
          </Col>
        </Row>

        <Divider
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            margin: "40px 0 20px",
          }}
        />

        <div style={{ textAlign: "center" }}>
          <Text style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>
            © 2024 CyberMy. All rights reserved.
          </Text>
        </div>
      </div>
    </AntFooter>
  );
};

// --- CSS IN JS (Styles) ---
const linkStyle = {
  color: "rgba(255,255,255,0.65)",
  fontSize: "15px",
  transition: "all 0.3s",
  textDecoration: "none",
  display: "block",
};

const iconStyle = {
  fontSize: "24px",
  color: "#fff",
  opacity: 0.8,
  transition: "opacity 0.3s",
};

const contactItemStyle = {
  display: "flex",
  alignItems: "flex-start",
};

export default Footer;
