import React from "react";
import { Tabs } from "antd";
import { useMatch } from "react-router-dom";

import NotRegisterUser from "./courseEnrollComponent/courseEnrollComponent/NotRegisterUser.jsx";
import DoneEnrollUser from "./courseEnrollComponent/courseEnrollComponent/DoneEnrollUser.jsx";
import PendingEnrollUser from "./courseEnrollComponent/courseEnrollComponent/PendingEnrollUser.jsx";

export default function ManageUserEnroll() {
  const matchEnrollUsers = useMatch("/admin/enroll/course/:id");
  const courseId = matchEnrollUsers?.params.id;

  const remove = "remove";
  const register = "register";
  const confirm = "confirm";

  const items = [
    {
      key: "1",
      label: "KHÓA HỌC CHƯA ĐĂNG KÝ",
      children: <NotRegisterUser id={courseId} action={register} />,
    },
    {
      key: "2",
      label: "KHÓA HỌC ĐÃ ĐĂNG KÝ",
      children: <DoneEnrollUser id={courseId} action={remove} />,
    },
    {
      key: "3",
      label: "KHÓA HỌC CHỜ XÉT DUYỆT",
      children: <PendingEnrollUser id={courseId} action={confirm} />,
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
