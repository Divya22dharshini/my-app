'use client';

export default function RecentActivity({ activities }) {
  return (
    <div style={{
      padding: '1rem',
      backgroundColor: '#fff0f6',
      borderRadius: '12px',
      border: '1px solid #ffadd2',
      width: '100%',
    }}>
      <h3 style={{ marginBottom: '1rem' }}>Recent Activity</h3>
      <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
        {activities.map((activity, index) => (
          <li key={index} style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.75rem',
            color: '#333',
            fontSize: '0.95rem'
          }}>
            <span style={{ marginRight: '10px', color: '#ff85c0' }}>✅</span>
            <div>
              <div>{activity.text}</div>
              <small style={{ color: '#888', fontSize: '0.75rem' }}>{activity.date}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
