import { message } from "antd";
import {
  useGetUserInfo,
  useUpdateUser,
} from "../../../queries/user.queries.js";
import UserForm from "./UserForm.jsx";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateAccount() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const { data } = useGetUserInfo(id);
  const updateUser = useUpdateUser();

  const userFromApi = data?.find((item) => item.taiKhoan === id);

  const user = userFromApi
    ? {
        taiKhoan: userFromApi.taiKhoan,
        hoTen: userFromApi.hoTen,
        email: userFromApi.email,
        soDT: userFromApi.soDt,
        maLoaiNguoiDung: userFromApi.maLoaiNguoiDung,
        maNhom: "GP01",
        matKhau: "",
      }
    : undefined;
  console.log(data);
  console.log(user);

  const onSubmit = async (values, resetForm) => {
    const payload = {
      ...values,
    };
    console.log(values);
    try {
      const data = await updateUser.mutateAsync(payload);
      console.log("Cập nhật tài khoản thành công:", data);
      message.success("Cập nhật tài khoản thành công!");
      resetForm({
        taiKhoan: "",
        matKhau: "",
        hoTen: "",
        soDT: "",
        maLoaiNguoiDung: "HV",
        maNhom: "",
        email: "",
      });
      navigate("/admin/users");
    } catch (err) {
      console.log("Lỗi đăng ký:", err);
    }
  };

  return (
    <div className="form-update-user">
      <h3>Cập nhật Người Dùng</h3>
      <UserForm
        defaultValues={user}
        onSubmit={onSubmit}
        submitText="Cập nhật tài khoản"
        disabledTaiKhoan={true}
      />
    </div>
  );
}
