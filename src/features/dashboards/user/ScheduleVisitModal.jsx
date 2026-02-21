import React, { useState } from 'react';
import { X, Calendar, Clock, Loader2, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/user';

export default function ScheduleVisitModal({ property, agent, onClose, onSuccess }) {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const isLoggedIn = !!localStorage.getItem('access_token');

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!date) {
      setError('Please select a date');
      return;
    }

    if (!time) {
      setError('Please select a time');
      return;
    }

    if (!isLoggedIn) {
      setError('Please sign in to schedule a visit');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.scheduleVisit(
        property.id, 
        date, 
        time, 
        message
      );
      
      setSuccess(true);
      
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to schedule visit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-amber-50">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Schedule a Visit
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Property Info */}
        {property && (
          <div className="px-4 py-3 bg-emerald-50 border-b">
            <p className="font-medium text-gray-900 truncate">{property.title}</p>
            <p className="text-sm text-gray-600">
              {property.currency} {Number(property.price).toLocaleString()}
              {property.listing_type === 'rent' && '/month'}
            </p>
          </div>
        )}

        {/* Agent Info */}
        {agent && (
          <div className="px-4 py-3 flex items-center gap-3 border-b">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center font-bold text-white">
              {agent.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <p className="font-medium text-gray-900">{agent.name}</p>
              <p className="text-sm text-gray-500">{agent.email}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit Scheduled!</h3>
            <p className="text-gray-600">Your visit has been scheduled successfully. The agent will contact you to confirm.</p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-4">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            {!isLoggedIn ? (
              <div className="text-center py-6">
                <p className="text-gray-600 mb-4">
                  Please sign in to schedule a visit to this property.
                </p>
                <a 
                  href="/signin" 
                  className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors"
                >
                  Sign In
                </a>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={today}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">Select a time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Any specific requirements or questions..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
                    rows="3"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5" />
                      Schedule Visit
                    </>
                  )}
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

