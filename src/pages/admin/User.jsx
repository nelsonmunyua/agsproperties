import React, { useEffect, useState } from 'react';
import { UserPlus, Eye, Edit, Trash2, Search } from 'lucide-react';

const User = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');



  // Simulated API fetch
  useEffect(() => {
    setUsers([
      {
        id: 1,
        name: 'Alice Thompson',
        email: 'alice@example.com',
        role: 'User',
        status: 'active',
        joined: 'Jan 15, 2025',
      },
      {
        id: 2,
        name: 'Bob Martinez',
        email: 'bob@example.com',
        role: 'Agent',
        status: 'active',
        joined: 'Jan 14, 2025',
      },
      {
        id: 3,
        name: 'Carol White',
        email: 'carol@example.com',
        role: 'User',
        status: 'inactive',
        joined: 'Jan 13, 2025',
      },
    ]);
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (user) => console.log('View user:', user);
  const handleEdit = (user) => console.log('Edit user:', user);
  const handleDelete = (user) => console.log('Delete user:', user);

  const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
};

const titleStyle = {
  fontSize: '26px',
  fontWeight: '700',
};

const headerActionsStyle = {
  display: 'flex',
  gap: '12px',
};

const searchBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: '#fff',
  padding: '8px 12px',
  borderRadius: '6px',
  border: '1px solid #e0e0e0',
};

const searchInputStyle = {
  border: 'none',
  outline: 'none',
  fontSize: '14px',
};

const addButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  background: '#3498db',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 14px',
  cursor: 'pointer',
  fontSize: '14px',
};

const tableWrapperStyle = {
  background: '#fff',
  borderRadius: '8px',
  overflow: 'hidden',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thStyle = {
  textAlign: 'left',
  padding: '14px',
  background: '#f8f9fa',
  fontSize: '13px',
  color: '#7f8c8d',
};

const tdStyle = {
  padding: '14px',
  borderBottom: '1px solid #f0f0f0',
  fontSize: '14px',
};

const userCellStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const avatarStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  background: '#3498db',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '600',
};

const roleBadgeStyle = (role) => ({
  padding: '4px 10px',
  borderRadius: '12px',
  fontSize: '12px',
  background: role === 'Agent' ? '#3498db15' : '#27ae6015',
  color: role === 'Agent' ? '#3498db' : '#27ae60',
});

const statusBadgeStyle = (status) => ({
  padding: '4px 10px',
  borderRadius: '12px',
  fontSize: '12px',
  background: status === 'active' ? '#27ae6015' : '#e74c3c15',
  color: status === 'active' ? '#27ae60' : '#e74c3c',
});

const actionBtn = (color) => ({
  background: `${color}15`,
  color,
  border: 'none',
  borderRadius: '6px',
  padding: '6px',
  marginRight: '6px',
  cursor: 'pointer',
});

const emptyStateStyle = {
  padding: '30px',
  textAlign: 'center',
  color: '#7f8c8d',
};


  return (
    <div>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Users</h1>

        <div style={headerActionsStyle}>
          <div style={searchBoxStyle}>
            <Search size={16} />
            <input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={searchInputStyle}
            />
          </div>

          <button style={addButtonStyle}>
            <UserPlus size={16} />
            Add User
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>User</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Joined</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td style={tdStyle}>
                  <div style={userCellStyle}>
                    <div style={avatarStyle}>
                      {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <span>{user.name}</span>
                  </div>
                </td>

                <td style={tdStyle}>{user.email}</td>

                <td style={tdStyle}>
                  <span style={roleBadgeStyle(user.role)}>
                    {user.role}
                  </span>
                </td>

                <td style={tdStyle}>{user.joined}</td>

                <td style={tdStyle}>
                  <span style={statusBadgeStyle(user.status)}>
                    {user.status}
                  </span>
                </td>

                <td style={tdStyle}>
                  <button
                    style={actionBtn('#3498db')}
                    onClick={() => handleView(user)}
                  >
                    <Eye size={14} />
                  </button>

                  <button
                    style={actionBtn('#f39c12')}
                    onClick={() => handleEdit(user)}
                  >
                    <Edit size={14} />
                  </button>

                  <button
                    style={actionBtn('#e74c3c')}
                    onClick={() => handleDelete(user)}
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div style={emptyStateStyle}>No users found</div>
        )}
      </div>
    </div>
  );
};

export default User;
