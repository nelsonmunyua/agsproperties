import React, { useState } from 'react';
import { X, MessageSquare, Send, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/user';

export default function InquiryModal({ property, agent, onClose, onSuccess }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isLoggedIn = !!localStorage.getItem('access_token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }

    if (!isLoggedIn) {
      setError('Please sign in to send an inquiry');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create inquiry record (for stats and activity tracking)
      await api.createInquiry(
        property.id, 
        message
      );
      
      // Start a new conversation for messaging
      const data = await api.startConversation(
        agent.id, 
        property.id, 
        message
      );
      
      setMessage('');
      if (onSuccess) {
        onSuccess();
      }
      onClose();
      
      // Navigate to the messages page with the new conversation
      navigate(`/user/messages/${data.conversation_id}`);
    } catch (err) {
      setError(err.message || 'Failed to start conversation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Default message template
  const handleQuickMessage = (template) => {
    const baseMessage = `Hi, I'm interested in "${property?.title}". `;
    setMessage(baseMessage + template);
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
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Contact Agent
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
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center font-bold text-white">
              {agent.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <p className="font-medium text-gray-900">{agent.name}</p>
              <p className="text-sm text-gray-500">{agent.email}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          {!isLoggedIn ? (
            <div className="text-center py-6">
              <p className="text-gray-600 mb-4">
                Please sign in to contact the agent about this property.
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
                  Your Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message to the agent..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  rows="4"
                />
              </div>

              {/* Quick Messages */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Quick messages:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickMessage("I'd like to schedule a viewing.")}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    Schedule viewing
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickMessage("I'm interested in this property. Please contact me.")}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    I'm interested
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickMessage("I'd like more information about this property.")}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    More info
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Start Conversation
                  </>
                )}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

