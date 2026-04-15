import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCourseDetail } from "../../queries/category.queries.js";
import { useRegisterCourseMutation } from "../../queries/enroll.queries"; // Hoặc import từ user.queries nếu bạn gộp file
import { 
  Button, message, Spin, Row, Col, Typography, 
  Card, Image, Tag, Rate, Divider, Descriptions 
} from "antd";
import { 
  EyeOutlined, UserOutlined, ClockCircleOutlined, 
  CheckCircleOutlined, BookOutlined 
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Title, Paragraph, Text } = Typography;

export default function CourseDetail() {
  const { id } = useParams(); // Lấy mã khóa học từ URL
  const navigate = useNavigate();
  
  // Lấy thông tin User từ Redux để biết ai đang đăng ký
  const { user } = useSelector((state) => state.auth); 

  // 1. Hook lấy chi tiết khóa học
  const { data: course, isLoading, isError } = useGetCourseDetail(id);
  
  // 2. Hook đăng ký khóa học
  const { mutate: registerCourse, isPending: isRegistering } = useRegisterCourseMutation();

  // Scroll lên đầu trang khi vào trang chi tiết
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleRegister = () => {
    // Kiểm tra đăng nhập
    if (!user) {
      message.warning("Vui lòng đăng nhập để đăng ký khóa học!");
      navigate("/login"); // Chuyển sang trang login
      return;
    }

    // Chuẩn bị dữ liệu gửi lên API
    // API yêu cầu object gồm: { maKhoaHoc, taiKhoan }
    const payload = {
      maKhoaHoc: id,
      taiKhoan: user.taiKhoan
    };

    // Gọi API
    registerCourse(payload, {
      onSuccess: (res) => {
        message.success(typeof res === 'string' ? res : "Đăng ký thành công! Bạn có thể vào học ngay.");
        // Sau khi đăng ký thành công, queryClient (trong user.queries.js) 
        // sẽ tự động làm mới 'userProfile', nên khóa học sẽ hiện ở trang Profile.
        
        // Tùy chọn: Chuyển hướng người dùng sang trang Profile để xem kết quả
        // navigate("/profile");
      },
      onError: (err) => {
        console.error("Lỗi đăng ký:", err);
        message.error(err.response?.data || "Đăng ký thất bại. Vui lòng thử lại!");
      },
    });
  };

  if (isLoading) return (
    <div style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spin size="large" tip="Đang tải thông tin khóa học..." />
    </div>
  );

  if (isError || !course) return (
    <div style={{ textAlign: 'center', padding: 50 }}>
      <Title level={4}>Không tìm thấy khóa học này!</Title>
      <Button onClick={() => navigate('/')}>Quay lại trang chủ</Button>
    </div>
  );

  return (
    <div className="course-detail-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
      <Card bordered={false} style={{ boxShadow: '0 2px 8px #f0f1f2', borderRadius: 16 }}>
        <Row gutter={[40, 40]}>
          {/* CỘT TRÁI: HÌNH ẢNH */}
          <Col xs={24} md={10}>
            <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <Image
                src={course.hinhAnh}
                alt={course.tenKhoaHoc}
                width="100%"
                height={300}
                style={{ objectFit: 'cover' }}
                fallback="https://via.placeholder.com/500x300?text=CyberSoft+Academy"
              />
            </div>
            <div style={{ marginTop: 20, textAlign: 'center' }}>
               <Title level={3} style={{ color: '#faad14', margin: 0 }}>
                  500.000đ <Text delete type="secondary" style={{ fontSize: 16 }}>1.200.000đ</Text>
               </Title>
            </div>
            <Button 
              type="primary" 
              size="large" 
              block 
              style={{ marginTop: 20, height: 50, fontSize: 18, fontWeight: 'bold', borderRadius: 8 }}
              onClick={handleRegister}
              loading={isRegistering}
              icon={<CheckCircleOutlined />}
            >
              ĐĂNG KÝ NGAY
            </Button>
            <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: 10, fontSize: 12 }}>
              * Hoàn tiền trong 7 ngày nếu không hài lòng
            </Text>
          </Col>

          {/* CỘT PHẢI: THÔNG TIN */}
          <Col xs={24} md={14}>
            <Title level={2} style={{ marginBottom: 10 }}>{course.tenKhoaHoc}</Title>
            
            <div style={{ marginBottom: 20 }}>
              <Tag color="blue" style={{ padding: '4px 10px' }}>Lập trình</Tag>
              <Tag color="cyan" style={{ padding: '4px 10px' }}>{course.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</Tag>
              <Rate disabled defaultValue={4.5} style={{ fontSize: 14, marginLeft: 10 }} />
              <Text type="secondary" style={{ marginLeft: 8 }}>(1.234 đánh giá)</Text>
            </div>

            <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color: '#555' }}>
              {course.moTa || "Khóa học này sẽ cung cấp cho bạn những kiến thức nền tảng vững chắc nhất..."}
            </Paragraph>

            <Divider />

            <Descriptions title="Thông tin chi tiết" column={1} labelStyle={{ fontWeight: 'bold' }}>
               <Descriptions.Item label={<><UserOutlined /> Giảng viên</>}>
                 {course.nguoiTao?.hoTen || "CyberSoft Mentor"}
               </Descriptions.Item>
               <Descriptions.Item label={<><ClockCircleOutlined /> Thời lượng</>}>
                 32 giờ học video + 10 bài tập lớn
               </Descriptions.Item>
               <Descriptions.Item label={<><BookOutlined /> Số lượng bài học</>}>
                 45 bài giảng
               </Descriptions.Item>
               <Descriptions.Item label={<><EyeOutlined /> Lượt xem</>}>
                 {course.luotXem} học viên
               </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      {/* PHẦN NỘI DUNG CHI TIẾT DƯỚI (Mô phỏng) */}
      <div style={{ marginTop: 40 }}>
        <Title level={3}>Nội dung khóa học</Title>
        <Card>
          <Paragraph>
            <ul>
              <li>Chương 1: Giới thiệu tổng quan về khóa học</li>
              <li>Chương 2: Cài đặt môi trường và công cụ cần thiết</li>
              <li>Chương 3: Kiến thức cơ bản và nâng cao</li>
              <li>Chương 4: Thực hành dự án thực tế</li>
              <li>Chương 5: Tổng kết và định hướng nghề nghiệp</li>
            </ul>
          </Paragraph>
        </Card>
      </div>
    </div>
  );
}