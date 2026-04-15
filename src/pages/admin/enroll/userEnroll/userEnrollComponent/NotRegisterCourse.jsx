import {
  useAddCourseById,
  useGetCourseNotRegisterByUser,
} from "../../../../../queries/enroll.queries.js";
import CommonList from "./CommonList.jsx";

const NotRegisterCourse = ({ id, action }) => {
  const { data: listNotRegisterByUser } = useGetCourseNotRegisterByUser(id);
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
    <CommonList
      data={listNotRegisterByUser}
      action={action}
      funtionHanle={addCourseById}
      id={id}
    />
  );
};
export default NotRegisterCourse;
