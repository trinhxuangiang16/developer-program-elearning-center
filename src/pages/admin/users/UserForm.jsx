import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";

import { Input, Select } from "antd";
import { createUserSchema } from "../../../schemas/auth.schema.js";

export default function UserForm({
  defaultValues,
  onSubmit,
  submitText,
  disabledTaiKhoan,
}) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(values, reset))}>
      <div>
        <label>Tài khoản</label>
        <Controller
          name="taiKhoan"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Nhập tài khoản"
              disabled={disabledTaiKhoan}
            />
          )}
        />
        {errors.taiKhoan && (
          <p className="text-danger">{errors.taiKhoan.message}</p>
        )}
      </div>

      <div>
        <label>Mật khẩu</label>
        <Controller
          name="matKhau"
          control={control}
          render={({ field }) => (
            <Input.Password {...field} placeholder="Nhập mật khẩu" />
          )}
        />
        {errors.matKhau && (
          <p className="text-danger">{errors.matKhau.message}</p>
        )}
      </div>

      <div>
        <label>Họ tên</label>
        <Controller
          name="hoTen"
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder="Nhập họ và tên" />
          )}
        />
        {errors.hoTen && <p className="text-danger">{errors.hoTen.message}</p>}
      </div>

      <div>
        <label>Số điện thoại</label>
        <Controller
          name="soDT"
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder="Nhập số điện thoại" />
          )}
        />
        {errors.soDT && <p className="text-danger">{errors.soDT.message}</p>}
      </div>

      <div>
        <label>Loại người dùng</label>
        <Controller
          name="maLoaiNguoiDung"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Chọn loại người dùng"
              style={{ width: "100%" }}
            >
              <Select.Option value="HV">Học viên</Select.Option>
              <Select.Option value="GV">Giáo viên</Select.Option>
            </Select>
          )}
        />
        {errors.maLoaiNguoiDung && (
          <p className="text-danger">{errors.maLoaiNguoiDung.message}</p>
        )}
      </div>
      <div>
        <label>Mã nhóm</label>
        <Controller
          name="maNhom"
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder="Nhập mã nhóm" />
          )}
        />
        {errors.soDT && <p className="text-danger">{errors.soDT.message}</p>}
      </div>
      <div>
        <label>Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder="Nhập số điện thoại" />
          )}
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </div>

      <button type="submit">{submitText}</button>
    </form>
  );
}
