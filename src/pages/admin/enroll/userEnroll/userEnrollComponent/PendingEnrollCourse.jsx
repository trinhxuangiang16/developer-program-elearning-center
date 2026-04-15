import React from "react";
import CommonList from "./CommonList.jsx";
import {
  useAddCourseById,
  useGetCoursePendingByUser,
} from "../../../../../queries/enroll.queries.js";

const PendingEnrollCourse = ({ id, action }) => {
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

export default PendingEnrollCourse;
