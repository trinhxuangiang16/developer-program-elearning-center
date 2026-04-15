import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, message, Card, Typography } from "antd";
import { registerSchema } from "../../schemas/auth.schema.js";
import { useRegisterMutation } from "../../queries/user.queries.js";
import { useNavigate, Link } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Register() {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegisterMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDT: "",
      maNhom: "GP01", // Mặc định mã nhóm
    },
  });

  const onSubmit = (values) => {
    // API yêu cầu đúng định dạng, đảm bảo maNhom luôn có
    const payload = { ...values, maNhom: "GP01" };

    mutate(payload, {
      onSuccess: () => {
        message.success("Đăng ký thành công! Vui lòng đăng nhập.");
        navigate("/login");
      },
      onError: (error) => {
        message.error(
          error.response?.data || "Đăng ký thất bại. Vui lòng thử lại."
        );
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card style={{ width: 500, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Title level={2}>Đăng Ký</Title>
          <Text type="secondary">
            Tạo tài khoản để bắt đầu học ngay hôm nay
          </Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Tài khoản */}
          <div style={{ marginBottom: 16 }}>
            <Controller
              name="taiKhoan"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<UserOutlined />}
                  placeholder="Tài khoản"
                  size="large"
                />
              )}
            />
            {errors.taiKhoan && (
              <span style={{ color: "red", fontSize: 12 }}>
                {errors.taiKhoan.message}
              </span>
            )}
          </div>

          {/* Mật khẩu */}
          <div style={{ marginBottom: 16 }}>
            <Controller
              name="matKhau"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu"
                  size="large"
                />
              )}
            />
            {errors.matKhau && (
              <span style={{ color: "red", fontSize: 12 }}>
                {errors.matKhau.message}
              </span>
            )}
          </div>

          {/* Họ tên */}
          <div style={{ marginBottom: 16 }}>
            <Controller
              name="hoTen"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<IdcardOutlined />}
                  placeholder="Họ tên"
                  size="large"
                />
              )}
            />
            {errors.hoTen && (
              <span style={{ color: "red", fontSize: 12 }}>
                {errors.hoTen.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<MailOutlined />}
                  placeholder="Email"
                  size="large"
                />
              )}
            />
            {errors.email && (
              <span style={{ color: "red", fontSize: 12 }}>
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Số điện thoại */}
          <div style={{ marginBottom: 24 }}>
            <Controller
              name="soDT"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<PhoneOutlined />}
                  placeholder="Số điện thoại"
                  size="large"
                />
              )}
            />
            {errors.soDT && (
              <span style={{ color: "red", fontSize: 12 }}>
                {errors.soDT.message}
              </span>
            )}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            block
            size="large"
            style={{ marginBottom: 16 }}
          >
            Đăng Ký
          </Button>

          <div style={{ textAlign: "center" }}>
            Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
