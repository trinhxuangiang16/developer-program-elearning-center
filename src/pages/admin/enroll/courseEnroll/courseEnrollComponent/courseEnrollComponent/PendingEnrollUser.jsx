import React from "react";
import {
  useAddCourseById,
  useGetCoursePendingByUser,
} from "../../../../../../queries/enroll.queries.js";
import CommonList from "./CommonList.jsx";

const PendingEnrollUser = ({ id, action }) => {
  const { data } = useGetCoursePendingByUser(id);
  const addCourse = useAddCourseById();
  const addCourseById = async (payload) => {
    try {
      const data = await addCourse.mutateAsync(payload);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <CommonList data={data} action={action} funtionHanle={addCourseById} />
  );
};

export default PendingEnrollUser;
