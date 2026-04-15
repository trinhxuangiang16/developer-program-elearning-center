//Query + mutation cho khóa học
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, apiQLND } from "../services/api.js";

// Lấy danh sách khóa học
export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await api.get("LayDanhSachKhoaHoc");
      console.log("Lấy danh sách khóa học:", res.data);
      return res.data;
    },

    staleTime: 5 * 60 * 1000, //thời gian dự liệu được xem là mới và ko gọi lại api trong khoản tgian này
    refetchOnWindowFocus: false, //không gọi lại api khi đổi tab
    refetchOnReconnect: false, //đổi mạng ko tự động gọi api
  });
};

export const useFindCourseByName = (keyQuery) => {
  return useQuery({
    queryKey: ["coursesFind", keyQuery],
    queryFn: async () => {
      const res = await api.get(`LayDanhSachKhoaHoc?tenKhoaHoc=${keyQuery}`);
      console.log("Lấy danh sách khóa học theo tên:", res.data);
      return res.data;
    },
    enabled: !!keyQuery, //tránh gọi khi nó undefined
    staleTime: 5 * 60 * 1000, //thời gian dự liệu được xem là mới và ko gọi lại api trong khoản tgian này
    refetchOnWindowFocus: false, //không gọi lại api khi đổi tab
    refetchOnReconnect: false, //đổi mạng ko tự động gọi api
  });
};

export const useSearchCourse = (keyQuery) => {
  return useQuery({
    queryKey: ["coursesFind", keyQuery],
    queryFn: async () => {
      const res = await api.get(`LayDanhSachKhoaHoc?tenKhoaHoc=${keyQuery}`);
      console.log("Lấy danh sách khóa học theo tên:", res.data);
      return res.data;
    },
    retry: 0,
    enabled: !!keyQuery, //tránh gọi khi nó undefined
    staleTime: 5 * 60 * 1000, //thời gian dự liệu được xem là mới và ko gọi lại api trong khoản tgian này
    refetchOnWindowFocus: false, //không gọi lại api khi đổi tab
    refetchOnReconnect: false, //đổi mạng ko tự động gọi api
  });
};

//Thêm khóa học
export const useAddCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("ThemKhoaHoc", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.put("CapNhatKhoaHoc", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};

export const useImageCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("UploadHinhAnhKhoaHoc", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (maKhoaHoc) =>
      await api.delete(`XoaKhoaHoc?maKhoaHoc=${maKhoaHoc}`),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["courses"],
        exact: true,
      });

      queryClient.removeQueries({ queryKey: ["coursesFind"] });
      console.log("Dữ liệu đã được làm mới trên Server");
    },
  });
};

//Thêm tài khoản - Sẽ tách về user
export const useAddUserDemo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiQLND.post("ThemNguoiDung", payload);
      console.log(res.data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["usersList"]);
    },
  });
};
