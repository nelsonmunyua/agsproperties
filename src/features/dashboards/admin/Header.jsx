import React from "react";
import { LogOut } from "lucide-react";

const Header = ({handleLogout, userData}) => {

    const headerStyle = {
    background: '#2c3e50',
    padding: '16px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const logoStyle = {
    fontSize: '22px',
    fontWeight: '700',
    color: '#fff',
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#fff',
  };

  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#3498db',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '16px',
  };

  return (
     <header style={headerStyle}>
            <div style={logoStyle}>Agsproperties Admin</div>
            <div style={userInfoStyle}>
              <div style={{ textAlign: 'right', marginRight: '12px' }}>
                <div style={{ fontWeight: '600', fontSize: '14px' }}>{userData.first_name || 'Admin'} {userData.last_name || 'User'}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>Administrator</div>
              </div>
              <div style={avatarStyle}>
                {userData.first_name ? userData.first_name[0].toUpperCase() : 'A'}
              </div>
              <button 
                style={{ 
                  padding: '10px 16px', 
                  background: 'rgba(255,255,255,0.1)', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  marginLeft: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </header>
  );

};

export default Header;