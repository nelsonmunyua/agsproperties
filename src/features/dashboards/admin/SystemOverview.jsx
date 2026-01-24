import React from 'react';
import { Shield } from 'lucide-react';

const SystemOverview = ({ stats = [] }) => {
  const sectionStyle = {
    background: '#fff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    marginBottom: '24px',
  };

  const sectionHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '16px',
    borderBottom: '1px solid #f0f0f0',
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2c3e50',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  };

  const cardStyle = {
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '8px',
    textAlign: 'center',
  };

  return (
    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>
        <h2 style={sectionTitleStyle}>
          <Shield size={22} color="#9b59b6" />
          System Overview
        </h2>
      </div>

      <div style={gridStyle}>
        {stats.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#95a5a6' }}>
            No system data available
          </div>
        ) : (
          stats.map((item, index) => (
            <div key={index} style={cardStyle}>
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: item.color,
                  marginBottom: '8px',
                }}
              >
                {item.value}
              </div>
              <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
                {item.label}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SystemOverview;
