import React from 'react';
import {
  Home,
  Users,
  Building,
  FileText,
  BarChart2,
  DollarSign,
  Settings,
  TrendingUp
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <Home size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'agents', label: 'Agents', icon: <Building size={20} /> },
    { id: 'properties', label: 'Properties', icon: <FileText size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={20} /> },
    { id: 'revenue', label: 'Revenue', icon: <DollarSign size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
            {activeTab === item.id && (
              <div className="ml-auto w-2 h-2 bg-emerald-400 rounded-full" />
            )}
          </button>
        ))}
      </nav>

      {/* Quick Stats */}
      <div className="absolute bottom-20 left-0 w-64 p-4">
        <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Quick Stats</span>
          </div>
          <p className="text-2xl font-bold">+12.5%</p>
          <p className="text-xs text-white/70">Growth this month</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

