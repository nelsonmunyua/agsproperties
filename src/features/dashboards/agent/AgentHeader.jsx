import React from 'react';
import { LogOut, Bell, Plus } from 'lucide-react';

const AgentHeader = ({ userData, onLogout, onAddProperty }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Welcome */}
        <div>
          <h1 className="text-xl font-bold text-slate-900">Agent Dashboard</h1>
          <p className="text-sm text-slate-500">
            Welcome back, {userData.first_name || 'Agent'}! Here's what's happening with your listings.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Add Property Button */}
          {onAddProperty && (
            <button
              onClick={onAddProperty}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors"
            >
              <Plus size={18} />
              Add Property
            </button>
          )}

          {/* Notifications */}
          <button className="relative p-2.5 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900">
                {userData.first_name || 'Agent'} {userData.last_name || ''}
              </p>
              <p className="text-xs text-slate-500">Agent</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center font-bold text-white">
              {userData.first_name ? userData.first_name[0].toUpperCase() : 'A'}
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AgentHeader;

