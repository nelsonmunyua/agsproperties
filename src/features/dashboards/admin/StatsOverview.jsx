import { Users, Building, FileText, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const StatsOverview = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Users',
      value: stats[0]?.value || '0',
      color: '#3498db',
      bgGradient: 'from-blue-500/20 to-blue-600/10',
      icon: <Users size={24} />,
      trend: '+12%',
      trendUp: true
    },
    {
      label: 'Active Agents',
      value: stats[1]?.value || '0',
      color: '#10b981',
      bgGradient: 'from-emerald-500/20 to-emerald-600/10',
      icon: <Building size={24} />,
      trend: '+8%',
      trendUp: true
    },
    {
      label: 'Total Properties',
      value: stats[2]?.value || '0',
      color: '#f59e0b',
      bgGradient: 'from-amber-500/20 to-amber-600/10',
      icon: <FileText size={24} />,
      trend: '+24%',
      trendUp: true
    },
    {
      label: 'Total Revenue',
      value: stats[3]?.value || '$0',
      color: '#8b5cf6',
      bgGradient: 'from-violet-500/20 to-violet-600/10',
      icon: <DollarSign size={24} />,
      trend: '+18%',
      trendUp: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all duration-300`}
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
            >
              {stat.icon}
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${stat.trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
              {stat.trendUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {stat.trend}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
          <p className="text-slate-600 text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;

