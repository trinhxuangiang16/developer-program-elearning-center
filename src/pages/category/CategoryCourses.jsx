import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetCoursesByCategory } from "../../queries/category.queries";
import { Card, Spin, Typography, Row, Col, Empty, Button, Rate } from "antd";
import { EyeOutlined, ArrowRightOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;

export default function CategoryCourses() {
  const { maDanhMuc } = useParams(); // Lấy mã từ URL (ví dụ: BackEnd)
  const { data: courses, isLoading } = useGetCoursesByCategory(maDanhMuc);

  if (isLoading)
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <Spin size="large" />
      </div>
    );

  return (
    <div style={{ padding: "40px 20px", maxWidth: 1200, margin: "0 auto" }}>
      <div
        style={{
          marginBottom: 30,
          borderBottom: "1px solid #f0f0f0",
          paddingBottom: 20,
        }}
      >
        <Title level={2}>
          Khóa học thuộc danh mục:{" "}
          <span style={{ color: "#1890ff" }}>{maDanhMuc}</span>
        </Title>
        <Text type="secondary">
          Tìm thấy {courses?.length || 0} khóa học phù hợp
        </Text>
      </div>

      {!courses || courses.length === 0 ? (
        <Empty description="Hiện chưa có khóa học nào trong danh mục này" />
      ) : (
        <Row gutter={[24, 24]}>
          {courses.map((course) => (
            <Col xs={24} sm={12} md={8} lg={6} key={course.maKhoaHoc}>
              <Link to={`/khoa-hoc/${course.maKhoaHoc}`}>
                <Card
                  hoverable
                  cover={
                    <div style={{ overflow: "hidden", height: 180 }}>
                      <img
                        alt={course.tenKhoaHoc}
                        src={course.hinhAnh}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "scale(1.1)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/300x200?text=No+Image";
                        }}
                      />
                    </div>
                  }
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  bodyStyle={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Meta
                    title={
                      <div
                        style={{
                          whiteSpace: "normal",
                          height: 50,
                          overflow: "hidden",
                        }}
                      >
                        {course.tenKhoaHoc}
                      </div>
                    }
                    description={
                      <Paragraph
                        ellipsis={{ rows: 2 }}
                        style={{ height: 44, marginBottom: 10 }}
                      >
                        {course.moTa}
                      </Paragraph>
                    }
                  />

                  <div style={{ marginTop: "auto" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 12,
                      }}
                    >
                      <Rate
                        disabled
                        defaultValue={4.5}
                        style={{ fontSize: 12 }}
                      />
                      <Space size={4} style={{ fontSize: 12, color: "#888" }}>
                        <EyeOutlined /> {course.luotXem}
                      </Space>
                    </div>
                    <Button
                      type="primary"
                      block
                      icon={<ArrowRightOutlined />}
                      ghost
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

// Cần import Space ở đầu file nếu dùng (tôi đã thêm trong code)
import { Space } from "antd";
