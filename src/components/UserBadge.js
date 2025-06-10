'use client';
export default function UserBadge({ level }) {
  return (
    <div style={{
      backgroundColor: '#e0f7fa',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      display: 'inline-block',
      marginTop: '1rem'
    }}>
      <strong>Level:</strong> {level}
    </div>
  );
}
