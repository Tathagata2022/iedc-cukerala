import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950">
        <div className="text-white text-center">
          <div className="text-2xl font-bold mb-2 gradient-text">Loading...</div>
          <p className="text-slate-400">Please wait</p>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;