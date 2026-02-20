import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import User from '../../../pages/admin/User';
import Agents from '../../../pages/admin/Agents';
import Properties from '../../../pages/admin/Properties';
import Overview from '../../../pages/admin/Overview';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const agents = [
    { name: 'James Wilson', email: 'james@example.com', phone: '+254 712 345 678', date: 'Jan 15, 2025' },
    { name: 'Emily Davis', email: 'emily@example.com', phone: '+254 723 456 789', date: 'Jan 14, 2025' },
    { name: 'Robert Chen', email: 'robert@example.com', phone: '+254 734 567 890', date: 'Jan 13, 2025' },
  ];

  const handleApprove = async (agent) => {
    const token = localStorage.getItem('access_token');
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const res = await fetch(`${apiUrl}/admin/approve/${agent.id}`, {
      method: "PATCH",
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({ is_verified: true })
    });

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Failed to update');
    }

    const data = await res.json();
  

  } catch (error){
    console.error('Error:', error.message); 
  };
  };

  const handleReject = (agent) => {
    console.log('Rejected:', agent);
  };

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <User />;
      case 'agents':
        return <Agents />; 
      case 'properties':
        return <Properties />;   
      case 'overview':
      default:
        return <Overview
          agents={agents}
          onApprove={handleApprove}
          onReject={handleReject}
        />;    
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header handleLogout={handleLogout} userData={userData} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

