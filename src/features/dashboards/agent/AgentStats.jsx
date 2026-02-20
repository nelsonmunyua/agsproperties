import React from 'react';
import { Building, Users, Calendar, DollarSign } from 'lucide-react';
import { StatCard } from '../../dashboard/components';

const AgentStats = ({ stats }) => {
  const defaultStats = [
    {
      title: 'Active Listings',
      value: stats?.listings || 24,
      icon: <Building size={24} />,
      color: '#3498db',
      bgGradient: 'from-blue-500/20 to-blue-600/10',
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Total Inquiries',
      value: stats?.inquiries || 156,
      icon: <Users size={24} />,
      color: '#10b981',
      bgGradient: 'from-emerald-500/20 to-emerald-600/10',
      trend: '+8%',
      trendUp: true,
    },
    {
      title: 'Scheduled Viewings',
      value: stats?.viewings || 12,
      icon: <Calendar size={24} />,
      color: '#f59e0b',
      bgGradient: 'from-amber-500/20 to-amber-600/10',
      trend: '+24%',
      trendUp: true,
    },
    {
      title: "Month's Revenue",
      value: stats?.revenue || '₦8.5M',
      icon: <DollarSign size={24} />,
      color: '#8b5cf6',
      bgGradient: 'from-violet-500/20 to-violet-600/10',
      trend: '+18%',
      trendUp: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {defaultStats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          bgGradient={stat.bgGradient}
          trend={stat.trend}
          trendUp={stat.trendUp}
        />
      ))}
    </div>
  );
};

export default AgentStats;

