// import React from "react";
import { Tabs } from "antd";
import SearchUser from "./listPreview/SearchUser.jsx";
import SearchCourse from "./listPreview/SearchCourse.jsx";

export default function EnrollManager() {
  const items = [
    {
      key: "1",
      label: "KIỂM TRA THEO MÃ KHÓA HỌC",
      children: <SearchCourse />,
    },
    {
      key: "2",
      label: "KIỂM TRA THEO TÀI KHOẢN",
      children: <SearchUser />,
    },
  ];

  const onChange = (key) => {
    console.log("Tab active:", key);
  };

  return (
    <div className="elearning-tabs-enroll">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}
