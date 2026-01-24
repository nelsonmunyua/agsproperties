import React from 'react';
import { UserPlus, Eye, Trash2 } from 'lucide-react';

const RecentUsers = ({
  users = [],
  onView,
  onDelete,
}) => {
  const sectionStyle = {
    background: '#fff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    marginBottom: '24px',
  };

  const sectionHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
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
  };

  const tdStyle = {
    padding: '16px',
    borderBottom: '1px solid #f5f5f5',
    color: '#2c3e50',
    verticalAlign: 'middle',
  };

  const userAvatarStyle = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: '#3498db',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '14px',
  };

  const statusBadgeStyle = (status) => {
    const styles = {
      active: { background: '#27ae6015', color: '#27ae60' },
      inactive: { background: '#95a5a615', color: '#95a5a6' },
    };

    return {
      padding: '6px 14px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      ...styles[status] || styles.active,
    };
  };

  const actionButtonStyle = (color, bg) => ({
    padding: '8px 14px',
    background: bg,
    color,
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    marginRight: '8px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  });

  return (
    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>
        <h2 style={sectionTitleStyle}>
          <UserPlus size={22} color="#3498db" />
          Recent Users
        </h2>
        <button
          style={{
            padding: '8px 16px',
            background: '#3498db',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          View All
        </button>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>User</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Joined Date</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#95a5a6' }}>
                No users found
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={index}>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={userAvatarStyle}>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <strong>{user.name}</strong>
                  </div>
                </td>

                <td style={tdStyle}>{user.email}</td>

                <td style={tdStyle}>
                  <span
                    style={{
                      padding: '4px 12px',
                      background: user.role === 'Agent' ? '#3498db15' : '#27ae6015',
                      color: user.role === 'Agent' ? '#3498db' : '#27ae60',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}
                  >
                    {user.role}
                  </span>
                </td>

                <td style={tdStyle}>{user.date}</td>

                <td style={tdStyle}>
                  <span style={statusBadgeStyle(user.status)}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>

                <td style={tdStyle}>
                  <button
                    style={actionButtonStyle('#3498db', '#f0f7ff')}
                    onClick={() => onView?.(user)}
                  >
                    <Eye size={14} /> View
                  </button>
                  <button
                    style={actionButtonStyle('#e74c3c', '#fdf2f2')}
                    onClick={() => onDelete?.(user)}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentUsers;
