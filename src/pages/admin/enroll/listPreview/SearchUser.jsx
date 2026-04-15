import React, { useState } from "react";
import { List } from "antd";
// import { useNavigate } from "react-router-dom";

import SearchFormCommon from "./SearchFormCommon.jsx";
import { useGetUserInfo } from "../../../../queries/user.queries.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchUserSchema } from "../../../../schemas/auth.schema.js";

export default function SearchUser() {
  const key = "taiKhoan";
  const [searchKey, setSearchKey] = useState("");

  const { data: userFound, isPending } = useGetUserInfo(searchKey);

  const findUser =
    searchKey && userFound?.find((user) => user.taiKhoan == searchKey);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchUserSchema),
    defaultValues: { taiKhoan: "" },
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
        findSomething={findUser}
        errors={errors}
        isPending={isPending}
      />
    </div>
  );
}
