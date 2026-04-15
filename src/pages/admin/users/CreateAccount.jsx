import { message } from "antd";
import { useAddUserDemo } from "../../../queries/course.queries.js";
import UserForm from "./UserForm.jsx";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const addUserDemo = useAddUserDemo();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const payload = {
      ...values,
    };

    try {
      const data = await addUserDemo.mutateAsync(payload);
      console.log("Đăng ký thành công:", data);
      message.success("Tạo tài khoản thành công!");
      navigate("/admin/users");
    } catch (err) {
      console.log("Lỗi đăng ký:", err);
    }
  };

  return (
    <div className="form-create-user">
      <h3>Thêm Người Dùng</h3>
      <UserForm
        onSubmit={onSubmit}
        submitText="Tạo tài khoản"
        defaultValues={{
          taiKhoan: "",
          matKhau: "",
          hoTen: "",
          soDT: "",
          maLoaiNguoiDung: "GV",
          email: "",
          maNhom: "",
        }}
        disabledTaiKhoan={false}
      />
    </div>
  );
}
