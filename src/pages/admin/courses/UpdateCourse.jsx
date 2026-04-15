import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFindCourseByName,
  useUpdateCourse,
} from "../../../queries/course.queries.js";
import CourseForm from "./CourseForm.jsx";

export default function UpdateCourse() {
  const { id: tenCuaKhoaHoc } = useParams();
  //   const navigate = useNavigate();
  const { data } = useFindCourseByName(tenCuaKhoaHoc);
  const updateCourse = useUpdateCourse();
  const navigate = useNavigate();

  const courseFromApi = data?.find((item) => item.tenKhoaHoc === tenCuaKhoaHoc);
  console.log(courseFromApi);
  const user = courseFromApi
    ? {
        maKhoaHoc: courseFromApi.maKhoaHoc,
        biDanh: courseFromApi.biDanh,
        tenKhoaHoc: courseFromApi.tenKhoaHoc,
        moTa: courseFromApi.moTa,
        luotXem: courseFromApi.luotXem,
        danhGia: courseFromApi.danhGia,
        ngayTao: courseFromApi.ngayTao,
        maDanhMucKhoaHoc: courseFromApi.danhMucKhoaHoc.maDanhMucKhoahoc,
        taiKhoanNguoiTao: courseFromApi.nguoiTao.taiKhoan,
        hinhAnh: courseFromApi.hinhAnh,
        maNhom: courseFromApi.maNhom,
      }
    : undefined;
  console.log(data);
  console.log(user);

  const onSubmit = async (values, resetForm, fileList, setFileList) => {
    const payload = {
      ...values,
      hinhAnh: fileList[0]?.originFileObj ? fileList[0].name : values.hinhAnh,
    };
    console.log(values);
    try {
      const data = await updateCourse.mutateAsync(payload);
      console.log("Cập nhật khóa học thành công:", data);
      message.success("Cập nhật khóa học thành công!");
      navigate("/admin/courses");
    } catch (err) {
      console.log("Lỗi đăng ký:", err);
    }
  };

  return (
    <div className="form-update-user">
      <h3>Cập nhật Khóa học</h3>
      <CourseForm
        defaultValues={user}
        onSubmit={onSubmit}
        submitText="Cập nhật khóa học"
        disabledMaKhoaHoc={true}
      />
    </div>
  );
}
