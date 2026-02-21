import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomeLayout from './layout/HomeLayout';
import AdminLayout from './layout/AdminLayout';
import ProtectUser from './pages/Home/ProtectUser';
import ProtectAdmin from './pages/Admin/ProtectAdmin';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const HomePage = () => <div><h1>Welcome to the Home Page</h1><p>Public access.</p></div>;
const Dashboard = () => <div><h1>User Dashboard</h1><p>Protected user content.</p></div>;
const AdminDashboard = () => <div><h1>Admin Dashboard</h1><p>Protected admin content.</p></div>;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public  */}
          <Route element={<HomeLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* User  */}
          <Route element={<HomeLayout />}>
            <Route element={<ProtectUser />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>

          {/* Admin  */}
          <Route path="/admin" element={<ProtectAdmin />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<div>Admin User Management</div>} />
            </Route>
          </Route>

          {/* Separate Admin Login */}
          <Route path="/admin/login" element={<LoginPage isAdmin={true} />} />

          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
