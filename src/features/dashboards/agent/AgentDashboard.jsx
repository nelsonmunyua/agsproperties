import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgentSidebar, AgentHeader, AgentStats, AgentPropertyTable, AgentInquiryCard } from './index';

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AgentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <AgentHeader userData={userData} onLogout={handleLogout} />
        
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Agent Dashboard</h1>
            <p className="text-slate-600 mt-2">
              Welcome back, {userData.first_name || 'Agent'}! Here's what's happening with your listings.
            </p>
          </div>

          <AgentStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <AgentPropertyTable />
            </div>
            <div>
              <AgentInquiryCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentDashboard;
