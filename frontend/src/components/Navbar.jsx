import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-blue-600 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"/>
              </svg>
            </div>
            <span className="text-white font-bold text-2xl">GigFlow</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/" className="text-white hover:bg-white/20 px-3 py-2 rounded-lg transition-all">
                  Browse Gigs
                </Link>
                <Link to="/create-gig" className="text-white hover:bg-white/20 px-3 py-2 rounded-lg transition-all">
                  Post a Gig
                </Link>
                <Link to="/my-gigs" className="text-white hover:bg-white/20 px-3 py-2 rounded-lg transition-all">
                  My Gigs
                </Link>
                <Link to="/dashboard" className="text-white hover:bg-white/20 px-3 py-2 rounded-lg transition-all">
                  Dashboard
                </Link>
                <div className="flex items-center space-x-3 ml-4">
                  <div className="bg-white/20 px-4 py-2 rounded-lg">
                    <span className="text-white font-medium">{user.name}</span>
                    {user.role === 'admin' && (
                      <span className="ml-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold">
                        ADMIN
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-all">
                  Login
                </Link>
                <Link to="/register" className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;