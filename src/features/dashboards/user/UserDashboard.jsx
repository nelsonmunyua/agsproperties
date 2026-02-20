import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { UserHeader, UserStats, QuickSearch, SavedProperties, UserActivity } from './index';

const UserDashboard = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <UserHeader userData={userData} onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {userData.first_name || 'User'}!
          </h1>
          <p className="text-slate-600 mt-2">Find your dream property with Agsproperties</p>
        </div>

        <UserStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <QuickSearch />
            <SavedProperties />
          </div>
          <div>
            <UserActivity />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
