'use client';
export default function LogoutButton({ onLogout }) {
  return (
    <button
      onClick={onLogout}
      style={{
        marginTop: '1rem',
        padding: '10px 16px',
        borderRadius: '8px',
        backgroundColor: '#ff4d4f',
        color: 'white',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      Logout
    </button>
  );
}