import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/state'; // nếu bạn lưu redux store ở đây

// Import các trang
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import NewsPage from './pages/NewsPage';
import SignIn from './pages/user/SignIn';
// ... import thêm các trang khác

// Import layout
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/news" element={<NewsPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<SignIn />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
