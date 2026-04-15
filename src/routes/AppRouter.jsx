import { Navigate, useRoutes } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout/HomeLayout.jsx";
import Home from "../pages/home/Home.jsx";
import CategoryList from "../pages/category/CategoryList.jsx";
import Login from "../pages/auth/Login.jsx";
import CategoryCourses from "../pages/category/CategoryCourses.jsx";
import CourseDetail from "../pages/course-detail/CourseDetail.jsx";
import Register from "../pages/auth/Register.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Profile from "../pages/profile/Profile.jsx";
import AdminLayout from "../layouts/AdminLayout/AdminLayout.jsx";
import UserManager from "../pages/admin/users/UserManager.jsx";
import CreateAccount from "../pages/admin/users/CreateAccount.jsx";
import UpdateAccount from "../pages/admin/users/UpdateAccount.jsx";
import CourseManager from "../pages/admin/courses/CourseManager.jsx";
import CreateCourse from "../pages/admin/courses/CreateCourse.jsx";
import UpdateCourse from "../pages/admin/courses/UpdateCourse.jsx";
import EnrollManager from "../pages/admin/enroll/EnrollManager.jsx";
import ManageUserEnroll from "../pages/admin/enroll/userEnroll/ManageUserEnroll.jsx";
import AdminRoute from "./AdminRoute.jsx";
import ManageCourseEnroll from "../pages/admin/enroll/courseEnroll/ManageCourseEnroll.jsx";

export default function AppRouter() {
  const routes = useRoutes([
    // PUBLIC
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "danh-muc-khoa-hoc", element: <CategoryList /> },
        { path: "danh-muc/:maDanhMuc", element: <CategoryCourses /> },
        { path: "khoa-hoc/:maKhoaHoc", element: <CourseDetail /> },

        { path: "register", element: <Register /> },
        { path: "courses/:id", element: <CourseDetail /> },

        {
          element: <ProtectedRoute />, //Vào file này xem ghi chú
          children: [{ path: "profile", element: <Profile /> }],
        },
      ],
    },

    // ADMIN
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          element: <AdminRoute />, //Vào file này xem ghi chú
          children: [
            { index: true, element: <Navigate to="courses" replace /> },

            {
              //user manage
              path: "users",
              children: [
                { index: true, element: <UserManager /> },
                { path: "create", element: <CreateAccount /> },
                { path: ":id/edit", element: <UpdateAccount /> },
              ],
            },

            // Courses
            {
              path: "courses",
              children: [
                { index: true, element: <CourseManager /> },

                { path: "create", element: <CreateCourse /> },
                { path: ":id/edit", element: <UpdateCourse /> },
              ],
            },

            {
              path: "enroll",
              children: [
                { index: true, element: <EnrollManager /> },
                { path: "user/:id", element: <ManageUserEnroll /> },
                { path: "course/:id", element: <ManageCourseEnroll /> },
              ],
            },
          ],
        },
      ],
    },

    {
      path: "*",
      element: (
        <div style={{ textAlign: "center", marginTop: 50 }}>404 Not Found</div>
      ),
    },
  ]);

  return routes;
}
