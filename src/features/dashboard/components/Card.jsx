import React from 'react';

const Card = ({ 
  children, 
  className = "",
  title,
  subtitle,
  action,
  padding = true,
  hover = false
}) => {
  return (
    <div 
      className={`
        bg-white rounded-xl shadow-sm border border-slate-100 
        ${hover ? 'hover:shadow-md transition-shadow duration-200' : ''}
        ${className}
      `}
    >
      {(title || action) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={padding ? 'p-6' : ''}>
        {children}
      </div>
    </div>
  );
};

export default Card;

