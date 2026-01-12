import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, ArrowLeft, Users } from 'lucide-react';

function FacultyLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Faculty Login:', { username, password });
    // Add your login logic here
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 flex items-center justify-center p-4 fixed inset-0 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* Back button */}
      <Link to="/" className="absolute top-8 left-8 text-white/80 hover:text-white transition-colors flex items-center gap-2 group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back</span>
      </Link>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Icon */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl shadow-2xl mb-4 transform hover:rotate-6 transition-transform duration-300">
            <Users className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Faculty Login</h2>
          <p className="text-purple-200">Access your teaching dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-purple-100">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-purple-300 group-focus-within:text-purple-200 transition-colors" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-purple-100">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-purple-300 group-focus-within:text-purple-200 transition-colors" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-purple-200 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-2 focus:ring-purple-400 focus:ring-offset-0 cursor-pointer"
                />
                <span className="ml-2 group-hover:text-white transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-purple-300 hover:text-purple-200 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-purple-200">or</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-purple-200">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-pink-300 hover:text-pink-200 font-semibold transition-colors underline decoration-2 underline-offset-4"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FacultyLogin;