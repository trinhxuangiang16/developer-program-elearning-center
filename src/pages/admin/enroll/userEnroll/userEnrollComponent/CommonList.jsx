import React from "react";
import { List } from "antd";

export default function CommonList({ data, action, funtionHanle, id }) {
  const listNotRegiste = (data || []).map((item, index) => ({
    key: index,
    content: {
      tenKhoaHoc: item.tenKhoaHoc,
      maKhoaHoc: item.maKhoaHoc,
    },
  }));

  return (
    <div className="custom-list-container whole-list-enroll-user">
      <div className="wrapper-list-enroll-user">
        <List
          dataSource={listNotRegiste}
          pagination={{
            pageSize: 10,
            position: "bottom",
            align: "center",
            showSizeChanger: false,
          }}
          renderItem={(item) => (
            <List.Item key={item.key}>
              <div>
                <p>
                  {item.key + 1}.{" "}
                  {item.content.tenKhoaHoc.replace(/`/g, "").toUpperCase()}
                </p>
              </div>

              {action == "remove" ? (
                <button
                  className="btn-enroll-list"
                  onClick={() => {
                    funtionHanle({
                      maKhoaHoc: item.content.maKhoaHoc,
                      taiKhoan: id,
                    });
                  }}
                >
                  Xóa khỏi khóa học
                </button>
              ) : action == "register" ? (
                <button
                  className="btn-enroll-list"
                  onClick={() => {
                    funtionHanle({
                      maKhoaHoc: item.content.maKhoaHoc,
                      taiKhoan: id,
                    });
                  }}
                >
                  Xác nhận khóa học
                </button>
              ) : (
                <button
                  className="btn-enroll-list"
                  onClick={() => {
                    funtionHanle({
                      maKhoaHoc: item.content.maKhoaHoc,
                      taiKhoan: id,
                    });
                  }}
                >
                  Đăng ký khóa học
                </button>
              )}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
