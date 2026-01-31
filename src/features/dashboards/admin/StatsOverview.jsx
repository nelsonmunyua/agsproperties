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

