import { message } from "antd";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import { useAddCourse } from "../../../queries/course.queries.js";
import CourseForm from "./CourseForm.jsx";

export default function CreateCourse() {
  const addCourses = useAddCourse();
  const navigate = useNavigate();

  const onSubmit = async (values, resetForm, fileList, setFileList) => {
    const payload = {
      ...values,
      biDanh: values.maKhoaHoc,
      hinhAnh: fileList[0]?.name,
    };
    console.log(payload);
    try {
      const data = await addCourses.mutateAsync(payload);
      console.log("Form Data:", data);
      message.success("Thêm khóa học thành công!");
      resetForm({
        maKhoaHoc: "",
        biDanh: "",
        tenKhoaHoc: "",
        moTa: "",
        luotXem: 0,
        danhGia: 0,
        ngayTao: "",
        maDanhMucKhoaHoc: "",
        taiKhoanNguoiTao: "trinhgiang",
        hinhAnh: "",
        maNhom: "GP01",
      });
      setFileList([]);
      navigate("/admin/courses");
    } catch (err) {
      console.log("Lỗi tạo:", err);
    }
  };

  return (
    <div className="form-course">
      <h3>THÊM KHÓA HỌC</h3>
      <CourseForm
        onSubmit={onSubmit}
        submitText="Thêm khóa học"
        defaultValues={{
          maKhoaHoc: "",
          biDanh: "",
          tenKhoaHoc: "",
          moTa: "",
          luotXem: 0,
          danhGia: 0,
          ngayTao: dayjs().format("DD/MM/YYYY"),
          maDanhMucKhoaHoc: "FrontEnd",
          taiKhoanNguoiTao: "trinhgiang",
          hinhAnh: "",
          maNhom: "GP01",
        }}
        disabledMaKhoaHoc={false}
      />
    </div>
  );
}
