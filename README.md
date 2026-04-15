# E-Learning Center (Frontend)

Dự án frontend cho trung tâm e-learning: xem danh mục khoá học, chi tiết khoá học, đăng ký/đăng nhập và khu vực **Admin** quản trị user/course/enroll.  
Backend là hệ thống nội bộ của trung tâm cung cấp và bảo mật

## Demo Admin (for testing)

- Username: `trinhxuangiang`
- Password: `trinhxuangiang`

> Lưu ý: quyền Admin được kiểm tra theo `maLoaiNguoiDung === "GV"`.

## Tech Stack

- **React 19** + **Vite**
- **Routing**: React Router DOM v7 (public/admin routes)
- **State Management**: Redux Toolkit + React Redux
- **Server State**: TanStack React Query + Axios
- **UI**: Ant Design (antd) + Bootstrap/React-Bootstrap
- **Forms & Validation**: React Hook Form + Zod (+ resolvers)
- **Styling**: TailwindCSS + SCSS/Sass
- **Tooling**: ESLint, deploy config cho Vercel

## Features / Modules

### User (Public)

- Home / danh mục khoá học / danh sách khoá theo danh mục
- Course detail
- Auth: Login / Register
- Profile (yêu cầu đăng nhập)

### Admin (My responsibility)

- **User Management**: list / create / update
- **Course Management**: list / create / update
- **Enrollment Management**
  - quản lý ghi danh theo **user**
  - quản lý ghi danh theo **course**
- Route guards:
  - `ProtectedRoute`: chặn trang cần login
  - `AdminRoute`: chặn trang admin (role GV)

## Run locally

### Requirements

- Node.js 18+ (khuyến nghị)
- npm

### Install & start

```bash
git clone https://github.com/trinhxuangiang16/developer-program-elearning-center.git
cd developer-program-elearning-center
npm install
npm run dev
```

## Notes

- Project là bài làm nhóm; mình phụ trách chính phần **Admin module**.
- API backend không public nên repo này tập trung showcase UI/logic FE, quản lý state, route guard, form validation và luồng CRUD admin.
