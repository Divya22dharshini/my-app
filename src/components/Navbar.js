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

      <ul className="nav-links">
        <li>
          <a onClick={() => router.push('/home')}>
            <i className="fas fa-home"></i> Home
          </a>
        </li>
        <li>
          <a onClick={() => router.push('/profile')}>
            <i className="fas fa-user"></i> Profile
          </a>
        </li>
        <li>
          <a onClick={() => router.push('/features')}>
            <i className="fas fa-star"></i> Features
          </a>
        </li>
        <li>
          <a onClick={() => router.push('/contact')}>
            <i className="fas fa-envelope"></i> Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
