import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Users, Building, DollarSign, Settings, 
  BarChart2, FileText, LogOut, Shield, UserPlus,
  Eye, Edit, Trash2, Check, X, AlertTriangle
} from 'lucide-react';
import Header from './Header';
import Sidebar from './Sidebar';
import PendingAgentApprovals from './PendingAgentApprovals';
import RecentUsers from './RecentUsers';
import SystemOverview from './SystemOverview';
import StatsOverview from './StatsOverview';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const agents = [
    { name: 'James Wilson', email: 'james@example.com', phone: '+254 712 345 678', date: 'Jan 15, 2025' },
    { name: 'Emily Davis', email: 'emily@example.com', phone: '+254 723 456 789', date: 'Jan 14, 2025' },
    { name: 'Robert Chen', email: 'robert@example.com', phone: '+254 734 567 890', date: 'Jan 13, 2025' },
  ];

  const handleApprove = (agent) => {
    console.log('Approved:', agent);
  };

  const handleReject = (agent) => {
    console.log('Rejected:', agent);
  };

  const recentUsers = [
  { name: 'Alice Thompson', email: 'alice@example.com', role: 'User', date: 'Jan 15, 2025', status: 'active' },
  { name: 'Bob Martinez', email: 'bob@example.com', role: 'Agent', date: 'Jan 14, 2025', status: 'active' },
  { name: 'Carol White', email: 'carol@example.com', role: 'User', date: 'Jan 13, 2025', status: 'inactive' },
];

const systemStats = [
  { label: 'System Uptime', value: '99.9%', color: '#27ae60' },
  { label: 'Avg Response Time', value: '45ms', color: '#3498db' },
  { label: 'Open Tickets', value: '12', color: '#f39c12' },
  { label: 'Critical Alerts', value: '0', color: '#e74c3c' },
];

 const stats = [
    { label: 'Total Users', value: '1,234', color: '#3498db', icon: <Users size={28} /> },
    { label: 'Active Agents', value: '456', color: '#27ae60', icon: <Building size={28} /> },
    { label: 'Total Properties', value: '2,891', color: '#f39c12', icon: <FileText size={28} /> },
    { label: 'Total Revenue', value: '₦45.2M', color: '#9b59b6', icon: <DollarSign size={28} /> },
  ];


  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const containerStyle = {
    minHeight: '100vh',
    background: '#f1f2f6',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const mainContainerStyle = {
    display: 'flex',
    minHeight: 'calc(100vh - 74px)',
  };


  const contentStyle = {
    flex: 1,
    padding: '30px',
  };



  return (
    <div style={containerStyle}>
      {/* Header */}
      
      <Header handleLogout={handleLogout} userData={userData}/>

      <div style={mainContainerStyle}>
        {/* Sidebar */}
       
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab}  />

        {/* Main Content */}
        <main style={contentStyle}>
          {/* Stats */}
          
          <StatsOverview stats={stats}/>


          {/* Pending Agent Approvals */}
          <PendingAgentApprovals
          agents={agents}
          onApprove={handleApprove}
          onReject={handleReject}  
          />

          {/* Recent Users */}
          <RecentUsers
              users={recentUsers}
              onView={(user) => console.log('View:', user)}
              onDelete={(user) => console.log('Delete:', user)}
            />

          {/* System Overview */}
          <SystemOverview stats={systemStats} />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

