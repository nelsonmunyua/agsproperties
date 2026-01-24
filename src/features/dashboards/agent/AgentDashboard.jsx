import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, Plus, Building, DollarSign, Users, Calendar, LogOut, Eye, Edit, Trash2 } from 'lucide-react';

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const containerStyle = {
    minHeight: '100vh',
    background: '#f5f5f5',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const sidebarStyle = {
    width: '260px',
    background: '#2c3e50',
    minHeight: '100vh',
    padding: '20px 0',
    position: 'fixed',
    left: 0,
    top: 0,
  };

  const logoStyle = {
    fontSize: '22px',
    fontWeight: '700',
    color: '#fff',
    padding: '0 20px 30px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    marginBottom: '20px',
  };

  const navItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 20px',
    color: isActive ? '#3498db' : '#bdc3c7',
    background: isActive ? 'rgba(52, 152, 219, 0.1)' : 'transparent',
    cursor: 'pointer',
    fontSize: '15px',
    transition: 'all 0.3s',
    borderLeft: isActive ? '3px solid #3498db' : '3px solid transparent',
  });

  const mainContentStyle = {
    marginLeft: '260px',
    padding: '30px',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '600',
    color: '#2c3e50',
  };

  const addButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'background 0.3s',
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
    marginBottom: '30px',
  };

  const statCardStyle = (color) => ({
    background: '#fff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    borderLeft: `4px solid ${color}`,
  });

  const statIconStyle = (color) => ({
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: `${color}20`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    color: color,
  });

  const statNumberStyle = {
    fontSize: '32px',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '4px',
  };

  const statLabelStyle = {
    fontSize: '14px',
    color: '#7f8c8d',
  };

  const sectionStyle = {
    background: '#fff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    marginBottom: '24px',
  };

  const sectionTitleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    padding: '14px 16px',
    textAlign: 'left',
    background: '#f8f9fa',
    color: '#7f8c8d',
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const tdStyle = {
    padding: '16px',
    borderBottom: '1px solid #f5f5f5',
    color: '#2c3e50',
  };

  const actionButtonStyle = (color) => ({
    padding: '8px 12px',
    background: color,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    marginRight: '8px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  });

  const statusBadgeStyle = (status) => ({
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    background: status === 'active' ? '#27ae6020' : status === 'pending' ? '#f39c1220' : '#e74c3c20',
    color: status === 'active' ? '#27ae60' : status === 'pending' ? '#f39c12' : '#e74c3c',
  });

  const propertyImageStyle = {
    width: '80px',
    height: '60px',
    borderRadius: '8px',
    objectFit: 'cover',
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div style={logoStyle}>Agsproperties</div>
        <nav>
          <div 
            style={navItemStyle(activeTab === 'overview')} 
            onClick={() => setActiveTab('overview')}
          >
            <Home size={20} />
            <span>Overview</span>
          </div>
          <div 
            style={navItemStyle(activeTab === 'properties')} 
            onClick={() => setActiveTab('properties')}
          >
            <Building size={20} />
            <span>My Properties</span>
          </div>
          <div 
            style={navItemStyle(activeTab === 'inquiries')} 
            onClick={() => setActiveTab('inquiries')}
          >
            <Users size={20} />
            <span>Inquiries</span>
          </div>
          <div 
            style={navItemStyle(activeTab === 'viewings')} 
            onClick={() => setActiveTab('viewings')}
          >
            <Calendar size={20} />
            <span>Viewings</span>
          </div>
          <div 
            style={navItemStyle(activeTab === 'sales')} 
            onClick={() => setActiveTab('sales')}
          >
            <DollarSign size={20} />
            <span>Sales</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={mainContentStyle}>
        <div style={headerStyle}>
          <div>
            <h1 style={titleStyle}>Agent Dashboard</h1>
            <p style={{ color: '#7f8c8d', marginTop: '8px' }}>
              Welcome back, {userData.first_name || 'Agent'}! Here's what's happening with your listings.
            </p>
          </div>
          <button style={addButtonStyle}>
            <Plus size={20} />
            Add Property
          </button>
        </div>

        {/* Stats */}
        <div style={statsContainerStyle}>
          <div style={statCardStyle('#3498db')}>
            <div style={statIconStyle('#3498db')}>
              <Building size={24} />
            </div>
            <div style={statNumberStyle}>24</div>
            <div style={statLabelStyle}>Active Listings</div>
          </div>
          <div style={statCardStyle('#27ae60')}>
            <div style={statIconStyle('#27ae60')}>
              <Users size={24} />
            </div>
            <div style={statNumberStyle}>156</div>
            <div style={statLabelStyle}>Total Inquiries</div>
          </div>
          <div style={statCardStyle('#f39c12')}>
            <div style={statIconStyle('#f39c12')}>
              <Calendar size={24} />
            </div>
            <div style={statNumberStyle}>12</div>
            <div style={statLabelStyle}>Scheduled Viewings</div>
          </div>
          <div style={statCardStyle('#9b59b6')}>
            <div style={statIconStyle('#9b59b6')}>
              <DollarSign size={24} />
            </div>
            <div style={statNumberStyle}>₦8.5M</div>
            <div style={statLabelStyle}>This Month's Revenue</div>
          </div>
        </div>

        {/* Recent Properties */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            <Building size={22} />
            Recent Properties
          </h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Property</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Views</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGhvbWUlMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500" 
                      alt="Property" 
                      style={propertyImageStyle} 
                    />
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>4 Bedroom Bungalow</div>
                      <div style={{ fontSize: '13px', color: '#7f8c8d' }}>Karen, Nairobi</div>
                    </div>
                  </div>
                </td>
                <td style={tdStyle}>Karen, Nairobi</td>
                <td style={{ ...tdStyle, fontWeight: '600' }}>₦25,000,000</td>
                <td style={tdStyle}>
                  <span style={statusBadgeStyle('active')}>Active</span>
                </td>
                <td style={tdStyle}>234</td>
                <td style={tdStyle}>
                  <button style={actionButtonStyle('#3498db')}><Eye size={14} /> View</button>
                  <button style={actionButtonStyle('#f39c12')}><Edit size={14} /> Edit</button>
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img 
                      src="https://imgs.search.brave.com/VGVaY4G_x6I-QdfBE6c1-b2rDkRuM2lzjAxxZ3NZZwY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRpYS5pc3RvY2twaG90by5jb20vaWQvMTM2MzgxNzUzNy9waG90by9sdXh1cnktbW9kZXJuLWhvdXNlLWluLXRlcnJpb3JpdHktc29mYS1ib29rc2hlbGYtYW5kLXN0YWlyY2FzZS5qcGc_cz02MTJ4NjEyJnc9MTAmaz0yMCZjPUJZOUV2cmdMX1ZzUWtUa2V0bmNlMHl2OWxURXB2WmtWdzBZOU5rTW94Tjg9" 
                      alt="Property" 
                      style={propertyImageStyle} 
                    />
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>5 Bedroom Mansion</div>
                      <div style={{ fontSize: '13px', color: '#7f8c8d' }}>Runda, Nairobi</div>
                    </div>
                  </div>
                </td>
                <td style={tdStyle}>Runda, Nairobi</td>
                <td style={{ ...tdStyle, fontWeight: '600' }}>₦45,000,000</td>
                <td style={tdStyle}>
                  <span style={statusBadgeStyle('active')}>Active</span>
                </td>
                <td style={tdStyle}>189</td>
                <td style={tdStyle}>
                  <button style={actionButtonStyle('#3498db')}><Eye size={14} /> View</button>
                  <button style={actionButtonStyle('#f39c12')}><Edit size={14} /> Edit</button>
                </td>
              </tr>
              <tr>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img 
                      src="https://imgs.search.brave.com/jvQaZyIokhRCLEb4qisbTCNJgVDtxqwVSgUrXJcy11U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRpYS5pc3RvY2twaG90by5jb20vaWQvMTc4OTg4MTgzL3Bob3RvL2hvdXNlLWluLWJhZC1zdW1tZXItdGh1bmRlcnN0b3JtLmpwZz9zPTYxMng2MTImdz0wJms9MjAmYz1LQXhkWTFtTTRIN2l4S2h6NzMxWFhZR2Y1UzA4MWJzSGItU3lYZk5EVWRJPQ" 
                      alt="Property" 
                      style={propertyImageStyle} 
                    />
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>1 Bedroom Apartment</div>
                      <div style={{ fontSize: '13px', color: '#7f8c8d' }}>Ngong Road, Nairobi</div>
                    </div>
                  </div>
                </td>
                <td style={tdStyle}>Ngong Road, Nairobi</td>
                <td style={{ ...tdStyle, fontWeight: '600' }}>₦4,800,000</td>
                <td style={tdStyle}>
                  <span style={statusBadgeStyle('pending')}>Pending</span>
                </td>
                <td style={tdStyle}>87</td>
                <td style={tdStyle}>
                  <button style={actionButtonStyle('#3498db')}><Eye size={14} /> View</button>
                  <button style={actionButtonStyle('#f39c12')}><Edit size={14} /> Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Recent Inquiries */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            <Users size={22} />
            Recent Inquiries
          </h2>
          <div style={{ padding: '10px 0' }}>
            {[
              { name: 'John Smith', property: '4 Bedroom Bungalow, Karen', time: '2 hours ago', status: 'new' },
              { name: 'Sarah Johnson', property: '5 Bedroom Mansion, Runda', time: '5 hours ago', status: 'replied' },
              { name: 'Mike Brown', property: '2 Bedroom Apartment, Donholm', time: 'Yesterday', status: 'new' },
            ].map((inquiry, index) => (
              <div 
                key={index}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '16px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '12px',
                }}
              >
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{inquiry.name}</div>
                  <div style={{ fontSize: '14px', color: '#7f8c8d' }}>{inquiry.property}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ marginBottom: '4px' }}>
                    <span style={statusBadgeStyle(inquiry.status === 'new' ? 'pending' : 'active')}>
                      {inquiry.status === 'new' ? 'New' : 'Replied'}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#7f8c8d' }}>{inquiry.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;

