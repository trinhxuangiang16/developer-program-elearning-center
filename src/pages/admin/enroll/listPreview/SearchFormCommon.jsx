import { Input } from "antd";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";

import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function SearchFormCommon({
  keyData,
  searchKey,
  setSearchKey,
  handleSubmit,
  control,
  findSomething,
  errors,
  isPending,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (findSomething && searchKey) {
      if (keyData === "taiKhoan") {
        navigate(`/admin/enroll/user/${encodeURIComponent(searchKey)}`);
      } else {
        const maKhoaHoc = findSomething.maKhoaHoc;
        navigate(`/admin/enroll/course/${encodeURIComponent(maKhoaHoc)}`);
      }
    }
  }, [findSomething, searchKey, keyData, navigate]);

  return (
    <>
      <form
        className="form-search"
        onSubmit={handleSubmit((values) => {
          setSearchKey(values[keyData]);
        })}
      >
        <div>
          <Controller
            name={keyData}
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Tìm kiếm tài khoản" />
            )}
          />
        </div>
        <button type="submit">Tìm kiếm</button>
      </form>
      {searchKey && isPending && <Spinner />}
      {errors[keyData] && (
        <p className="search-not-found">{errors[keyData].message}</p>
      )}
      {searchKey &&
        !isPending &&
        !findSomething &&
        (errors[keyData] ? (
          ""
        ) : keyData == "taiKhoan" ? (
          <p className="search-not-found">
            Yêu cầu nhập đúng tên tài khoản bao gồm dấu cách và kí tự đặc biệt!
            (nếu có)
          </p>
        ) : (
          <p className="search-not-found">
            Yêu cầu nhập đúng tên khóa học bao gồm dấu cách và kí tự đặc biệt!
            (nếu có)
          </p>
        ))}
    </>
  );
}
