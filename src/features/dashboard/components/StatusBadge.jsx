import React from 'react';

const StatusBadge = ({ status, size = "medium" }) => {
  const statusConfig = {
    active: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Active' },
    inactive: { bg: 'bg-slate-100', text: 'text-slate-600', label: 'Inactive' },
    pending: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Pending' },
    approved: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Approved' },
    rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejected' },
    verified: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Verified' },
    unverified: { bg: 'bg-slate-100', text: 'text-slate-600', label: 'Unverified' },
    new: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'New' },
    replied: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Replied' },
    sold: { bg: 'bg-violet-100', text: 'text-violet-700', label: 'Sold' },
    available: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Available' },
  };

  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-3 py-1 text-xs',
    large: 'px-4 py-1.5 text-sm',
  };

  const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${config.bg} ${config.text} ${sizeClasses[size]}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;

