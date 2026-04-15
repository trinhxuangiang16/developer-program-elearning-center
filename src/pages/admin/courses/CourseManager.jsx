/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import {
  useCourses,
  useFindCourseByName,
  useImageCourse,
  useSearchCourse,
} from "../../../queries/course.queries.js";
import { Spinner } from "react-bootstrap";
import CourseTableList from "./CourseTableList.jsx";
import { Input, message, Modal, Upload } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchCourseSchema } from "../../../schemas/course.schema.js";

const CourseManager = React.memo(function CourseManager() {
  const { data: listData, isPending, isError, error } = useCourses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tenCuaKhoaHoc, setTenCuaKhoaHoc] = useState("");
  const showModal = (id) => {
    setIsModalOpen(true);
    setTenCuaKhoaHoc(id);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //////////////////////////////////////////////
  const [fileList, setFileList] = useState([]);
  const [imageVersion, setImageVersion] = useState(0);

  const { data } = useFindCourseByName(tenCuaKhoaHoc, {
    enabled: !!tenCuaKhoaHoc,
  });

  const updateImageCourse = useImageCourse();

  const courseFromApi = data?.find((item) => item.tenKhoaHoc === tenCuaKhoaHoc);
  console.log(fileList);
  useEffect(() => {
    console.log(courseFromApi);

    if (courseFromApi?.hinhAnh) {
      setFileList([
        {
          uid: "-1",
          name: courseFromApi.hinhAnh.split("/").pop() || "image.jpg",
          status: "done",
          url: courseFromApi.hinhAnh,
        },
      ]);
    }
  }, [courseFromApi?.hinhAnh]);

  const {
    handleSubmit: handleUploadSubmit,
    formState: { errors: uploadError },
  } = useForm();

  const onSubmitUpload = async () => {
    setIsModalOpen(false);
    if (!fileList.length || !fileList[0].originFileObj) {
      message.error("Vui lòng chọn ảnh");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileList[0].originFileObj); // FILE THẬT
    formData.append("tenKhoaHoc", tenCuaKhoaHoc);

    try {
      const data = await updateImageCourse.mutateAsync(formData);
      setImageVersion((v) => v + 1);
      console.log("Cập nhật ảnh thành công:", data);
      message.success("Cập nhật ảnh thành công!");
      // navigate("/admin/courses");
    } catch (err) {
      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Cập nhật khóa học thất bại";
      message.error(backendMessage);
    }
  };
  ///////////////////

  const [searchKey, setSearchKey] = useState("");

  const { data: courseFound, isPending: isSearching } =
    useSearchCourse(searchKey);

  const filteredCourse = searchKey
    ? courseFound?.filter((user) =>
        user.tenKhoaHoc.toLowerCase().includes(searchKey.toLowerCase())
      )
    : courseFound;

  const tableData =
    searchKey && courseFound && courseFound.length > 0
      ? courseFound
      : listData ?? [];

  const {
    handleSubmit: handleSearchSubmit,
    control,
    formState: { errors: searchError },
  } = useForm({
    resolver: zodResolver(searchCourseSchema),
    defaultValues: { tenKhoaHoc: "" },
  });

  ////////////////////
  if (isPending)
    return (
      <div className="loading-text">
        <Spinner></Spinner> Nội dung đang tải...
      </div>
    );
  if (isError) return <p>Lỗi: {String(error)}</p>;

  return (
    <div className="course-table">
      <h3>DANH SÁCH KHÓA HỌC</h3>

      <form
        className="form-search"
        onSubmit={handleSearchSubmit((values) => {
          setSearchKey(values.tenKhoaHoc.trim());
          console.log(values);
        })}
      >
        <div>
          <Controller
            name="tenKhoaHoc"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Tìm kiếm khóa học" />
            )}
          />
        </div>
        <button type="submit">Tìm kiếm</button>
      </form>
      {/* 1. Ưu tiên hiển thị lỗi Validation từ Zod trước */}
      {searchError.tenKhoaHoc && (
        <p className="search-not-found">{searchError.tenKhoaHoc.message}</p>
      )}

      {/* 2. Hiển thị Spinner khi đang thực hiện API search */}
      {searchKey && isSearching && <Spinner />}

      {/* 3. Hiển thị thông báo không tìm thấy kết quả */}
      {searchKey &&
        !isSearching &&
        !searchError.tenKhoaHoc &&
        (!filteredCourse || filteredCourse.length === 0) && (
          <p className="search-not-found">Không tìm thấy khóa học phù hợp</p>
        )}

      <CourseTableList
        key={searchKey ? "searching" : "whole"}
        data={tableData ?? []}
        showModal={showModal}
        imageVersion={imageVersion}
        onDeleteSuccess={() => setSearchKey("")}
      />
      <Modal
        title="Cập nhật ảnh"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        okText="Cập nhật"
        onOk={handleUploadSubmit(onSubmitUpload)}
      >
        <form onSubmit={handleUploadSubmit(onSubmitUpload)}>
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={(file) => {
              setFileList([
                {
                  uid: file.uid,
                  name: file.name,
                  status: "done",
                  originFileObj: file,
                },
              ]);
              return false;
            }}
            onRemove={() => setFileList([])}
          >
            <button type="button">Chọn từ máy</button>
          </Upload>

          {uploadError.hinhAnh && (
            <p className="text-danger">{uploadError.hinhAnh.message}</p>
          )}
        </form>
      </Modal>
    </div>
  );
});

export default CourseManager;
