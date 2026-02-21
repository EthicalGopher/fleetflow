import React from 'react';
import { Outlet, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="admin-layout" style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: '250px', background: '#333', color: 'white', padding: '1rem' }}>
        <h2>Admin Panel</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link to="/admin" style={{ color: 'white' }}>Dashboard</Link>
          <Link to="/admin/users" style={{ color: 'white' }}>Users</Link>
          <button onClick={logout} style={{ marginTop: 'auto' }}>Logout</button>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '2rem', background: '#fafafa' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
