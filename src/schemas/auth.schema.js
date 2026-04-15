//các file này định nghĩa zod cho form
import { z } from "zod";

export const loginSchema = z.object({
  taiKhoan: z
    .string()
    .trim()
    .min(3, "Tài khoản phải có ít nhất 3 ký tự")
    .max(50, "Tài khoản tối đa 50 ký tự"),

  matKhau: z
    .string()
    .trim()
    .min(3, "Mật khẩu phải có ít nhất 3 ký tự")
    .max(50, "Mật khẩu tối đa 50 ký tự"),
});

export const registerSchema = z.object({
  taiKhoan: z.string().min(1, "Tài khoản không được để trống"),
  matKhau: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  hoTen: z.string().min(1, "Họ tên không được để trống"),
  soDT: z.string().regex(/^0\d{9,10}$/, "Số điện thoại không hợp lệ"),
  maNhom: z.string().default("GP01"),
  email: z.string().email("Email không hợp lệ"),
});

const loaiNguoiDung = ["GV", "HV"];

export const createUserSchema = z.object({
  taiKhoan: z.string().min(3, "Tài khoản phải có ít nhất 3 ký tự"),
  matKhau: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  hoTen: z.string().min(1, "Họ tên không được để trống"),
  soDT: z
    .string()
    .min(9, "Số điện thoại tối thiểu 9 số")
    .max(11, "Số điện thoại tối đa 11 số")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa số"),
  email: z.string().email("Email không hợp lệ"),
  maLoaiNguoiDung: z.enum(loaiNguoiDung, {
    errorMap: () => ({ message: "Chọn loại người dùng" }),
  }),
  maNhom: z.string(),
});

//tìm kiếm
export const searchUserSchema = z.object({
  taiKhoan: z.string().trim().min(1, "Vui lòng nhập thông tin tìm kiếm"),
});
