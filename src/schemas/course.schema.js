import z from "zod";

export const groupOptions = [
  "GP01",
  "GP02",
  "GP03",
  "GP04",
  "GP05",
  "GP06",
  "GP07",
  "GP08",
  "GP09",
  "GP10",
  "GP11",
  "GP12",
  "GP13",
  "GP14",
  "GP15",
];

export const themKhoaHocSchema = z.object({
  maKhoaHoc: z.string().nonempty("Mã khóa học không được để trống"),
  tenKhoaHoc: z.string().nonempty("Tên khóa học không được để trống"),
  moTa: z.string().nonempty("Mô tả không được để trống"),
  ngayTao: z
    .string()
    .nonempty("Ngày tạo không được để trống")
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Ngày tạo phải đúng định dạng DD/MM/YYYY",
    ),
  maDanhMucKhoaHoc: z.string().nonempty("Danh mục không được để trống"),
  taiKhoanNguoiTao: z.string(),
  hinhAnh: z.string().nonempty("Hình ảnh không được để trống"),
  biDanh: z.string().optional(),
  luotXem: z.number().int().min(0).default(0),
  danhGia: z.number().int().min(0).default(0),
  maNhom: z.enum(groupOptions, {
    errorMap: () => ({ message: "Mã nhóm không hợp lệ" }),
  }),
});

export const searchCourseSchema = z.object({
  tenKhoaHoc: z.string().trim().min(1, "Vui lòng nhập thông tin!"),
});
