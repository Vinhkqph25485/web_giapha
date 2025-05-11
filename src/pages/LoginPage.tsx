import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { login } from '../services/api';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await login(username, password);
      
      if (response && response.access) {
        // If remember me is checked, the cookie will already be set for 7 days
        // Otherwise we can handle shorter expiry here if needed
        
        setTimeout(() => {
          navigate('/quan-tri-tin-tuc');
        }, 500);
      }
    } catch (error: any) {
      setError(error.response?.data?.detail || 'Tên đăng nhập hoặc mật khẩu không đúng');
      const form = document.querySelector('.login-form');
      form?.classList.add('shake');
      setTimeout(() => {
        form?.classList.remove('shake');
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Home link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="flex items-center px-4 py-2 rounded-full bg-white text-[#8B0000] hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <FaHome className="mr-2" />
          <span>Trang chủ</span>
        </Link>
      </div>
      
      {/* Full screen container with centered card */}
      <div className="w-full flex justify-center items-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden rounded-xl shadow-2xl"
        >
          {/* Left side - Login Form with white background */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8 relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#8B0000]"></div>
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">
                Đăng nhập
              </h2>
              <div className="w-10 h-1 bg-[#8B0000] mx-auto mb-6"></div>
              
              {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form className="space-y-5 login-form" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full pl-10 border-b-2 border-gray-300 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
                      placeholder="Username"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 border-b-2 border-gray-300 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                      Ghi nhớ đăng nhập
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-500 hover:text-blue-600 transition-colors duration-200">
                      Quên mật khẩu?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#8B0000] hover:bg-[#a52a2a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B0000] transition-all duration-300"
                  >
                    {loading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : "Đăng nhập"}
                  </button>
                </div>
              </form>

              {/* <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account? <a href="#" className="font-medium text-blue-500 hover:text-blue-600 transition-colors duration-200">Sign up</a>
                </p>
              </div> */}
            </div>
          </div>
          
          {/* Right side - Background with welcome message */}
          <div className="hidden md:flex md:w-1/2 bg-[#8B0000] flex-col justify-center items-center p-12 text-white relative overflow-hidden">
            {/* Decorative pattern overlay */}
            <div className="absolute inset-0 opacity-20 bg-pattern" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
            
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <FaUser className="h-10 w-10" />
              </div>
              <h1 className="text-4xl font-bold mb-4">CHÀO MỪNG!</h1>
              <div className="w-16 h-1 bg-white mx-auto mb-6"></div>
              <p className="text-center text-white/80 max-w-xs mb-8">
                Đăng nhập để truy cập vào hệ thống quản lý gia phả và tương tác với các tính năng quản trị.
              </p>
              <div className="text-sm text-white/70">
                Hệ thống quản lý gia phả • {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;