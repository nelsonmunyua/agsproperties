import React from "react";
import { LogOut, Home, Bell, Search } from "lucide-react";

const Header = ({ handleLogout, userData }) => {
  return (
    <header className="bg-slate-900 text-white px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">AgsProperties</h1>
            <p className="text-xs text-slate-400">Admin Dashboard</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-slate-800 rounded-lg px-4 py-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-400 ml-2 w-48"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
          </button>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">
                {userData.first_name || 'Admin'} {userData.last_name || 'User'}
              </p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center font-bold">
              {userData.first_name ? userData.first_name[0].toUpperCase() : 'A'}
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

