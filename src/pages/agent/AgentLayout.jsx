import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Building, Users, Calendar, DollarSign, BarChart2, Settings, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

const AgentLayout = ({ children, activeTab = 'properties' }) => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const handleNavigation = (tab) => {
    switch(tab) {
      case 'overview':
        navigate('/agent-dashboard');
        break;
      case 'properties':
        navigate('/agent/properties');
        break;
      default:
        break;
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <Home size={20} /> },
    { id: 'properties', label: 'My Properties', icon: <Building size={20} /> },
    { id: 'inquiries', label: 'Inquiries', icon: <Users size={20} /> },
    { id: 'viewings', label: 'Viewings', icon: <Calendar size={20} /> },
    { id: 'sales', label: 'Sales', icon: <DollarSign size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Fixed Sidebar */}
      <aside 
        className={`bg-slate-900 min-h-screen flex flex-col flex-shrink-0 fixed left-0 top-0 transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center flex-shrink-0">
              <Home className="w-6 h-6 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-white">AgsProperties</h1>
                <p className="text-xs text-slate-400">Agent Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              } ${sidebarCollapsed ? 'justify-center' : ''}`}
              title={sidebarCollapsed ? item.label : ''}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-800 space-y-1">
          <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <Settings size={20} />
            {!sidebarCollapsed && <span className="font-medium">Settings</span>}
          </button>
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            {!sidebarCollapsed && <span className="font-medium text-red-400">Logout</span>}
            {sidebarCollapsed && <span className="font-medium text-red-400" title="Logout">⬤</span>}
          </button>
        </div>

        {/* Quick Stats */}
        {!sidebarCollapsed && (
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
        )}

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-1/2 -right-3 bg-slate-700 text-white rounded-full p-1 hover:bg-slate-600 transition-colors z-20"
          style={{ transform: 'translateY(-50%)' }}
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      {/* Main Content - Scrollable */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Fixed Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 fixed top-0 right-0 z-10 transition-all duration-300" style={{ left: sidebarCollapsed ? '80px' : '256px' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-slate-900">
                {activeTab === 'properties' ? 'My Properties' : 
                 activeTab === 'overview' ? 'Dashboard Overview' : 
                 activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-semibold">
                  {userData.name?.charAt(0) || 'A'}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{userData.name || 'Agent'}</p>
                  <p className="text-xs text-slate-500">{userData.email || ''}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto mt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AgentLayout;

