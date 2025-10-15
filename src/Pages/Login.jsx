import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json(); 
      console.log(data);

      if (!response.ok) {
        const msg = data?.error || data?.message || 'Login failed';
        alert(msg);
        return;
      }

      localStorage.setItem('accessToken', data.token);

      
      const token = localStorage.getItem('accessToken');
      const role = jwtDecode(token).role;

      console.log('Decoded role:', role);

      if (!token || !role) {
        alert('Invalid login response');
        return;
      }

      alert('Login successful');

      // Redirect by role
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user'); // or '/dashboard'
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Network or server error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Maintenance System</h1>

        <form onSubmit={handleLogin}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={submitting}
            />
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={submitting}
            />
          </div>

          <div className="flex justify-center">
            <button className="btn btn-neutral w-full" disabled={submitting}>
              {submitting ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <div>
          <p className="text-center mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
        <div>
          <p className="text-center mt-4">
            Forgot Password ?{' '}
            <Link to="/forgotPassword" className="text-blue-500 hover:underline">
              Forgot Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
