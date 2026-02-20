import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Check, X, Mail, Phone, Building } from 'lucide-react';
import { PageHeader, SearchBar, StatusBadge, Avatar, Card, EmptyState } from '../../features/dashboard/components';

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch agents data
  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setAgents([
        {
          id: 1,
          name: 'James Wilson',
          email: 'james@example.com',
          phone: '+254 712 345 678',
          properties: 12,
          joined: 'Jan 15, 2025',
          status: 'active',
        },
        {
          id: 2,
          name: 'Emily Davis',
          email: 'emily@example.com',
          phone: '+254 723 456 789',
          properties: 8,
          joined: 'Jan 14, 2025',
          status: 'active',
        },
        {
          id: 3,
          name: 'Robert Chen',
          email: 'robert@example.com',
          phone: '+254 734 567 890',
          properties: 5,
          joined: 'Jan 13, 2025',
          status: 'pending',
        },
        {
          id: 4,
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          phone: '+254 745 678 901',
          properties: 15,
          joined: 'Jan 12, 2025',
          status: 'active',
        },
        {
          id: 5,
          name: 'Michael Brown',
          email: 'michael@example.com',
          phone: '+254 756 789 012',
          properties: 3,
          joined: 'Jan 11, 2025',
          status: 'inactive',
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (agent) => console.log('View agent:', agent);
  const handleEdit = (agent) => console.log('Edit agent:', agent);
  const handleDelete = (agent) => console.log('Delete agent:', agent);
  const handleApprove = (agent) => console.log('Approve agent:', agent);

  return (
    <div>
      <PageHeader
        title="Agents"
        subtitle="Manage real estate agents and their approvals"
        actionLabel="Add Agent"
        onAction={() => console.log('Add agent clicked')}
      />

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search agents..."
              className="max-w-md"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>
      </Card>

      {/* Agents Table */}
      <Card padding={false}>
        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading agents...</div>
        ) : filteredAgents.length === 0 ? (
          <EmptyState
            title="No agents found"
            description="There are no agents matching your search criteria."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Properties
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAgents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={agent.name} size="medium" />
                        <div>
                          <p className="font-medium text-slate-900">{agent.name}</p>
                          <p className="text-sm text-slate-500">Agent ID: #{agent.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail size={14} className="text-slate-400" />
                          {agent.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Phone size={14} className="text-slate-400" />
                          {agent.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building size={16} className="text-slate-400" />
                        <span className="font-medium text-slate-900">{agent.properties}</span>
                        <span className="text-slate-500 text-sm">listings</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{agent.joined}</span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={agent.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {agent.status === 'pending' && (
                          <button
                            onClick={() => handleApprove(agent)}
                            className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleView(agent)}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="View"
                        >
                          <Check size={16} className="rotate-45" />
                        </button>
                        <button
                          onClick={() => handleEdit(agent)}
                          className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <MoreVertical size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(agent)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Agents;

