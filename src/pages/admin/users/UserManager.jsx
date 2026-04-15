import { useState } from "react";
import {
  useGetUserInfo,
  useGetUsersList,
} from "../../../queries/user.queries.js";
import { Spinner } from "react-bootstrap";
import UsersTable from "./UsersTable.jsx";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchUserSchema } from "../../../schemas/auth.schema.js";

import { Input } from "antd";

export default function UserManager() {
  const { data: wholeList } = useGetUsersList();
  const [searchKey, setSearchKey] = useState("");

  const { data: userFound, isPending } = useGetUserInfo(searchKey);

  const filteredUsers = searchKey
    ? userFound?.filter((user) =>
        user.taiKhoan.toLowerCase().includes(searchKey.toLowerCase())
      )
    : userFound;

  const tableData =
    searchKey && userFound && userFound.length > 0
      ? userFound
      : wholeList ?? [];

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
      <h3>DANH SÁCH NGƯỜI DÙNG</h3>
      <form
        className="form-search"
        onSubmit={handleSubmit((values) => {
          setSearchKey(values.taiKhoan.trim());
          console.log(values);
        })}
      >
        <div>
          <Controller
            name="taiKhoan"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Tìm kiếm tài khoản" />
            )}
          />
        </div>
        <button type="submit">Tìm kiếm</button>
      </form>

      {searchKey && isPending && <Spinner />}

      {searchKey &&
        Array.isArray(filteredUsers) &&
        filteredUsers.length === 0 &&
        (errors.taiKhoan ? (
          ""
        ) : (
          <p className="search-not-found">Không tìm thấy người dùng</p>
        ))}

      {errors.taiKhoan && (
        <p className="search-not-found">{errors.taiKhoan.message}</p>
      )}

      <UsersTable
        key={searchKey ? "searching" : "whole"}
        data={tableData ?? []}
        onDeleteSuccess={() => setSearchKey("")}
      />
    </div>
  );
}
