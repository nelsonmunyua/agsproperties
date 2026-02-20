import React, {useState, useEffect} from 'react';
import { Eye, Calendar, MessageSquare, Clock } from 'lucide-react';

const ActivityItem = ({ activity }) => {
  const { type, description, time, property } = activity;
  
  const getIcon = () => {
    switch (type) {
      case 'view':
        return <Eye size={16} className="text-blue-500" />;
      case 'scheduled':
        return <Calendar size={16} className="text-amber-500" />;
      case 'inquiry':
        return <MessageSquare size={16} className="text-emerald-500" />;
      default:
        return <Clock size={16} className="text-slate-500" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'view':
        return 'Viewed property';
      case 'scheduled':
        return 'Scheduled viewing';
      case 'inquiry':
        return 'Inquiry sent';
      default:
        return 'Activity';
    }
  };

  return (
    <div className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-lg transition-colors">
      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-900">
          <span className="font-medium">{getTypeLabel()}</span>
          {property && <span className="text-slate-600"> in {property}</span>}
        </p>
        {description && (
          <p className="text-sm text-slate-500 truncate">{description}</p>
        )}
      </div>
      <span className="text-xs text-slate-400 whitespace-nowrap">{time}</span>
    </div>
  );
};

const UserActivity = ({ limit = 0, onViewAll }) => {
    const [activity, setActivity] = useState([])

    useEffect(() => {
        const fetchUserActivity = async () => {
            const token = localStorage.getItem('access_token');
            const apiUrl = import.meta.env.VITE_API_URL;
            
            // Build URL with limit parameter if provided
            let url = `${apiUrl}/user/recent-activity`;
            if (limit > 0) {
                url += `?limit=${limit}`;
            }

            try {
                const res = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setActivity(data.activities)
                }

            } catch (error) {
                console.error('Failed to load recent activities:', error)
            }
        };
        fetchUserActivity();
    }, [limit])



  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
        <button onClick={onViewAll} className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          View All
        </button>
      </div>
      
      {activity.length === 0 ? (
        <p className='text-slate-500 text-center py-8'>No recent activities yet</p>
      ): (
         <div className="divide-y divide-slate-100">
        {activity.map((item, index) => (
          <ActivityItem key={index} activity={item} />
        ))}
      </div>
      )}
    </div>
  );
};

export default UserActivity;

