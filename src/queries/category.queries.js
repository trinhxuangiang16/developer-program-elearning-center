import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api.js";

// 1. Lấy mã danh mục khóa học
export const useGetCategoriesCode = () => {
  return useQuery({
    queryKey: ["categoriesCode"],
    queryFn: async () => {
      const res = await api.get("LayDanhMucKhoaHoc");
      console.log("Lấy danh muc khóa học:", res.data);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

// 2. Lấy danh sách khóa học theo danh mục (Cho trang CategoryCourses)
export const useGetCoursesByCategory = (maDanhMuc) => {
  return useQuery({
    queryKey: ["coursesByCategory", maDanhMuc],
    queryFn: async () => {
      // API lấy khóa học theo danh mục
      const res = await api.get(
        `LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP01`
      );
      return res.data;
    },
    enabled: !!maDanhMuc,
  });
};

// 3. Lấy danh sách toàn bộ khóa học (Public)
export const useGetPublicCourseList = () => {
  return useQuery({
    queryKey: ["publicCourses"],
    queryFn: async () => {
      const res = await api.get("LayDanhSachKhoaHoc?MaNhom=GP01");
      return res.data;
    },
  });
};

// 4. Lấy chi tiết khóa học (Cho trang Detail)
export const useGetCourseDetail = (id) => {
  return useQuery({
    queryKey: ["courseDetail", id],
    queryFn: async () => {
      const res = await api.get(`LayThongTinKhoaHoc?maKhoaHoc=${id}`);
      return res.data;
    },
    enabled: !!id, // Chỉ fetch khi có id
  });
};

// 5. Lấy danh sách khóa học (⚠️ QUAN TRỌNG: Thêm lại hàm này để fix lỗi Home.jsx)
export const useGetCourseList = () => {
  return useQuery({
    queryKey: ["courseList"],
    queryFn: async () => {
      // Gọi API LayDanhSachKhoaHoc với mã nhóm mặc định GP01
      const res = await api.get("LayDanhSachKhoaHoc?MaNhom=GP01");
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // Cache 5 phút
    keepPreviousData: true,
  });
};
