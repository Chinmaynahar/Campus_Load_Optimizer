import { Link } from 'react-router-dom';
import { GraduationCap, Users, Shield } from 'lucide-react';

function LoginDecide() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 fixed inset-0">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            Welcome Back
          </h1>
          <p className="text-xl text-purple-200">Choose your role to continue</p>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Student Card */}
          <Link to="/studentlogin" className="group">
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-1 hover:bg-white/15">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 text-center">Student</h3>
                <p className="text-purple-200 text-center mb-6">Access your courses and assignments</p>
                
                <div className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg text-center transform group-hover:shadow-2xl transition-all duration-300">
                  Login as Student
                </div>
              </div>
            </div>
          </Link>

          {/* Faculty Card */}
          <Link to="/facultylogin" className="group">
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-110 hover:-rotate-1 hover:bg-white/15">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 text-center">Faculty</h3>
                <p className="text-purple-200 text-center mb-6">Manage classes and students</p>
                
                <div className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg text-center transform group-hover:shadow-2xl transition-all duration-300">
                  Login as Faculty
                </div>
              </div>
            </div>
          </Link>

          {/* Admin Card */}
          <Link to="/adminlogin" className="group">
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-1 hover:bg-white/15">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 text-center">Admin</h3>
                <p className="text-purple-200 text-center mb-6">System administration panel</p>
                
                <div className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg text-center transform group-hover:shadow-2xl transition-all duration-300">
                  Login as Admin
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-purple-200">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-300 hover:text-cyan-200 font-semibold underline decoration-2 underline-offset-4 transition-colors">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginDecide;