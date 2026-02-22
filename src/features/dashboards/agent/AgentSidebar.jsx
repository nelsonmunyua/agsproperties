import React from 'react';
import {
  Home,
  Building,
  Users,
  Calendar,
  DollarSign,
  BarChart2,
  Settings,
  LogOut,
  TrendingUp
} from 'lucide-react';

const AgentSidebar = ({ onNavigate, activeTab = 'overview' }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <Home size={20} /> },
    { id: 'properties', label: 'My Properties', icon: <Building size={20} /> },
    { id: 'inquiries', label: 'Inquiries', icon: <Users size={20} /> },
    { id: 'viewings', label: 'Viewings', icon: <Calendar size={20} /> },
    { id: 'sales', label: 'Sales', icon: <DollarSign size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={20} /> },
  ];

  const handleClick = (itemId) => {
    if (onNavigate) {
      onNavigate(itemId);
    }
  };

  return (
    <aside className="w-64 bg-slate-900 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">AgsProperties</h1>
            <p className="text-xs text-slate-400">Agent Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-800 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">This Month</span>
          </div>
          <p className="text-2xl font-bold">+12.5%</p>
          <p className="text-xs text-white/70">Growth in listings</p>
        </div>
      </div>
    </aside>
  );
};

export default AgentSidebar;

