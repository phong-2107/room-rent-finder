import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/state'; // nếu bạn lưu redux store ở đây
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import các trang
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import NewsPage from './pages/NewsPage';
import SignIn from './pages/user/SignIn';
import SignUp from './pages/user/SignUp';
import ContactPage from './pages/ContactPage';
import DetailRoom from './pages/DetailRoom'; // Trang chi tiết phòng
// ... import thêm các trang khác

// Import layout
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import LayoutAdmin from './layouts/admin/LayoutAdmin'; // Nếu bạn có layout admin riêng

import "./App.css";
import ForgotPassword from './pages/user/ForgotPassword';
import { UserProfile } from './pages/UserProfile';
import { ChangePassword } from './pages/ChangePasswordPage';
import { FollowList } from './pages/FollowList';
import AdminPage from './pages/admin/AdminPage';
import ManagerRoom from './pages/admin/ManagerRoom';
import CreateRoom from './pages/admin/CreateRoom';
import RoomsPages from './pages/RoomsPages';
import FindRoom from './pages/FindRooms';
import ViewRoom from './pages/admin/ViewRoom';
import PermissionManagement from './admin/components/PermissionManagement';
import CreatePermission from './pages/admin/CreatePermission';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* ToastContainer for global notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/rooms/location/:diaDiemId" element={<ListPage />} />
            <Route path="/rooms/" element={<RoomsPages />} />
            <Route path="/findroom" element={<FindRoom />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/followlist" element={<FollowList />} />
            <Route path="/room/:id" element={<DetailRoom />} />
          </Route>

          <Route element={<LayoutAdmin />}>
            <Route path="/admin/dashboard" element={<AdminPage />} />
            <Route path="/admin/room" element={<ManagerRoom />} />
            <Route path="/admin/create-room" element={<CreateRoom />} />
            <Route path="/admin/room/:id" element={<ViewRoom />} />
            <Route path="/admin/permission" element={<PermissionManagement />} />
            <Route path="/admin/permission/create" element={<CreatePermission />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;