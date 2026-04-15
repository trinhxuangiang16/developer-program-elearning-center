import {
  useAddCourseById,
  useGetUserNotRegisterByCourse,
} from "../../../../../../queries/enroll.queries.js";
import CommonList from "./CommonList.jsx";

const NotRegisterUser = ({ id, action }) => {
  const { data } = useGetUserNotRegisterByCourse(id);
  const addCourse = useAddCourseById();

  const addUserByCourse = async (payload) => {
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
      funtionHanle={addUserByCourse}
      id={id}
    />
  );
};
export default NotRegisterUser;
