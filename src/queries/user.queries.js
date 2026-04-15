import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiQLND, api } from "../services/api.js";
import { message } from "antd";

// =======================================================
// PHẦN 1: CLIENT HOOKS (Dành cho User - Login/Register/Profile)
// =======================================================

// 1. Đăng nhập
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const res = await apiQLND.post("DangNhap", formData);
      return res.data;
    },
  });
};

// 2. Đăng ký
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const res = await apiQLND.post("DangKy", formData);
      return res.data;
    },
  });
};

// 3. Lấy thông tin chi tiết (Profile + Khóa học đã ghi danh)
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await apiQLND.post("ThongTinTaiKhoan");
      return res.data;
    },
    // Chỉ gọi API khi đã có token
    enabled: !!localStorage.getItem("ACCESSTOKEN"),
    staleTime: 0, // Luôn lấy dữ liệu mới nhất khi vào trang
  });
};

// 4. Cập nhật thông tin cá nhân (⚠️ QUAN TRỌNG: Hàm này đang thiếu gây lỗi)
export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiQLND.put("CapNhatThongTinNguoiDung", payload);
      return res.data;
    },
    onSuccess: () => {
      message.success("Cập nhật thông tin thành công!");
      queryClient.invalidateQueries(["userProfile"]); // Làm mới dữ liệu profile
    },
    onError: (err) => {
      message.error(err.response?.data || "Cập nhật thất bại!");
    },
  });
};

// 5. Hủy đăng ký khóa học (⚠️ QUAN TRỌNG: Hàm này đang thiếu gây lỗi)
export const useCancelCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      // payload: { maKhoaHoc, taiKhoan }
      const res = await api.post("HuyGhiDanh", payload);
      return res.data;
    },
    onSuccess: (data) => {
      message.success(
        typeof data === "string" ? data : "Hủy đăng ký thành công!"
      );
      queryClient.invalidateQueries(["userProfile"]); // Làm mới danh sách khóa học
    },
    onError: (err) => {
      message.error(err.response?.data || "Hủy đăng ký thất bại!");
    },
  });
};

// 6. Đăng ký khóa học (Dùng cho trang Chi tiết khóa học)
export const useRegisterCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("DangKyKhoaHoc", data);
      return res.data;
    },
    onSuccess: () => {
      message.success("Đăng ký khóa học thành công!");
      queryClient.invalidateQueries(["userProfile"]);
    },
    onError: (err) => {
      message.error(err.response?.data || "Đăng ký thất bại!");
    },
  });
};

// =======================================================
// PHẦN 2: ADMIN HOOKS (Code cũ của dự án - Đừng xóa)
// =======================================================

// Lấy danh sách người dùng (Admin)
export const useGetUsersList = () => {
  return useQuery({
    queryKey: ["usersList"],
    queryFn: async () => {
      const res = await apiQLND.get("LayDanhSachNguoiDung");
      console.log("Lấy danh sách người dùng", res.data);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    select: (data) => [...data],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

// Tìm kiếm người dùng (Admin)
export const useGetUserInfo = (keyQuery) => {
  return useQuery({
    queryKey: ["usersSearch", keyQuery],
    queryFn: async () => {
      const res = await apiQLND.get(
        `TimKiemNguoiDung?tuKhoa=${encodeURIComponent(keyQuery)}`
      );
      console.log("Tìm kiếm người dùng", res.data);
      return res.data;
    },
    enabled: !!keyQuery,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

// Cập nhật thông tin người dùng (Admin)
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiQLND.put("CapNhatThongTinNguoiDung", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["usersList"]);
    },
  });
};

// Xóa người dùng (Admin)
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taiKhoan) =>
      await apiQLND.delete(
        `XoaNguoiDung?TaiKhoan=${encodeURIComponent(taiKhoan)}`
      ),
    onSuccess: async () => {
      // 1. Invalidate toàn bộ để các query liên quan tự động fetch lại
      await queryClient.invalidateQueries({
        queryKey: ["usersList"],
        exact: true, // Đảm bảo làm mới đúng danh sách tổng
      });

      // 2. Với tìm kiếm, xóa cache để lần sau tìm lại sẽ lấy data mới
      queryClient.removeQueries({ queryKey: ["usersSearch"] });

      console.log("Dữ liệu đã được làm mới trên Server");
    },
  });
};
