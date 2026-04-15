import React from "react";
import { Tabs } from "antd";
import { useMatch } from "react-router-dom";
import NotRegisterCourse from "./userEnrollComponent/NotRegisterCourse.jsx";
import DoneEnrollCourse from "./userEnrollComponent/DoneEnrollCourse.jsx";
import PendingEnrollCourse from "./userEnrollComponent/PendingEnrollCourse.jsx";

export default function ManageUserEnroll() {
  const matchEnrollCourse = useMatch("/admin/enroll/user/:id");
  const userId = matchEnrollCourse?.params?.id;
  console.log(userId);
  const remove = "remove";
  const register = "register";
  const confirm = "confirm";

  const items = [
    {
      key: "1",
      label: "KHÓA HỌC CHƯA ĐĂNG KÝ",
      children: <NotRegisterCourse id={userId} action={register} />,
    },
    {
      key: "2",
      label: "KHÓA HỌC ĐÃ ĐĂNG KÝ",
      children: <DoneEnrollCourse id={userId} action={remove} />,
    },
    {
      key: "3",
      label: "KHÓA HỌC CHỜ XÉT DUYỆT",
      children: <PendingEnrollCourse id={userId} action={confirm} />,
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
