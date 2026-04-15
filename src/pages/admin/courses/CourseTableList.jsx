import React from "react";
import { Table, Button, Image, Space, Tooltip, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDeleteCourse } from "../../../queries/course.queries.js";

const CourseTableList = React.memo(function CourseTableList({
  data,
  showModal,
  imageVersion,
  onDeleteSuccess,
}) {
  const navigate = useNavigate();

  const dataSource = (data || []).map((course, index) => ({
    key: index + 1,
    hinhAnh: course.hinhAnh,
    maKhoaHoc: course.maKhoaHoc,
    tenKhoaHoc: course.tenKhoaHoc,
    ngayTao: course.ngayTao,
    nguoiTao: course.nguoiTao?.hoTen || "N/A",
    danhMucKhoaHoc:
      course.danhMucKhoaHoc?.tenDanhMucKhoaHoc ||
      course.danhMucKhoaHoc ||
      "N/A",
  }));

  const { mutate: deleteCourse, isPending } = useDeleteCourse();

  const handleDelete = (maKhoaHoc) => {
    const taiKhoanTrimmed = maKhoaHoc.trim();
    deleteCourse(taiKhoanTrimmed, {
      onSuccess: () => {
        message.success("Xóa khóa học thành công");
        onDeleteSuccess?.();
      },
      onError: (error) => {
        const backendMessage =
          error?.response?.data?.message ||
          error?.response?.data ||
          "Xóa khóa học thất bại";
        message.error(backendMessage);
      },
    });
  };

  // Cột của bảng
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      width: 60,
      align: "center",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (src) => (
        <Image
          width={60}
          height={40}
          src={`${src}?t=${imageVersion}`}
          // nếu ảnh lỗi thì dùng ảnh này
          fallback="/image.png"
          style={{ objectFit: "cover", borderRadius: 4 }}
        />
      ),
      width: 100,
    },
    {
      title: "Mã KH",
      dataIndex: "maKhoaHoc",
      width: 80,
      align: "center",
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
    },

    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      width: 120,
      align: "center",
    },
    {
      title: "Người tạo",
      dataIndex: "nguoiTao",
      width: 100,
    },
    {
      title: "Danh mục",
      dataIndex: "danhMucKhoaHoc",
      width: 180,
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
              onClick={() =>
                navigate(`/admin/courses/${record.tenKhoaHoc}/edit`)
              }
            />
          </Tooltip>
          <Tooltip title="Tải ảnh lên">
            <Button
              type="link"
              icon={<UploadOutlined />}
              onClick={() => showModal(record.tenKhoaHoc)}
            />
          </Tooltip>
          <Tooltip title="Kiểm tra ghi danh khóa học">
            <Button
              type="link"
              icon={<AuditOutlined />}
              onClick={() =>
                navigate(
                  `/admin/enroll/course/${encodeURIComponent(record.maKhoaHoc)}`,
                )
              }
            />
          </Tooltip>
          <Tooltip title="Xóa khóa học">
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.maKhoaHoc)}
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

export default CourseTableList;
