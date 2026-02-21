import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomeLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="home-layout">
      <nav style={{ padding: '1rem', background: '#f0f0f0', display: 'flex', gap: '1rem' }}>
        <Link to="/">Home</Link>
        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <span>Welcome, {user.full_name}</span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </nav>
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
