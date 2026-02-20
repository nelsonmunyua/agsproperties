import React from 'react';

const Avatar = ({ 
  name, 
  src, 
  size = "medium",
  className = "" 
}) => {
  const sizeClasses = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-10 h-10 text-sm',
    large: 'w-12 h-12 text-base',
    xlarge: 'w-16 h-16 text-lg',
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getColorFromName = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-emerald-500',
      'bg-amber-500',
      'bg-violet-500',
      'bg-rose-500',
      'bg-cyan-500',
      'bg-orange-500',
      'bg-teal-500',
    ];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name || 'Avatar'}
        className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} ${getColorFromName(name)} rounded-full flex items-center justify-center text-white font-semibold ${className}`}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;

