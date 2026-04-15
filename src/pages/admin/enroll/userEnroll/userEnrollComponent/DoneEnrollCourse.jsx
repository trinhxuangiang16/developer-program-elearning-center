import {
  useDeleteCourseById,
  useGetCourseWasRegisterByUser,
} from "../../../../../queries/enroll.queries.js";
import CommonList from "./CommonList.jsx";

const DoneEnrollCourse = ({ id, action }) => {
  const { data } = useGetCourseWasRegisterByUser(id);
  const addCourse = useDeleteCourseById();

  const removeCourseById = async (payload) => {
    try {
      const data = await addCourse.mutateAsync(payload);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CommonList
      data={data}
      action={action}
      funtionHanle={removeCourseById}
      id={id}
    />
  );
};

export default DoneEnrollCourse;
