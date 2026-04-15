/* eslint-disable react-hooks/set-state-in-effect */
import { Controller, useForm } from "react-hook-form";
import { useGetCategoriesCode } from "../../../queries/category.queries.js";
import {
  groupOptions,
  themKhoaHocSchema,
} from "../../../schemas/course.schema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker, Input, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Spinner } from "react-bootstrap";

export default function CourseForm({
  onSubmit,
  defaultValues,
  submitText,
  disabledMaKhoaHoc,
}) {
  const { data: categoriesCode, isPending, isError } = useGetCategoriesCode();
  const [fileList, setFileList] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(themKhoaHocSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues?.hinhAnh) {
      setFileList([
        {
          uid: "-1",
          name: defaultValues.hinhAnh.split("/").pop() || "image.jpg",
          status: "done",
          url: defaultValues.hinhAnh,
        },
      ]);
    }
  }, [defaultValues]);

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  if (isPending)
    return (
      <div className="loading-text">
        <Spinner></Spinner> Nội dung đang tải...
      </div>
    );
  if (isError) return <p>Lỗi: {String(isError)}</p>;

  return (
    <form
      onSubmit={handleSubmit((values) =>
        onSubmit(values, reset, fileList, setFileList)
      )}
    >
      <div>
        <label>Mã khóa học</label>
        <Controller
          name="maKhoaHoc"
          control={control}
          render={({ field }) => (
            <Input
              disabled={disabledMaKhoaHoc}
              {...field}
              placeholder="VD: BC01"
            />
          )}
        />

        {errors.maKhoaHoc && (
          <p className="text-danger">{errors.maKhoaHoc.message}</p>
        )}
      </div>
      <div>
        <label>Tên khóa học</label>
        <Controller
          name="tenKhoaHoc"
          control={control}
          render={({ field }) => (
            <Input
              disabled={disabledMaKhoaHoc}
              {...field}
              placeholder="VD: Lập trình React cơ bản"
            />
          )}
        />
        {errors.tenKhoaHoc && (
          <p className="text-danger">{errors.tenKhoaHoc.message}</p>
        )}
      </div>

      <div>
        <label>Mô tả</label>
        <Controller
          name="moTa"
          control={control}
          render={({ field }) => (
            <Input.TextArea {...field} rows={3} placeholder="Nhập mô tả" />
          )}
        />
        {errors.moTa && <p className="text-danger">{errors.moTa.message}</p>}
      </div>

      <div>
        <label>Tải ảnh khóa học</label>
        <Controller
          name="hinhAnh"
          control={control}
          render={({ field }) => (
            <Upload
              accept="image/*"
              maxCount={1}
              showUploadList
              fileList={fileList} // quản lý hiển thị file
              beforeUpload={(file) => {
                setFileList([
                  {
                    uid: file.uid,
                    name: file.name,
                    status: "done",
                    originFileObj: file,
                  },
                ]);
                // thêm file vào list
                field.onChange(file.name); // đồng bộ với RHF
                return false; // ngăn Upload tự upload
              }}
              onRemove={() => {
                setFileList([]); // xóa file khỏi list
                field.onChange(null); // xóa file khỏi RHF
              }}
            >
              <button type="button">Chọn từ máy</button>
            </Upload>
          )}
        />
        {errors.hinhAnh && (
          <p className="text-danger">{errors.hinhAnh.message}</p>
        )}
      </div>

      <div>
        <label>Mã nhóm</label>
        <Controller
          name="maNhom"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              style={{ width: "100%" }}
              placeholder="Chọn nhóm"
              onChange={(value) => field.onChange(value)}
            >
              {groupOptions.map((gp) => (
                <Select.Option key={gp} value={gp}>
                  {gp}
                </Select.Option>
              ))}
            </Select>
          )}
        />
        {errors.maNhom && (
          <p className="text-danger">{errors.maNhom.message}</p>
        )}
      </div>

      <div>
        <label>Ngày tạo</label>
        <Controller
          name="ngayTao"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              value={field.value ? dayjs(field.value, "DD/MM/YYYY") : null}
              format="DD/MM/YYYY"
              style={{ width: "100%" }}
              onChange={(date) =>
                field.onChange(date ? date.format("DD/MM/YYYY") : "")
              }
            />
          )}
        />
        {errors.ngayTao && (
          <p className="text-danger">{errors.ngayTao.message}</p>
        )}
      </div>
      <div>
        <label>Mã danh mục khóa học</label>
        <Controller
          name="maDanhMucKhoaHoc"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              style={{ width: "100%" }}
              placeholder="Chọn nhóm"
              onChange={(value) => field.onChange(value)}
            >
              {categoriesCode?.map((item) => (
                <Select.Option key={item.maDanhMuc} value={item.maDanhMuc}>
                  {item.maDanhMuc}
                </Select.Option>
              ))}
            </Select>
          )}
        />
        {errors.maDanhMucKhoaHoc && (
          <p className="text-danger">{errors.maDanhMucKhoaHoc.message}</p>
        )}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? <Spinner></Spinner> : ""}
        {submitText}
      </button>
    </form>
  );
}
