import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Users,
  Building,
  FileText,
  BarChart2,
  DollarSign,
  Settings
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {

  const sidebarStyle = {
    width: '260px',
    background: '#fff',
    padding: '20px 0',
    borderRight: '1px solid #e0e0e0',
  };

  const navItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 24px',
    color: isActive ? '#3498db' : '#7f8c8d',
    background: isActive ? '#f0f7ff' : 'transparent',
    cursor: 'pointer',
    fontWeight: isActive ? '600' : '400',
    borderRight: isActive ? '3px solid #3498db' : '3px solid transparent',
  });

  const items = [
    { id: 'overview', label: 'Overview', icon: <Home size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'agents', label: 'Agents', icon: <Building size={20} /> },
    { id: 'properties', label: 'Properties', icon: <FileText size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={20} /> },
    { id: 'revenue', label: 'Revenue', icon: <DollarSign size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside style={sidebarStyle}>
      <nav>
        {items.map(item => (
          <div
            key={item.id}
            style={navItemStyle(activeTab === item.id)}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
