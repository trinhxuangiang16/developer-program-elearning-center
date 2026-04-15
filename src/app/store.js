//Kết hợp các slice, tạo store
// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../feature/auth/authSlice'; // Import reducer từ file bạn đã tạo

export const store = configureStore({
  reducer: {
    auth: authReducer, // Đăng ký auth slice vào store
    // admin: adminReducer (sau này bạn của bạn làm thì thêm vào đây)
  },
});