// src/feature/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Lấy dữ liệu từ LocalStorage khi app khởi động lại
const safeParse = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        return null;
    }
};

const initialState = {
  user: safeParse("USER_LOGIN") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      const userInfo = action.payload;
      state.user = userInfo;
      // Lưu vào LocalStorage
      localStorage.setItem("USER_LOGIN", JSON.stringify(userInfo));
      localStorage.setItem("ACCESSTOKEN", userInfo.accessToken);
    },
    logoutAction: (state) => {
      state.user = null;
      // Xóa khỏi LocalStorage
      localStorage.removeItem("USER_LOGIN");
      localStorage.removeItem("ACCESSTOKEN");
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;