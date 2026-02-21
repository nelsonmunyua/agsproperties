import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Bed, Bath, Square, MapPin, Eye, MessageSquare, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import UserHeader from './UserHeader';
import api from '../../../services/user';

const ActivityItem = ({ activity }) => {
  const { type, description, time, property } = activity;
  
  const getIcon = () => {
    switch (type) {
      case 'view':
        return <Eye size={16} className="text-blue-500" />;
      case 'viewing':
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
      case 'viewing':
        return 'Scheduled viewing';
      case 'inquiry':
        return 'Inquiry sent';
      default:
        return 'Activity';
    }
  };

  return (
    <div className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-lg transition-colors">
      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
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

const PropertyCard = ({ property, onView, onRemove }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={property?.primary_image || "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=400"}
          alt={property?.title || "property"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full">
            {property?.listing_type || 'For Sale'}
          </span>
        </div>
        <button
          onClick={() => onRemove(property)}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-red-50 text-red-500 rounded-full transition-colors"
        >
          <Heart size={16} className="fill-current" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-base font-semibold text-slate-900 mb-2 line-clamp-1">{property?.title}</h3>
        
        <div className="flex items-center gap-1 text-sm text-slate-500 mb-3">
          <MapPin size={14} />
          <span>{property?.location || 'Location'}</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
          <span className="flex items-center gap-1">
            <Bed size={16} />
            {property?.bedrooms || 0} beds
          </span>
          <span className="flex items-center gap-1">
            <Bath size={16} />
            {property?.bathrooms || 0} baths
          </span>
          <span className="flex items-center gap-1">
            <Square size={16} />
            {property?.area_size || 0} sqft
          </span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-lg font-bold text-emerald-600">{property?.currency}{property?.price}</span>
          <button
            onClick={() => onView(property)}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 rounded-lg text-sm font-medium transition-colors"
          >
            <Eye size={14} />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [activities, setActivities] = useState([]);
  const [scheduledVisits, setScheduledVisits] = useState([]);
  const [activeTab, setActiveTab] = useState('properties');

  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token');
      const apiUrl = import.meta.env.VITE_API_URL;

      try {
        // Fetch all saved properties (no limit)
        const propertiesRes = await fetch(`${apiUrl}/user/saved-properties`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (propertiesRes.ok) {
          const propertiesData = await propertiesRes.json();
          setProperties(propertiesData.properties || []);
        }

        // Fetch all recent activities (no limit)
        const activitiesRes = await fetch(`${apiUrl}/user/recent-activity`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (activitiesRes.ok) {
          const activitiesData = await activitiesRes.json();
          setActivities(activitiesData.activities || []);
        }

        // Fetch all scheduled visits
        const visitsData = await api.getScheduledVisits();
        setScheduledVisits(visitsData.visits || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewProperty = (property) => {
    navigate(`/user/property/${property.id}`);
  };

  const handleRemoveProperty = async (property) => {
    const token = localStorage.getItem('access_token');
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const res = await fetch(`${apiUrl}/user/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ property_id: property.id }),
      });

      if (res.ok) {
        setProperties(properties.filter(p => p.id !== property.id));
      }
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <UserHeader userData={userData} onLogout={handleLogout} />

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'properties'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Saved Properties ({properties.length})
          </button>
          <button
            onClick={() => setActiveTab('visits')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'visits'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Scheduled Visits ({scheduledVisits.length})
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'activities'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Recent Activity ({activities.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'properties' ? (
          <div>
            {properties.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
                <Heart size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No saved properties yet</h3>
                <p className="text-slate-500 mb-4">Start exploring properties and save your favorites</p>
                <button
                  onClick={() => navigate('/user/properties')}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Browse Properties
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onView={handleViewProperty}
                    onRemove={handleRemoveProperty}
                  />
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'visits' ? (
          <div>
            {scheduledVisits.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
                <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No scheduled visits yet</h3>
                <p className="text-slate-500 mb-4">Schedule a visit to properties you're interested in</p>
                <button
                  onClick={() => navigate('/user/properties')}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Browse Properties
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scheduledVisits.map((visit) => (
                  <div key={visit.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={visit.property?.image || "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=400"}
                        alt={visit.property?.title || "property"}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 text-white text-xs font-semibold rounded-full ${
                          visit.status === 'pending' ? 'bg-amber-500' : 'bg-green-500'
                        }`}>
                          {visit.status === 'pending' ? 'Pending' : 'Completed'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-slate-900 mb-2 line-clamp-1">{visit.property?.title}</h3>
                      
                      <div className="flex items-center gap-1 text-sm text-slate-500 mb-3">
                        <MapPin size={14} />
                        <span>{visit.property?.location || 'Location'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                        <Calendar size={14} className="text-amber-500" />
                        <span>{visit.scheduled_time}</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <span className="text-lg font-bold text-emerald-600">
                          {visit.property?.currency}{visit.property?.price}
                        </span>
                        <button
                          onClick={() => navigate(`/user/property/${visit.property?.id}`)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Eye size={14} />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {activities.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
                <Clock size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No recent activities yet</h3>
                <p className="text-slate-500">Your property views and inquiries will appear here</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="divide-y divide-slate-100">
                  {activities.map((item, index) => (
                    <ActivityItem key={index} activity={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;

