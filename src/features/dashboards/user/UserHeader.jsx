import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Home, Search, Heart, User, Tent ,LogOut, Building } from 'lucide-react';

const UserHeader = ({ userData, onLogout }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">AgsProperties</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink icon={<Home size={18} />} label="Home" active onClick={() => handleNavigation('/user-dashboard')} />
          <NavLink icon={<Tent size={18}/>} label="Properties" onClick={() => handleNavigation('/user/properties')} />
          <NavLink icon={<Search size={18} />} label="Search" onClick={() => handleNavigation('/user-dashboard')} />
          <NavLink icon={<Heart size={18} />} label="Favorites" onClick={() => handleNavigation('/user-dashboard')} />
          <NavLink icon={<User size={18} />} label="Profile" onClick={() => handleNavigation('/user-dashboard')} />
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">
                {userData.first_name || 'User'}
              </p>
              <p className="text-xs text-slate-500">Welcome back</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center font-bold text-white">
              {userData.first_name ? userData.first_name[0].toUpperCase() : 'U'}
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
      ${active 
        ? 'bg-emerald-50 text-emerald-600' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }
    `}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default UserHeader;

