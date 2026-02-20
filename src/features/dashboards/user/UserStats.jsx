import React, { useEffect, useState } from 'react';
import { Heart, MessageSquare, Calendar, Building } from 'lucide-react';
import { StatCard } from '../../dashboard/components';


const UserStats = ({ stats: propStats }) => {
  const [stats, setStats] = useState(propStats || { saved: 0, inquiries: 0, visits: 0 });

  useEffect(() => {
    const fetchUserStats = async () => {
      const token = localStorage.getItem('access_token');
      const apiUrl = import.meta.env.VITE_API_URL;

      try {
        const res = await fetch(`${apiUrl}/user/stats`, {
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

    fetchUserStats();
  }, []);

  const defaultStats = [
    {
      title: 'Saved Properties',
      value: stats?.saved || 0,
      icon: <Building size={24} />,
      color: '#3498db',
      bgGradient: 'from-blue-500/20 to-blue-600/10',
    },
    {
      title: 'Inquiries Sent',
      value: stats?.inquiries || 0,
      icon: <MessageSquare size={24} />,
      color: '#10b981',
      bgGradient: 'from-emerald-500/20 to-emerald-600/10',
    },
    {
      title: 'Scheduled Visits',
      value: stats?.visits || 0,
      icon: <Calendar size={24} />,
      color: '#f59e0b',
      bgGradient: 'from-amber-500/20 to-amber-600/10',
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {defaultStats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          bgGradient={stat.bgGradient}
        />
      ))}
    </div>
  );
};

export default UserStats;

