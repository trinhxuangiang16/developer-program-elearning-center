import React from "react";
import { NavLink, useMatch } from "react-router-dom";
import {
  FaListUl,
  FaPlusCircle,
  FaPenNib,
  FaUsers,
  FaUserPlus,
  FaUserEdit,
  FaRegAddressCard,
  FaBookMedical,
  FaUserCheck,
} from "react-icons/fa";
export default function SideBar() {
  const matchCourses = useMatch("/admin/courses/*");
  const matchCreateCrouse = useMatch("/admin/courses/:id/edit");
  const courseId = matchCreateCrouse?.params.id;

  const matchUsers = useMatch("/admin/users/*");
  const matchCreateUsers = useMatch("/admin/users/:id/edit");
  const userId = matchCreateUsers?.params.id;

  const matchEnrolls = useMatch("/admin/enroll/*");
  const matchEnrollUsers = useMatch("/admin/enroll/user/:id");
  const matchEnrollCourses = useMatch("/admin/enroll/course/:id");

  //dùng useMatch thì thấy id trong đấy luôn để tránh khác nhau khi có kí tự đặc biệt
  const enrollUserId = matchEnrollUsers?.params.id;
  const enrollCourseId = matchEnrollCourses?.params.id;

  return (
    <div className="side-bar">
      {matchCourses && (
        <div>
          <NavLink
            to="/admin/courses"
            end
            className={({ isActive }) =>
              `link-route ${isActive ? "active-sidebar" : ""}`
            }
          >
            <FaListUl /> Danh sách Khóa Học
          </NavLink>
          <NavLink
            to="/admin/courses/create"
            className={({ isActive }) =>
              `link-route ${isActive ? "active-sidebar" : ""}`
            }
          >
            <FaPlusCircle /> Thêm Khóa Học
          </NavLink>
          {matchCreateCrouse && (
            <NavLink
              to={`/admin/courses/${encodeURIComponent(courseId)}/edit`}
              className={({ isActive }) =>
                `link-route ${isActive ? "active-sidebar" : ""}`
              }
            >
              <FaPenNib /> Cập nhật khóa học
            </NavLink>
          )}
        </div>
      )}
      {matchUsers && (
        <div>
          <NavLink
            to="/admin/users"
            end
            className={({ isActive }) =>
              `link-route ${isActive ? "active-sidebar" : ""}`
            }
          >
            <FaUsers /> Danh sách Người Dùng
          </NavLink>
          <NavLink
            to="/admin/users/create"
            className={({ isActive }) =>
              `link-route ${isActive ? "active-sidebar" : ""}`
            }
          >
            <FaUserPlus /> Thêm Người Dùng
          </NavLink>
          {matchCreateUsers && (
            <NavLink
              to={`/admin/users/${encodeURIComponent(userId)}/edit`}
              className={({ isActive }) =>
                `link-route ${isActive ? "active-sidebar" : ""}`
              }
            >
              <FaUserEdit /> Cập nhật người dùng
            </NavLink>
          )}
        </div>
      )}

      {matchEnrolls && (
        <div>
          <NavLink
            to="/admin/enroll"
            end
            className={({ isActive }) =>
              `link-route ${isActive ? "active-sidebar" : ""}`
            }
          >
            <FaRegAddressCard /> Kiểm Tra Ghi Danh
          </NavLink>
          {matchEnrollCourses && (
            <NavLink
              to={`/admin/enroll/course/${encodeURIComponent(enrollCourseId)}`}
              className={({ isActive }) =>
                `link-route ${isActive ? "active-sidebar" : ""}`
              }
            >
              <FaBookMedical /> Ghi Danh Khóa Học
            </NavLink>
          )}
          {matchEnrollUsers && (
            <NavLink
              to={`/admin/enroll/user/${encodeURIComponent(enrollUserId)}`}
              className={({ isActive }) =>
                `link-route ${isActive ? "active-sidebar" : ""}`
              }
            >
              <FaUserCheck /> Ghi Danh Người Dùng
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
}
