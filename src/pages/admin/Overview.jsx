// import { BASE_URL } from "../../../utils";
import { useEffect, useState } from "react";
import { Users, Building, FileText, DollarSign } from 'lucide-react';
import React from "react";
import StatsOverview from "../../features/dashboards/admin/StatsOverview";
import PendingAgentApprovals from "../../features/dashboards/admin/PendingAgentApprovals";
import RecentUsers from "../../features/dashboards/admin/RecentUsers";
import SystemOverview from "../../features/dashboards/admin/SystemOverview";

const Overview = ({ systemStatus }) => {
      const [stats, setStats] = useState([]);
      const [agents, setAgents] = useState([]);
      const [recentUsers, setRecentUser] = useState([]);
      const [loading, setLoading] = useState(true);

      // Handle approve agent
      const handleApprove = async (agent) => {
        const token = localStorage.getItem('access_token');
        const apiUrl = import.meta.env.VITE_API_URL;

        try {
          const res = await fetch(`${apiUrl}/admin/approve/${agent.id}`, {
            method: "PATCH",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ is_verified: true })
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to approve agent');
          }

          // Remove approved agent from the list
          setAgents(prevAgents => prevAgents.filter(a => a.id !== agent.id));
          
          alert('Agent approved successfully!');
        } catch (error) {
          console.error('Error approving agent:', error.message);
          alert('Failed to approve agent: ' + error.message);
        }
      };

      // Handle reject agent
      const handleReject = async (agent) => {
        const token = localStorage.getItem('access_token');
        const apiUrl = import.meta.env.VITE_API_URL;

        try {
          const res = await fetch(`${apiUrl}/admin/approve/${agent.id}`, {
            method: "PATCH",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ is_verified: false })
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to reject agent');
          }

          // Remove rejected agent from the list
          setAgents(prevAgents => prevAgents.filter(a => a.id !== agent.id));
          
          alert('Agent rejected successfully!');
        } catch (error) {
          console.error('Error rejecting agent:', error.message);
          alert('Failed to reject agent: ' + error.message);
        }
      };

      useEffect(() => {
        const fetchStats = async () => {
          const token = localStorage.getItem('access_token');
          const apiUrl = import.meta.env.VITE_API_URL;

          const res = await fetch(`${apiUrl}/admin/stats`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();

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
              value: `Ksh ${Number(data.total_revenue).toLocaleString()}`,
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
          const token = localStorage.getItem('access_token');
          const apiUrl = import.meta.env.VITE_API_URL;

          const res = await fetch(`${apiUrl}/admin/pending-approvals`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();

          setAgents(data);
        };

        fetchPendingAgentApprovals();
      }, []);

      useEffect(() => {
        const fetchRecentUsers = async () => {
          const token = localStorage.getItem('access_token');
          const apiUrl = import.meta.env.VITE_API_URL;

          const res = await fetch(`${apiUrl}/admin/recent-users`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();

          setRecentUser(data);
        };

        fetchRecentUsers();
      }, []);

      if (loading) return <div>Loading dashboard ...</div>;

      return (
        <>
          <StatsOverview stats={stats} />

          <PendingAgentApprovals
            agents={agents}
            onApprove={handleApprove}
            onReject={handleReject}
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

