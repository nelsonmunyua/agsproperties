import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendUp = true, 
  color = "#3498db",
  bgGradient = "from-blue-500/20 to-blue-600/10"
}) => {
  const colorClasses = {
    blue: { bg: 'from-blue-500/20 to-blue-600/10', icon: 'bg-blue-100 text-blue-600' },
    emerald: { bg: 'from-emerald-500/20 to-emerald-600/10', icon: 'bg-emerald-100 text-emerald-600' },
    amber: { bg: 'from-amber-500/20 to-amber-600/10', icon: 'bg-amber-100 text-amber-600' },
    violet: { bg: 'from-violet-500/20 to-violet-600/10', icon: 'bg-violet-100 text-violet-600' },
    rose: { bg: 'from-rose-500/20 to-rose-600/10', icon: 'bg-rose-100 text-rose-600' },
    cyan: { bg: 'from-cyan-500/20 to-cyan-600/10', icon: 'bg-cyan-100 text-cyan-600' },
  };

  const colorKey = Object.keys(colorClasses).find(key => 
    color.includes(key) || bgGradient.includes(key)
  ) || 'blue';

  return (
    <div className={`bg-gradient-to-br ${colorClasses[colorKey]?.bg || bgGradient} rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[colorKey]?.icon}`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
            {trendUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {trend}
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-1">{value}</h3>
      <p className="text-slate-600 text-sm">{title}</p>
    </div>
  );
};

export default StatCard;

