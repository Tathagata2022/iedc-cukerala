import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">IEDC CUK Management</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-slate-400">Logged in as</p>
              <p className="text-white font-semibold">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Cards - Now a 2x2 grid (md:grid-cols-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* 1. Manage Events */}
          <Link
            to="/admin/dashboard/events"
            className="glass-card p-6 rounded-lg hover:border-purple-500 transition cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold gradient-text mb-2 group-hover:text-purple-400 transition">
                  📅 Manage Events
                </h2>
                <p className="text-slate-400">Create, edit, and delete upcoming events with images and details</p>
              </div>
              <span className="text-3xl">→</span>
            </div>
          </Link>

          {/* 2. Manage Past Events */}
          <Link
            to="/admin/dashboard/past-events"
            className="glass-card p-6 rounded-lg hover:border-blue-500 transition cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition">
                  📸 Past Events
                </h2>
                <p className="text-slate-400">Archive completed events with cover photos and Google Drive gallery links</p>
              </div>
              <span className="text-3xl">→</span>
            </div>
          </Link>

          {/* 3. Manage Announcements */}
          <Link
            to="/admin/dashboard/announcements"
            className="glass-card p-6 rounded-lg hover:border-purple-500 transition cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold gradient-text mb-2 group-hover:text-purple-400 transition">
                  📢 Announcements
                </h2>
                <p className="text-slate-400">Create, edit, and delete important announcements</p>
              </div>
              <span className="text-3xl">→</span>
            </div>
          </Link>

          {/* 4. NEW: Manage Team */}
          <Link
            to="/admin/dashboard/team"
            className="glass-card p-6 rounded-lg hover:border-teal-500 transition cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-teal-400 mb-2 group-hover:text-teal-300 transition">
                  👥 Manage Team
                </h2>
                <p className="text-slate-400">Invite new leads, track profile setups, and revoke access.</p>
              </div>
              <span className="text-3xl">→</span>
            </div>
          </Link>

        </div>

        {/* Main Content Area */}
        <div className="glass-card p-6 rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;