import axios from "axios";

const TOKEN_CYBERSOFT = import.meta.env.VITE_TOKEN_CYBERSOFT;

const BASE_URL =
  import.meta.env.VITE_BASE_URL || "https://movieapi.cyberlearn.vn/api/";

export const api = axios.create({
  baseURL: `${BASE_URL}QuanLyKhoaHoc/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const ACCESSTOKEN = localStorage.getItem("ACCESSTOKEN");

  config.headers = {
    ...config.headers,
    TokenCybersoft: TOKEN_CYBERSOFT,
  };

  if (ACCESSTOKEN) {
    config.headers.Authorization = `Bearer ${ACCESSTOKEN}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export const apiQLND = axios.create({
  baseURL: `${BASE_URL}QuanLyNguoiDung/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiQLND.interceptors.request.use((config) => {
  const ACCESSTOKEN = localStorage.getItem("ACCESSTOKEN");

  config.headers = {
    ...config.headers,
    TokenCybersoft: TOKEN_CYBERSOFT,
  };

  if (ACCESSTOKEN) {
    config.headers.Authorization = `Bearer ${ACCESSTOKEN}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

// email
// :
// "giang@gmail.com"
// hoTen
// :
// "Trịnh Xuân Giang"
// maNhom
// :
// "GP01"
// matKhau
// :
// "11111111"
// soDT
// :
// "0832369372"
// taiKhoan
// :
// "trinhgiang"
