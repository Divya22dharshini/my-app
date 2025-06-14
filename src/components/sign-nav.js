'use client';

import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="navbar">
      <div className="nav-header">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <span className="site-name">Signly</span>
      </div>
    </nav>
  );
}
