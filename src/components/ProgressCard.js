'use client';
export default function ProgressCard({ progress }) {
  return (
    <div style={{
      padding: '1rem',
      backgroundColor: '#fafafa',
      borderRadius: '12px',
      border: '1px solid #ddd',
      width: '100%',
    }}>
      <h3 style={{ marginBottom: '0.8rem' }}>Progress</h3>
      <div style={{
        height: '20px',
        backgroundColor: '#eee',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          backgroundColor: '#4caf50',
          height: '100%',
          transition: 'width 0.5s ease'
        }}></div>
      </div>
      <p style={{ marginTop: '0.5rem' }}>{progress}% completed</p>
    </div>
  );
}
