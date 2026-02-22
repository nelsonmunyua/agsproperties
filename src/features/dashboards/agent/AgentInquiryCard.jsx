import React, { useEffect, useState } from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../../dashboard/components';
import api from '../../../services/agent';

const InquiryCard = ({ inquiry, onReply }) => {
  const { name, property, time, status = 'new' } = inquiry || {};

  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center font-bold text-white">
          {name?.[0]?.toUpperCase() || '?'}
        </div>
        <div>
          <p className="font-medium text-slate-900">{name || 'Unknown'}</p>
          <p className="text-sm text-slate-500">{property || 'No property'}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <StatusBadge status={status === 'new' ? 'new' : status === 'replied' ? 'replied' : 'closed'} size="small" />
          <p className="text-xs text-slate-400 mt-1">{time || 'Just now'}</p>
        </div>
        <button
          onClick={onReply}
          className="p-2 hover:bg-white text-slate-400 hover:text-emerald-600 rounded-lg transition-colors"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

const AgentInquiryCard = ({ inquiries: propInquiries, onReply }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If inquiries are passed via props, use them
    if (propInquiries && propInquiries.length > 0) {
      setInquiries(propInquiries);
      setLoading(false);
      return;
    }

    const fetchInquiries = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await api.getInquiries(5);
        setInquiries(data.inquiries || []);
      } catch (err) {
        console.error('Failed to fetch inquiries:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [propInquiries]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Users size={20} className="text-emerald-600" />
          Recent Inquiries
        </h2>
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          View All
        </button>
      </div>
      
      {loading ? (
        <div className="text-center text-slate-500 py-4">Loading inquiries...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : inquiries.length === 0 ? (
        <div className="text-center text-slate-500 py-4">No inquiries yet</div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inquiry) => (
            <InquiryCard
              key={inquiry.id}
              inquiry={inquiry}
              onReply={() => onReply?.(inquiry)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentInquiryCard;

