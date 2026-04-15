import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, message, Card, Typography } from "antd";
import { loginSchema } from "../../schemas/auth.schema.js";
import { useLoginMutation } from "../../queries/user.queries.js";
import { useDispatch } from "react-redux";
import { loginAction } from "../../feature/auth/authSlice.js";
import { useNavigate, Link } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate, isPending } = useLoginMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { taiKhoan: "", matKhau: "" },
  });

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        // Lưu ý: response của axios thường bọc data trong property 'data'
        // Nhưng tùy cấu hình interceptor. Nếu bạn nhận được trực tiếp data user thì dùng data.
        // Ở đây giả sử API trả về object user chứa accessToken

        const userData = response.data || response;

        message.success("Đăng nhập thành công!");

        // 1. Lưu vào Redux & LocalStorage (thông qua action đã sửa ở bước 2)
        dispatch(loginAction(userData));

        // 2. Điều hướng
        if (userData.maLoaiNguoiDung === "GV") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      },
      onError: (error) => {
        console.error(error);
        message.error(
          typeof error.response?.data === "string"
            ? error.response.data
            : "Tài khoản hoặc mật khẩu không đúng!"
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
      <Card style={{ width: 400, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <Title level={2}>Đăng Nhập</Title>
          <Text type="secondary">Chào mừng bạn quay trở lại!</Text>
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
          <div style={{ marginBottom: 24 }}>
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

          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            block
            size="large"
            style={{ marginBottom: 16 }}
          >
            Đăng nhập
          </Button>

          <div style={{ textAlign: "center" }}>
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
