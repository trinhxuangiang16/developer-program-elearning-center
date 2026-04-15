import CommonList from "./CommonList.jsx";
import {
  useDeleteCourseById,
  useGetUserWasRegisterByCourse,
} from "../../../../../../queries/enroll.queries.js";

const DoneEnrollUser = ({ id, action }) => {
  const { data } = useGetUserWasRegisterByCourse(id);
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

export default DoneEnrollUser;
