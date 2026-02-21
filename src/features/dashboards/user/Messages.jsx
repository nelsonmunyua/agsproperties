import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Mail, Building, Search, MoreVertical, Check, CheckCheck, MessageSquare, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/user';
import UserHeader from './UserHeader';

export default function Messages() {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const isLoggedIn = !!localStorage.getItem('access_token');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin');
      return;
    }
    fetchConversations();
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (conversationId) {
      fetchMessages(conversationId);
    }
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      const data = await api.getConversations();
      setConversations(data.conversations || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (convId) => {
    try {
      const data = await api.getConversationMessages(convId);
      setMessages(data.messages || []);
      
      const conv = conversations.find(c => c.id === parseInt(convId));
      if (conv) {
        setSelectedConversation(conv);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    setSending(true);
    try {
      const data = await api.sendMessage(selectedConversation.id, newMessage);
      setMessages(prev => [...prev, data.msg]);
      setNewMessage('');
      fetchConversations();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleSelectConversation = (conv) => {
    setSelectedConversation(conv);
    navigate(`/user/messages/${conv.id}`);
    fetchMessages(conv.id);
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const date = new Date(timeStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const filteredConversations = conversations.filter(conv => 
    conv.agent?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.property?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If we're on a specific conversation, show chat view
  if (conversationId && selectedConversation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <UserHeader userData={userData} onLogout={handleLogout} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[calc(100vh-220px)]">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 px-6 py-4 flex items-center gap-4">
              <button 
                onClick={() => navigate('/user/messages')}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <ArrowLeft size={20} className="text-white" />
              </button>
              
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-white ring-2 ring-white/30">
                {getInitials(selectedConversation.agent?.name)}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-white text-lg">{selectedConversation.agent?.name}</h3>
                {selectedConversation.property && (
                  <p className="text-white/80 text-sm flex items-center gap-1">
                    <Building size={12} />
                    {selectedConversation.property.title}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2.5 hover:bg-white/20 rounded-xl transition-colors">
                  <Phone size={18} className="text-white" />
                </button>
                <button className="p-2.5 hover:bg-white/20 rounded-xl transition-colors">
                  <Mail size={18} className="text-white" />
                </button>
                <button className="p-2.5 hover:bg-white/20 rounded-xl transition-colors">
                  <MoreVertical size={18} className="text-white" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 h-[calc(100vh-380px)] bg-slate-50">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender_type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`max-w-[70%] ${msg.sender_type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div 
                      className={`px-5 py-3 rounded-2xl shadow-sm ${
                        msg.sender_type === 'user' 
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-br-md' 
                          : 'bg-white border border-slate-200 text-slate-800 rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                    <div className={`flex items-center gap-1 mt-1.5 ${msg.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-xs text-slate-400">{msg.created_at}</span>
                      {msg.sender_type === 'user' && (
                        msg.is_read ? 
                          <CheckCheck size={14} className="text-emerald-500" /> : 
                          <Check size={14} className="text-slate-400" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t p-4">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-5 py-3 bg-slate-100 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || sending}
                  className="p-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:from-slate-300 disabled:to-slate-300 text-white rounded-2xl transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: Show conversations list
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <UserHeader userData={userData} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 border-b bg-slate-50">
              <h2 className="text-xl font-bold text-slate-900 mb-3">Messages</h2>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto h-[calc(100vh-350px)]">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-slate-500">Loading conversations...</p>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageSquare size={28} className="text-slate-400" />
                  </div>
                  <p className="text-slate-600 font-medium">No conversations yet</p>
                  <p className="text-slate-400 text-sm mt-1">Start a conversation by contacting an agent</p>
                </div>
              ) : (
                filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv)}
                    className={`p-4 border-b cursor-pointer transition-all hover:bg-slate-50 ${
                      selectedConversation?.id === conv.id ? 'bg-emerald-50 border-l-4 border-l-emerald-500' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20">
                          {getInitials(conv.agent?.name)}
                        </div>
                        {conv.unread_count > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                            {conv.unread_count}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-semibold ${conv.unread_count > 0 ? 'text-slate-900' : 'text-slate-700'}`}>
                            {conv.agent?.name}
                          </h3>
                          <span className="text-xs text-slate-400 font-medium">
                            {formatTime(conv.last_message_at)}
                          </span>
                        </div>
                        {conv.property && (
                          <p className="text-xs text-emerald-600 mb-1.5 truncate flex items-center gap-1 font-medium">
                            <Building size={10} />
                            {conv.property.title}
                          </p>
                        )}
                        <p className={`text-sm truncate ${conv.unread_count > 0 ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>
                          {conv.last_message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Empty State for Desktop */}
          <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
            <div className="text-center p-8">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <MessageSquare size={48} className="text-slate-300" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Your Messages</h2>
              <p className="text-slate-500 max-w-md mx-auto">
                Select a conversation from the list to start messaging or contact an agent from a property listing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

