import React from 'react';
import { Plus } from 'lucide-react';

const PageHeader = ({ 
  title, 
  subtitle, 
  actionLabel, 
  onAction,
  children 
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {subtitle && (
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        {children}
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors"
          >
            <Plus size={18} />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;

