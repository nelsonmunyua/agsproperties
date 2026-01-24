import React from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';

const PendingAgentApprovals = ({
  agents = [],
  onApprove,
  onReject,
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

  const statusBadgeStyle = {
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    background: '#f39c1215',
    color: '#f39c12',
  };

  const actionButtonStyle = (bg) => ({
    padding: '8px 14px',
    background: bg,
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

  return (
    <div style={sectionStyle}>
      <div style={sectionHeaderStyle}>
        <h2 style={sectionTitleStyle}>
          <AlertTriangle size={22} color="#f39c12" />
          Pending Agent Approvals
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
            <th style={thStyle}>Agent</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Applied Date</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {agents.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#95a5a6' }}>
                No pending approvals
              </td>
            </tr>
          ) : (
            agents.map((agent, index) => (
              <tr key={index}>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={userAvatarStyle}>
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <strong>{agent.name}</strong>
                  </div>
                </td>
                <td style={tdStyle}>{agent.email}</td>
                <td style={tdStyle}>{agent.phone}</td>
                <td style={tdStyle}>{agent.date}</td>
                <td style={tdStyle}>
                  <span style={statusBadgeStyle}>Pending</span>
                </td>
                <td style={tdStyle}>
                  <button
                    style={actionButtonStyle('#27ae60')}
                    onClick={() => onApprove(agent)}
                  >
                    <Check size={14} /> Approve
                  </button>
                  <button
                    style={actionButtonStyle('#e74c3c')}
                    onClick={() => onReject(agent)}
                  >
                    <X size={14} /> Reject
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

export default PendingAgentApprovals;
