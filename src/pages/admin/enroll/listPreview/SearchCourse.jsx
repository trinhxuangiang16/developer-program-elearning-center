import React, { useState } from "react";
import { List } from "antd";
// import { useNavigate } from "react-router-dom";

import SearchFormCommon from "./SearchFormCommon.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFindCourseByName } from "../../../../queries/course.queries.js";
import { searchCourseSchema } from "../../../../schemas/course.schema.js";

export default function SearchCourse() {
  const key = "tenKhoaHoc";
  const [searchKey, setSearchKey] = useState("");

  const { data: courseFound, isPending } = useFindCourseByName(searchKey);
  console.log(courseFound);

  const findCourse =
    searchKey && courseFound?.find((user) => user.tenKhoaHoc == searchKey);
  console.log(findCourse);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchCourseSchema),
    defaultValues: { tenKhoaHoc: "" },
  });

  return (
    <div className="form-user">
      {/* <h3>DANH SÁCH NGƯỜI DÙNG</h3> */}
      <SearchFormCommon
        keyData={key}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        handleSubmit={handleSubmit}
        control={control}
        findSomething={findCourse}
        errors={errors}
        isPending={isPending}
      />
    </div>
  );
}
