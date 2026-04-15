import React from "react";
import { List } from "antd";

export default function CommonList({ data, action, funtionHanle, id }) {
  const listNotRegiste = (data || []).map((item, index) => ({
    key: index,
    content: {
      taiKhoan: item.taiKhoan,
      hoTen: item.hoTen,
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
                  {item.key + 1}. {item.content.hoTen}
                </p>
              </div>

              {action == "remove" ? (
                <button
                  className="btn-enroll-list"
                  onClick={() => {
                    funtionHanle({
                      maKhoaHoc: id,
                      taiKhoan: item.content.taiKhoan,
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
                      maKhoaHoc: id,
                      taiKhoan: item.content.taiKhoan,
                    });
                  }}
                >
                  Ghi danh
                </button>
              ) : (
                <button
                  className="btn-enroll-list"
                  onClick={() => {
                    funtionHanle({
                      maKhoaHoc: id,
                      taiKhoan: item.content.taiKhoan,
                    });
                  }}
                >
                  Xác nhận khóa học
                </button>
              )}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
