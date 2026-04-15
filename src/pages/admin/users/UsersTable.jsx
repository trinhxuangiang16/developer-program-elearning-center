import React from "react";
import { Table, Button, Space, Tooltip, Popconfirm, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../../../queries/user.queries.js";

const UsersTable = React.memo(function UsersTable({ data, onDeleteSuccess }) {
  const navigate = useNavigate();

  const dataSource = (data || []).map((user, index) => ({
    key: index + 1,
    taiKhoan: user.taiKhoan,
    hoTen: user.hoTen,
    email: user.email,
    soDT: user.soDt,
    maLoaiNguoiDung: user.maLoaiNguoiDung,
  }));

  const { mutate: deleteUser, isPending } = useDeleteUser();

  const handleDelete = (taiKhoan) => {
    console.log(taiKhoan);

    deleteUser(taiKhoan, {
      onSuccess: () => {
        message.success("Xóa người dùng thành công");
        onDeleteSuccess?.();
      },
      onError: (error) => {
        const backendMessage =
          error?.response?.data?.message ||
          error?.response?.data ||
          "Xóa người dùng thất bại";
        message.error(backendMessage);
      },
    });
  };

  //Người dùng đã tạo khóa học và ghi danh không thể xóa, có thể test bằng tạo người dùng mới

  // Cột của bảng
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      width: 60,
      align: "center",
    },

    {
      title: "Tên tài khoản",
      dataIndex: "taiKhoan",
      width: 80,
      align: "center",
    },

    {
      title: "Họ tên",
      dataIndex: "hoTen",
      width: 120,
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 120,
      align: "center",
    },
    {
      title: "Điện thoại",
      dataIndex: "soDT",
      width: 100,
      align: "center",
    },
    {
      title: "Loại Người dùng",
      dataIndex: "maLoaiNguoiDung",
      width: 180,
      align: "center",
    },
    {
      title: "Hành động",
      width: 180,
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                navigate(
                  `/admin/users/${encodeURIComponent(record.taiKhoan)}/edit`,
                );
              }}
            />
          </Tooltip>
          <Tooltip title="Kiểm tra ghi danh">
            <Button
              type="link"
              icon={<UsergroupAddOutlined />}
              onClick={() =>
                navigate(
                  `/admin/enroll/user/${encodeURIComponent(record.taiKhoan)}`,
                )
              }
            />
          </Tooltip>
          <Tooltip title="Xóa người dùng">
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.taiKhoan)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <Table
      loading={isPending}
      dataSource={dataSource}
      columns={columns}
      pagination={{
        pageSize: 5,
        responsive: true,
        showSizeChanger: false,
        position: ["bottomRight"],
      }}
      bordered
    />
  );
});

export default UsersTable;
