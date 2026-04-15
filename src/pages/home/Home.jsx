// src/pages/home/Home.jsx
import React from "react";
import { useGetCourseList } from "../../queries/category.queries";
import { Card, Col, Row, Spin, Typography, Button, Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const Home = () => {
  const navigate = useNavigate();
  // 1. Sử dụng hook vừa tạo để lấy dữ liệu
  const { data: courses, isLoading, isError } = useGetCourseList();

  // Xử lý khi đang tải hoặc lỗi
  if (isLoading)
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin size="large" tip="Đang tải khóa học..." />
      </div>
    );
  if (isError)
    return (
      <div style={{ textAlign: "center", marginTop: 50, color: "red" }}>
        Không thể tải danh sách khóa học. Vui lòng thử lại sau.
      </div>
    );

  return (
    <div className="home-page">
      {/* --- BANNER (Phần này có thể làm tĩnh hoặc carousel tùy ý) --- */}
      <div
        style={{
          background: "linear-gradient(to right, #1890ff, #001529)",
          padding: "50px 20px",
          textAlign: "center",
          color: "white",
          marginBottom: "40px",
          borderRadius: "0 0 20px 20px",
        }}
      >
        <Title level={1} style={{ color: "white", marginBottom: 10 }}>
          HỌC LẬP TRÌNH ĐỂ ĐI LÀM
        </Title>
        <Paragraph style={{ color: "rgba(255,255,255,0.8)", fontSize: 18 }}>
          Các khóa học chất lượng cao từ cơ bản đến nâng cao.
        </Paragraph>
        <Button
          size="large"
          ghost
          onClick={() =>
            document
              .getElementById("course-list")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          Xem Ngay
        </Button>
      </div>
      {/* --- DANH SÁCH KHÓA HỌC --- */}
      <div
        id="course-list"
        className="container"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
          Các Khóa Học Mới Nhất
        </Title>

        <Row gutter={[24, 24]}>
          {Array.isArray(courses)
            ? courses?.map((course) => (
                <Col key={course.maKhoaHoc} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={course.tenKhoaHoc}
                        src={course.hinhAnh}
                        style={{
                          height: 160,
                          objectFit: "cover",
                          width: "100%",
                        }}
                        // Xử lý ảnh lỗi nếu link ảnh die
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/300x160?text=Course+Image";
                        }}
                      />
                    }
                    actions={[
                      <Button
                        type="primary"
                        onClick={() => navigate(`/courses/${course.maKhoaHoc}`)}
                      >
                        Xem Chi Tiết
                      </Button>,
                    ]}
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    bodyStyle={{ flex: 1 }} // Để nội dung giãn đều
                  >
                    <Meta
                      title={
                        <div
                          style={{
                            whiteSpace: "normal",
                            height: 44,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {course.tenKhoaHoc}
                        </div>
                      }
                      description={
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: 8,
                              fontSize: 12,
                            }}
                          >
                            <span style={{ color: "#faad14" }}>
                              <UserOutlined /> {course.luotXem} lượt xem
                            </span>
                          </div>
                          <div
                            style={{
                              height: 60,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {course.moTa}
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))
            : null}
        </Row>
      </div>
      <div style={{ height: 50 }}></div> {/* Spacer bottom */}
    </div>
  );
};

export default Home;
