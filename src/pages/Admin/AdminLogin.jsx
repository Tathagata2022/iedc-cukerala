import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="glass-card p-8 rounded-lg max-w-md w-full">
        <h1 className="text-3xl font-bold gradient-text mb-2 text-center">Admin Login</h1>
        <p className="text-slate-400 text-center mb-6">IEDC CUK Administration</p>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-slate-300 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="admin@iedc.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 focus:border-purple-500 outline-none transition"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-slate-300 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 focus:border-purple-500 outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-button text-white font-bold py-3 rounded hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-slate-400 text-xs text-center mt-4">
          Use your Firebase admin credentials to login
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;