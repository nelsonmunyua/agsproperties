import React, {useEffect, useState} from 'react';
import { Building, Users, Calendar, DollarSign } from 'lucide-react';
import { StatCard } from '../../dashboard/components';

const AgentStats = ({ stats: propStats }) => {
    const [stats, setStats] = useState(propStats || { listings: 0, inquiries:0, viewings:0, revenue:0 })

    useEffect(() => {
        const fetchAgentStats = async () => {
            const token = localStorage.getItem("access_token");
            const apiUrl = import.meta.env.VITE_API_URL;

            try {
                const res = await fetch(`${apiUrl}/agent/stats`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch user stats:', error);
            }
        };
        fetchAgentStats()

    }, []);

  const defaultStats = [
    {
      title: 'Active Listings',
      value: stats?.listings || 0,
      icon: <Building size={24} />,
      color: '#3498db',
      bgGradient: 'from-blue-500/20 to-blue-600/10',
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Total Inquiries',
      value: stats?.inquiries || 0,
      icon: <Users size={24} />,
      color: '#10b981',
      bgGradient: 'from-emerald-500/20 to-emerald-600/10',
      trend: '+8%',
      trendUp: true,
    },
    {
      title: 'Scheduled Viewings',
      value: stats?.viewings || 0,
      icon: <Calendar size={24} />,
      color: '#f59e0b',
      bgGradient: 'from-amber-500/20 to-amber-600/10',
      trend: '+24%',
      trendUp: true,
    },
    {
      title: "Month's Revenue",
      value: stats?.revenue || 'Ksh0',
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

