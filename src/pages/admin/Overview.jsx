import { BASE_URL } from "../../../utils";
import { useEffect, useState } from "react";
import { Users, Building, FileText, DollarSign } from 'lucide-react';
import React from "react";
import StatsOverview from "../../features/dashboards/admin/StatsOverview";
import PendingAgentApprovals from "../../features/dashboards/admin/PendingAgentApprovals";
import RecentUsers from "../../features/dashboards/admin/RecentUsers";
import SystemOverview from "../../features/dashboards/admin/SystemOverview";

const Overview = ({ 
    //stats,
    //agents,
    //recentUsers,
    systemStatus,
    onApprove,
    onReject }) => {
      const [stats, setStats] = useState([]);
      const [agents, setAgents] = useState([]);
      const [recentUsers, setRecentUser] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchStats = async () => {
          const token = localStorage.getItem('access_token');

          const res = await fetch(`${BASE_URL}/admin/stats`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();
          //console.log(data)

          setStats([
        {
          label: 'Total Users',
          value: data.total_users,
          color: '#3498db',
          icon: <Users size={28} />,
        },
        {
          label: 'Active Agents',
          value: data.active_agents,
          color: '#27ae60',
          icon: <Building size={28} />,
        },
        {
          label: 'Total Properties',
          value: data.total_properties,
          color: '#f39c12',
          icon: <FileText size={28} />,
        },
        {
          label: 'Total Revenue',
          value: `₦${Number(data.total_revenue).toLocaleString()}`,
          color: '#9b59b6',
          icon: <DollarSign size={28} />,
        },
      ]);

      setLoading(false);
    };

    fetchStats();
      }, []);

      useEffect(() => {
        const fetchPendingAgentApprovals = async () => {
          const token = localStorage.getItem('access_token')

          const res = await fetch(`${BASE_URL}/admin/pending-approvals`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();

          setAgents(data);
        }

        fetchPendingAgentApprovals();
      }, []);

      useEffect(() => {
        const fetchRecentUsers = async () => {
        const token = localStorage.getItem('access_token')

        const res = await fetch(`${BASE_URL}/admin/recent-users`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            
          });

          const data = await res.json();

          setRecentUser(data);
        }

        fetchRecentUsers();

      }, []);

      if (loading) return <div>Loading dashboard ...</div>

        return (
            <>

      <StatsOverview stats={stats} />

      <PendingAgentApprovals
        agents={agents}
        onApprove={onApprove}
        onReject={onReject}
      />

      <RecentUsers
        users={recentUsers}
        onView={(user) => console.log('View:', user)}
        onDelete={(user) => console.log('Delete:', user)}
      />

      <SystemOverview stats={systemStatus} />
            
            
            
            </>
        );
}

export default Overview;