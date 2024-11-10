import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#475569] flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-[#1E293B] rounded-lg shadow-xl">
        <h2 className="text-2xl font-normal mb-2">
          <span className="text-purple-400">CERTIFICATION</span>
          <span className="text-red-400">MANAGEMENT</span>
        </h2>
        
        <div className="mb-8">
          <h3 className="text-gray-300 text-lg">Hello! let's get started</h3>
          <p className="text-gray-400 text-sm">Sign in to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              className="w-full px-4 py-2 bg-[#dde1e5] text-black rounded border border-gray-700 focus:outline-none focus:border-purple-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <input
              type="password"
              className="w-full px-4 py-2 bg-[#dde1e5] text-black rounded border border-gray-700 focus:outline-none focus:border-purple-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#6C63FF] text-white rounded hover:bg-[#5A52E3] transition-colors"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
