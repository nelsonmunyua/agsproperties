import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, Heart, User, LogOut } from 'lucide-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  
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

  const headerStyle = {
    background: '#fff',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#2c3e50',
  };

  const navStyle = {
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
  };

  const navItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#7f8c8d',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'color 0.3s',
  };

  const mainStyle = {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const welcomeStyle = {
    fontSize: '28px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '10px',
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: '#7f8c8d',
    marginBottom: '30px',
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  };

  const statCardStyle = {
    background: '#fff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s, box-shadow 0.3s',
  };

  const statNumberStyle = {
    fontSize: '36px',
    fontWeight: '700',
    color: '#3498db',
    marginBottom: '8px',
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
    paddingBottom: '12px',
    borderBottom: '2px solid #f5f5f5',
  };

  const propertyCardStyle = {
    display: 'flex',
    gap: '20px',
    padding: '16px',
    background: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '12px',
    transition: 'background 0.3s',
  };

  const propertyImageStyle = {
    width: '120px',
    height: '80px',
    background: '#e0e0e0',
    borderRadius: '8px',
    objectFit: 'cover',
  };

  const propertyInfoStyle = {
    flex: 1,
  };

  const propertyTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '8px',
  };

  const propertyDetailsStyle = {
    fontSize: '14px',
    color: '#7f8c8d',
    display: 'flex',
    gap: '15px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    background: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'background 0.3s',
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    background: '#e74c3c',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <header style={headerStyle}>
        <div style={logoStyle}>Agsproperties</div>
        <nav style={navStyle}>
          <div style={navItemStyle}>
            <Home size={18} />
            <span>Home</span>
          </div>
          <div style={navItemStyle}>
            <Search size={18} />
            <span>Search</span>
          </div>
          <div style={navItemStyle}>
            <Heart size={18} />
            <span>Favorites</span>
          </div>
          <div style={navItemStyle}>
            <User size={18} />
            <span>Profile</span>
          </div>
          <button 
            style={logoutButtonStyle}
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main style={mainStyle}>
        <h1 style={welcomeStyle}>Welcome back, {userData.first_name || 'User'}!</h1>
        <p style={subtitleStyle}>Find your dream property with Agsproperties</p>

        {/* Stats */}
        <div style={statsContainerStyle}>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>12</div>
            <div style={statLabelStyle}>Saved Properties</div>
          </div>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>5</div>
            <div style={statLabelStyle}>Inquiries Sent</div>
          </div>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>3</div>
            <div style={statLabelStyle}>Scheduled Visits</div>
          </div>
        </div>

        {/* Quick Search */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Quick Property Search</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Location..."
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '12px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            />
            <select
              style={{
                padding: '12px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                background: '#fff',
              }}
            >
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="land">Land</option>
            </select>
            <select
              style={{
                padding: '12px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                background: '#fff',
              }}
            >
              <option value="">Price Range</option>
              <option value="0-5000000">0 - 5M</option>
              <option value="5000000-10000000">5M - 10M</option>
              <option value="10000000-20000000">10M - 20M</option>
              <option value="20000000+">20M+</option>
            </select>
            <button style={buttonStyle}>Search</button>
          </div>
        </div>

        {/* Saved Properties */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Your Saved Properties</h2>
          <div style={propertyCardStyle}>
            <img
              src="https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGhvbWUlMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500"
              alt="Property"
              style={propertyImageStyle}
            />
            <div style={propertyInfoStyle}>
              <div style={propertyTitleStyle}>4 Bedroom Bungalow for Sale</div>
              <div style={propertyDetailsStyle}>
                <span>Karen, Nairobi</span>
                <span>4 beds</span>
                <span>3 baths</span>
                <span>₦25,000,000</span>
              </div>
            </div>
            <button style={buttonStyle}>View Details</button>
          </div>
          <div style={propertyCardStyle}>
            <img
              src="https://imgs.search.brave.com/VGVaY4G_x6I-QdfBE6c1-b2rDkRuM2lzjAxxZ3NZZwY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRpYS5pc3RvY2twaG90by5jb20vaWQvMTM2MzgxNzUzNy9waG90by9sdXh1cnktbW9kZXJuLWhvdXNlLWluLXRlcnJpb3JpdHktc29mYS1ib29rc2hlbGYtYW5kLXN0YWlyY2FzZS5qcGc_cz02MTJ4NjEyJnc9MTAmaz0yMCZjPUJZOUV2cmdMX1ZzUWtUa2V0bmNlMHl2OWxURXB2WmtWdzBZOU5rTW94Tjg9"
              alt="Property"
              style={propertyImageStyle}
            />
            <div style={propertyInfoStyle}>
              <div style={propertyTitleStyle}>5 Bedroom Mansion for Sale</div>
              <div style={propertyDetailsStyle}>
                <span>Runda, Nairobi</span>
                <span>5 beds</span>
                <span>4 baths</span>
                <span>₦45,000,000</span>
              </div>
            </div>
            <button style={buttonStyle}>View Details</button>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Recent Activity</h2>
          <div style={{ padding: '10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
              <span>Viewed property in Karen</span>
              <span style={{ color: '#7f8c8d', fontSize: '14px' }}>2 hours ago</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
              <span>Scheduled viewing for Kileleshwa</span>
              <span style={{ color: '#7f8c8d', fontSize: '14px' }}>Yesterday</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
              <span>Inquiry sent for apartment in Ngong Road</span>
              <span style={{ color: '#7f8c8d', fontSize: '14px' }}>3 days ago</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;

