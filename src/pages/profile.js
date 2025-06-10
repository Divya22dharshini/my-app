'use client';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import UserBadge from '@/components/UserBadge';
import LogoutButton from '@/components/LogoutButton';
import ProgressCard from '@/components/ProgressCard';
import RecentActivity from '@/components/RecentActivity';

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };
  
  const recentActivities = [
  { text: 'Completed Quiz 2', date: 'June 9, 2025' },
  { text: 'Watched Video on Numbers', date: 'June 8, 2025' },
  { text: 'Practiced Greetings', date: 'June 7, 2025' }
];


  return (
    <>
      <Head>
        <title>Profile - Signly</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>

      <Navbar />

      <main style={{
        padding: '2rem 1rem',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'Segoe UI, sans-serif'
      }}>
        {/* Profile Header */}
        <section style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Image
              src="/images/profile.png"
              alt="Profile Picture"
              width={100}
              height={100}
              style={{ borderRadius: '50%' }}
            />
            <div>
              <h2 style={{ margin: '0', fontSize: '1.8rem' }}>Divya D</h2>
              <p style={{ margin: '4px 0', color: '#555' }}>divya@example.com</p>
              <UserBadge level="Intermediate Learner" />
            </div>
          </div>
          <div>
            <LogoutButton onLogout={handleLogout} />
          </div>
        </section>

        {/* Progress and Recent Activity */}
        <section style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 50%' }}>
            <ProgressCard progress={65} />
          </div>
          <div style={{ flex: '1 1 50%' }}>
           <RecentActivity activities={recentActivities} />
          </div>
        </section>
      </main>
    </>
  );
}
