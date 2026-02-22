import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AgentSidebar, AgentHeader, AgentStats, AgentPropertyTable, AgentInquiryCard } from './index';

const AgentDashboard = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const handleViewAllProperties = () => {
    navigate('/agent/properties');
  };

  const handleViewProperty = (property) => {
    navigate(`/agent/properties/${property.id}`);
  };

  const handleEditProperty = (property) => {
    navigate(`/agent/properties/${property.id}/edit`);
  };

  const handleNavigation = (tab) => {
    switch(tab) {
      case 'properties':
        navigate('/agent/properties');
        break;
      case 'overview':
      default:
        // Stay on dashboard overview
        break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AgentSidebar onNavigate={handleNavigation} />
      
      <div className="flex-1 flex flex-col">
        <AgentHeader userData={userData} onLogout={handleLogout} />
        
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <AgentStats />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <AgentPropertyTable 
                onAddProperty={handleViewAllProperties}
                onViewProperty={handleViewProperty}
                onEditProperty={handleEditProperty}
              />
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

