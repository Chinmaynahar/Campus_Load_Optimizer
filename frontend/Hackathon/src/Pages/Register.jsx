import { Link } from 'react-router-dom';
import { User, Mail, Lock, UserCircle, ArrowLeft } from 'lucide-react';

function Register() {
  const handleRegister = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
      role: formData.get('role'),
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password')
    };
    
    console.log('Registration data:', data);
    // Add your registration logic here
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center p-4 fixed inset-0 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* Back button */}
      <Link to="/" className="absolute top-8 left-8 text-white/80 hover:text-white transition-colors flex items-center gap-2 group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back</span>
      </Link>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-3xl shadow-2xl mb-4 transform hover:rotate-6 transition-transform duration-300">
            <UserCircle className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Register Now</h2>
          <p className="text-emerald-200">Create your account to get started</p>
        </div>

        {/* Register Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium text-emerald-100">
                Register as
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-emerald-300 group-focus-within:text-emerald-200 transition-colors" />
                </div>
                <select
                  id="role"
                  name="role"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 hover:bg-white/10 appearance-none cursor-pointer"
                >
                  <option value="student" className="bg-gray-800">Student</option>
                  <option value="faculty" className="bg-gray-800">Faculty</option>
                  <option value="admin" className="bg-gray-800">Admin</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-emerald-100">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-emerald-300 group-focus-within:text-emerald-200 transition-colors" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-emerald-100">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-emerald-300 group-focus-within:text-emerald-200 transition-colors" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-emerald-100">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-emerald-300 group-focus-within:text-emerald-200 transition-colors" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                  placeholder="Create a password"
                />
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start text-sm text-emerald-200 cursor-pointer group">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-0 cursor-pointer"
              />
              <span className="ml-2 group-hover:text-white transition-colors">
                I agree to the <a href="#" className="text-cyan-300 hover:text-cyan-200 underline">Terms & Conditions</a>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-emerald-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-emerald-200">or</span>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center text-emerald-200">
            Already have an account?{' '}
            <Link
              to="/"
              className="text-cyan-300 hover:text-cyan-200 font-semibold transition-colors underline decoration-2 underline-offset-4"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;