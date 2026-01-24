import { Users, Building, FileText, DollarSign } from 'lucide-react';

const StatsOverview = ({stats}) => {

    const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  };

  const statCardStyle = (color) => ({
    background: '#fff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  });

  const statIconStyle = (color) => ({
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    background: `${color}15`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: color,
  });

  const statInfoStyle = {
    flex: 1,
  };

  const statNumberStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '4px',
  };

  const statLabelStyle = {
    fontSize: '14px',
    color: '#95a5a6',
  };
  

  return (
    <div style={statsContainerStyle}>
      {stats.map((stat, index) => (
        <div key={index} style={statCardStyle(stat.color)}>
          <div style={statIconStyle(stat.color)}>
            {stat.icon}
          </div>
          <div style={statInfoStyle}>
            <div style={statNumberStyle}>{stat.value}</div>
            <div style={statLabelStyle}>{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;



// import React from 'react';
// import { Users, Building, FileText, DollarSign } from 'lucide-react';

// const StatsCards = () => {
//   const stats = [
//     { label: 'Total Users', value: '1,234', icon: Users, color: '#3498db' },
//     { label: 'Active Agents', value: '456', icon: Building, color: '#27ae60' },
//     { label: 'Total Properties', value: '2,891', icon: FileText, color: '#f39c12' },
//     { label: 'Total Revenue', value: '₦45.2M', icon: DollarSign, color: '#9b59b6' },
//   ];

//   return (
//     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
//       {stats.map(({ label, value, icon: Icon, color }) => (
//         <div key={label} style={{ background: '#fff', padding: '24px', borderRadius: '12px', display: 'flex', gap: '20px' }}>
//           <div style={{ width: 56, height: 56, borderRadius: 12, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <Icon size={28} color={color} />
//           </div>
//           <div>
//             <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
//             <div style={{ fontSize: 14, color: '#95a5a6' }}>{label}</div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StatsCards;
