import React from "react";
import { useGetCategoriesCode } from "../../queries/category.queries";
import { Card, Spin, Typography, Row, Col } from "antd";
import { Link } from "react-router-dom";
import {
  CodeOutlined,
  LaptopOutlined,
  MobileOutlined,
  ApiOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

export default function CategoryList() {
  const { data: categories, isLoading } = useGetCategoriesCode();

  if (isLoading)
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <Spin size="large" />
      </div>
    );

  // Hàm random icon cho sinh động (vì API không trả về icon)
  const getIcon = (index) => {
    const icons = [
      <CodeOutlined />,
      <LaptopOutlined />,
      <MobileOutlined />,
      <ApiOutlined />,
      <GlobalOutlined />,
    ];
    return icons[index % icons.length];
  };

  // Hàm random màu nền
  const getColor = (index) => {
    const colors = ["#1890ff", "#52c41a", "#faad14", "#eb2f96", "#722ed1"];
    return colors[index % colors.length];
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: 1200, margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
        Danh Mục Khóa Học
      </Title>

      <Row gutter={[24, 24]}>
        {categories?.map((item, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.maDanhMuc}>
            <Link to={`/danh-muc/${item.maDanhMuc}`}>
              <Card
                hoverable
                style={{
                  textAlign: "center",
                  height: "100%",
                  borderRadius: 12,
                }}
                bodyStyle={{ padding: 30 }}
              >
                <div
                  style={{
                    fontSize: 40,
                    color: getColor(index),
                    marginBottom: 16,
                    background: `${getColor(index)}15`, // Màu nhạt 15%
                    width: 80,
                    height: 80,
                    lineHeight: "80px",
                    borderRadius: "50%",
                    margin: "0 auto",
                  }}
                >
                  {getIcon(index)}
                </div>
                <Title level={4} style={{ marginBottom: 0 }}>
                  {item.tenDanhMuc}
                </Title>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}
