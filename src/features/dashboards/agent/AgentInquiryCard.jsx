import React from 'react';
import { Users, Clock, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../../dashboard/components';

const InquiryCard = ({ inquiry, onReply }) => {
  const { name, property, time, status = 'new' } = inquiry || {};

  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center font-bold text-white">
          {name?.[0]?.toUpperCase() || '?'}
        </div>
        <div>
          <p className="font-medium text-slate-900">{name}</p>
          <p className="text-sm text-slate-500">{property}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <StatusBadge status={status === 'new' ? 'new' : 'replied'} size="small" />
          <p className="text-xs text-slate-400 mt-1">{time}</p>
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

const AgentInquiryCard = ({ inquiries = [], onReply }) => {
  const sampleInquiries = [
    { id: 1, name: 'John Smith', property: '4 Bedroom Bungalow, Karen', time: '2 hours ago', status: 'new' },
    { id: 2, name: 'Sarah Johnson', property: '5 Bedroom Mansion, Runda', time: '5 hours ago', status: 'replied' },
    { id: 3, name: 'Mike Brown', property: '2 Bedroom Apartment, Donholm', time: 'Yesterday', status: 'new' },
  ];

  const displayInquiries = inquiries.length > 0 ? inquiries : sampleInquiries;

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
      
      <div className="space-y-3">
        {displayInquiries.map((inquiry) => (
          <InquiryCard
            key={inquiry.id}
            inquiry={inquiry}
            onReply={() => onReply?.(inquiry)}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentInquiryCard;

