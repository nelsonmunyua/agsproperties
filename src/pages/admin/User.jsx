
import React, { useEffect, useState } from 'react';
import { Eye, Edit, Trash2, Filter } from 'lucide-react';
import { PageHeader, SearchBar, StatusBadge, Avatar } from '../../features/dashboard/components';

const User = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'Alice Thompson', email: 'alice@example.com', role: 'User', status: 'active', joined: 'Jan 15, 2025' },
        { id: 2, name: 'Bob Martinez', email: 'bob@example.com', role: 'Agent', status: 'active', joined: 'Jan 14, 2025' },
        { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'User', status: 'inactive', joined: 'Jan 13, 2025' },
        { id: 4, name: 'David Kim', email: 'david@example.com', role: 'Agent', status: 'active', joined: 'Jan 12, 2025' },
        { id: 5, name: 'Emma Johnson', email: 'emma@example.com', role: 'User', status: 'pending', joined: 'Jan 11, 2025' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (user) => console.log('View user:', user);
  const handleEdit = (user) => console.log('Edit user:', user);
  const handleDelete = (user) => console.log('Delete user:', user);

  return (
    <div>
      <PageHeader title="Users" subtitle="Manage users and their roles on the platform" actionLabel="Add User" onAction={() => console.log('Add user clicked')} />

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} placeholder="Search users..." className="max-w-md" />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Joined</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={user.name} size="medium" />
                        <div>
                          <p className="font-medium text-slate-900">{user.name}</p>
                          <p className="text-sm text-slate-500">ID: #{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="text-sm text-slate-600">{user.email}</span></td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${user.role === 'Agent' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4"><span className="text-sm text-slate-600">{user.joined}</span></td>
                    <td className="px-6 py-4"><StatusBadge status={user.status} /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleView(user)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors" title="View"><Eye size={16} /></button>
                        <button onClick={() => handleEdit(user)} className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors" title="Edit"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(user)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" title="Delete"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;

