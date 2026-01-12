import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, ArrowLeft, GraduationCap } from 'lucide-react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call - Replace with your actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Example validation (replace with real authentication)
      if (username && password) {
        // Store user data in localStorage (optional)
        localStorage.setItem('studentUser', JSON.stringify({
          username: username,
          loginTime: new Date().toISOString()
        }));

        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setError('Please enter both username and password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4 fixed inset-0 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* Back button */}
      <Link to="/" className="absolute top-8 left-8 text-white/80 hover:text-white transition-colors flex items-center gap-2 group z-20">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back</span>
      </Link>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Icon */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-3xl shadow-2xl mb-4 transform hover:rotate-6 transition-transform duration-300">
            <GraduationCap className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Student Login</h2>
          <p className="text-blue-200">Welcome back! Please login to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-blue-100">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-blue-300 group-focus-within:text-blue-200 transition-colors" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-blue-100">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-blue-300 group-focus-within:text-blue-200 transition-colors" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-blue-200 cursor-pointer group">
                <input
                  type="checkbox"
                  disabled={isLoading}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-offset-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span className="ml-2 group-hover:text-white transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-blue-300 hover:text-blue-200 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-blue-200">or</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-blue-200">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-cyan-300 hover:text-cyan-200 font-semibold transition-colors underline decoration-2 underline-offset-4"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;