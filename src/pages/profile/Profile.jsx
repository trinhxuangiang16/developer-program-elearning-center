import React, { useEffect } from "react";
// Import các hooks từ file queries đã có sẵn
import {
  useUserProfile,
  useUpdateProfileMutation,
  useCancelCourseMutation,
} from "../../queries/user.queries";

// Import thư viện giao diện
import {
  Spin,
  Tabs,
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Avatar,
  Descriptions,
  Tag,
  Empty,
  Popconfirm,
  message,
} from "antd";
import {
  UserOutlined,
  BookOutlined,
  EditOutlined,
  DeleteOutlined,
  SafetyCertificateOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Profile() {
  const navigate = useNavigate();

  // 1. Lấy dữ liệu Profile từ hook đã có
  const { data: userProfile, isLoading, isError, refetch } = useUserProfile();

  // 2. Các mutation xử lý Cập nhật & Hủy khóa học
  const updateMutation = useUpdateProfileMutation();
  const cancelCourseMutation = useCancelCourseMutation();

  // 3. Setup Form quản lý dữ liệu nhập vào
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDT: "",
      maLoaiNguoiDung: "HV", // Mặc định
      maNhom: "GP01",       // Mặc định
    },
  });

  // Khi API tải xong dữ liệu user, điền tự động vào Form
  useEffect(() => {
    if (userProfile) {
      reset({
        taiKhoan: userProfile.taiKhoan,
        matKhau: "", // Để trống mật khẩu để người dùng tự nhập khi cần đổi
        hoTen: userProfile.hoTen,
        email: userProfile.email,
        soDT: userProfile.soDT,
        maLoaiNguoiDung: userProfile.maLoaiNguoiDung,
        maNhom: "GP01",
      });
    }
  }, [userProfile, reset]);

  // --- XỬ LÝ SỰ KIỆN ---

  // Xử lý khi nhấn nút "Lưu thay đổi"
  const onSubmitUpdate = (values) => {
    // API yêu cầu mật khẩu xác nhận
    if (!values.matKhau) {
      message.error("Vui lòng nhập mật khẩu để xác nhận cập nhật!");
      return;
    }

    updateMutation.mutate(values, {
      onSuccess: () => {
        // Cập nhật xong thì tải lại thông tin mới nhất
        refetch();
      },
    });
  };

  // Xử lý khi nhấn nút "Hủy đăng ký"
  const handleUnregister = (maKhoaHoc) => {
    cancelCourseMutation.mutate(
      {
        maKhoaHoc: maKhoaHoc,
        taiKhoan: userProfile.taiKhoan,
      },
      {
        onSuccess: () => {
          refetch(); // Tải lại danh sách khóa học sau khi hủy
        },
      }
    );
  };

  // --- GIAO DIỆN ---

  // Hiển thị Loading khi đang tải
  if (isLoading)
    return (
      <div style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Spin size="large" tip="Đang tải hồ sơ..." />
      </div>
    );

  // Hiển thị lỗi nếu không lấy được thông tin (ví dụ hết hạn token)
  if (isError)
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <Title level={4}>Phiên đăng nhập đã hết hạn.</Title>
        <Button type="primary" onClick={() => navigate("/login")}>
          Đăng nhập lại
        </Button>
      </div>
    );

  // TAB 1: Giao diện Thông tin cá nhân
  const PersonalInfoTab = () => (
    <Row gutter={[40, 40]}>
      {/* Cột trái: Card hiển thị Avatar & Thông tin tóm tắt */}
      <Col xs={24} md={8}>
        <Card
          hoverable
          style={{ textAlign: "center", borderRadius: 12, overflow: "hidden" }}
        >
          <div style={{ height: 100, background: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)", marginBottom: -50 }}></div>
          <Avatar
            size={100}
            icon={<UserOutlined />}
            src={userProfile?.hinhAnh}
            style={{ backgroundColor: "#fff", border: "4px solid #fff", color: "#1890ff", fontSize: 40 }}
          />
          <div style={{ marginTop: 15, marginBottom: 20 }}>
            <Title level={4} style={{ marginBottom: 5 }}>
              {userProfile?.hoTen}
            </Title>
            <Tag color="blue" icon={<SafetyCertificateOutlined />}>
              {userProfile?.maLoaiNguoiDung === "GV" ? "Giáo vụ" : "Học viên"}
            </Tag>
          </div>

          <Descriptions column={1} bordered size="small" style={{ textAlign: "left" }}>
            <Descriptions.Item label="Tài khoản">
              <b>{userProfile?.taiKhoan}</b>
            </Descriptions.Item>
            <Descriptions.Item label="Email">{userProfile?.email}</Descriptions.Item>
            <Descriptions.Item label="Số ĐT">{userProfile?.soDT}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>

      {/* Cột phải: Form cập nhật thông tin */}
      <Col xs={24} md={16}>
        <Card title="Cập nhật hồ sơ" bordered={false} style={{ borderRadius: 12, boxShadow: "0 2px 8px #f0f1f2" }}>
          <form onSubmit={handleSubmit(onSubmitUpdate)}>
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <label>Họ và tên</label>
                <Controller
                  name="hoTen"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} prefix={<UserOutlined />} size="large" placeholder="Họ tên" />
                  )}
                />
              </Col>

              <Col xs={24} md={12}>
                <label>Email</label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} prefix={<MailOutlined />} size="large" placeholder="Email" />
                  )}
                />
              </Col>

              <Col xs={24} md={12}>
                <label>Số điện thoại</label>
                <Controller
                  name="soDT"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} prefix={<PhoneOutlined />} size="large" placeholder="Số điện thoại" />
                  )}
                />
              </Col>

              <Col span={24}>
                <label>
                  Mật khẩu <span style={{ color: "red" }}>*</span>
                </label>
                <Controller
                  name="matKhau"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      size="large"
                      placeholder="Nhập mật khẩu để xác nhận thay đổi"
                    />
                  )}
                />
              </Col>

              <Col span={24}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<EditOutlined />}
                  loading={updateMutation.isPending}
                  size="large"
                  style={{ marginTop: 10 }}
                >
                  Lưu thay đổi
                </Button>
              </Col>
            </Row>
          </form>
        </Card>
      </Col>
    </Row>
  );

  // TAB 2: Giao diện Khóa học của tôi
  const MyCoursesTab = () => (
    <div>
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={4} style={{ margin: 0 }}>
          Khóa học đã đăng ký <Tag color="#108ee9">{userProfile?.chiTietKhoaHocGhiDanh?.length || 0}</Tag>
        </Title>
        <Button onClick={() => navigate("/danh-muc-khoa-hoc")}>Đăng ký thêm</Button>
      </div>

      {!userProfile?.chiTietKhoaHocGhiDanh?.length ? (
        <Empty description="Bạn chưa đăng ký khóa học nào." />
      ) : (
        <Row gutter={[24, 24]}>
          {userProfile.chiTietKhoaHocGhiDanh.map((course) => (
            <Col xs={24} sm={12} lg={8} key={course.maKhoaHoc}>
              <Card
                hoverable
                style={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 12, overflow: "hidden" }}
                bodyStyle={{ flex: 1, padding: 16 }}
                cover={
                  <img
                    alt={course.tenKhoaHoc}
                    src={course.hinhAnh}
                    style={{ height: 160, objectFit: "cover" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x200?text=Course+Image";
                    }}
                  />
                }
                actions={[
                  <Button type="link" onClick={() => message.info("Chức năng vào học đang phát triển")}>
                    Vào học
                  </Button>,
                  <Popconfirm
                    title="Hủy đăng ký?"
                    description={`Bạn có chắc muốn hủy khóa học này không?`}
                    onConfirm={() => handleUnregister(course.maKhoaHoc)}
                    okText="Đồng ý"
                    cancelText="Không"
                    okButtonProps={{ danger: true }}
                  >
                    <Button type="text" danger icon={<DeleteOutlined />}>
                      Hủy
                    </Button>
                  </Popconfirm>,
                ]}
              >
                <Card.Meta
                  title={
                    <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={course.tenKhoaHoc}>
                      {course.tenKhoaHoc}
                    </div>
                  }
                  description={
                    <div style={{ height: 44, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      {course.moTa || "Mô tả khóa học đang được cập nhật..."}
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px", minHeight: "80vh" }}>
      <Title level={2} style={{ marginBottom: 30, textAlign: "center" }}>
        Hồ Sơ Của Bạn
      </Title>

      <Tabs
        defaultActiveKey="1"
        type="card"
        size="large"
        items={[
          {
            key: "1",
            label: (
              <span>
                <UserOutlined /> Thông tin cá nhân
              </span>
            ),
            children: <PersonalInfoTab />,
          },
          {
            key: "2",
            label: (
              <span>
                <BookOutlined /> Khóa học của tôi
              </span>
            ),
            children: <MyCoursesTab />,
          },
        ]}
      />
    </div>
  );
}