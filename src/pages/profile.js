'use client';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import UserBadge from '@/components/UserBadge';
import LogoutButton from '@/components/LogoutButton';
import ProgressCard from '@/components/ProgressCard';
import RecentActivity from '@/components/RecentActivity';
import { auth, db } from '../lib/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function Profile() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    let unsub = null;

    const init = async () => {
      // Prefer the modular onAuthStateChanged import
      try {
        const { onAuthStateChanged } = await import('firebase/auth');
        unsub = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
            const userRef = doc(db, 'users', currentUser.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
              const data = userSnap.data();
              setUserInfo({ name: data.name, email: data.email });
              setProgress(data.progress || 0);
              setRecentActivities(data.recentActivities || []);
            }
          } else {
            router.push('/login');
          }
        });
      } catch (e) {
        // Fallback: try to use auth.onAuthStateChanged if present
        if (auth && typeof auth.onAuthStateChanged === 'function') {
          unsub = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
              const userRef = doc(db, 'users', currentUser.uid);
              const userSnap = await getDoc(userRef);

              if (userSnap.exists()) {
                const data = userSnap.data();
                setUserInfo({ name: data.name, email: data.email });
                setProgress(data.progress || 0);
                setRecentActivities(data.recentActivities || []);
              }
            } else {
              router.push('/login');
            }
          });
        } else {
          // last-resort: check currentUser once
          const currentUser = auth.currentUser;
          if (currentUser) {
            const userRef = doc(db, 'users', currentUser.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              const data = userSnap.data();
              setUserInfo({ name: data.name, email: data.email });
              setProgress(data.progress || 0);
              setRecentActivities(data.recentActivities || []);
            }
          } else {
            router.push('/login');
          }
        }
      }
    };

    init();

    return () => {
      try {
        if (unsub) unsub();
      } catch (e) {
        // ignore
      }
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Profile - Signly</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>

      <Navbar />

      <main
        style={{
          padding: '2rem 1rem',
          maxWidth: '1200px',
          margin: '0 auto',
          fontFamily: 'Segoe UI, sans-serif'
        }}
      >
        {/* Profile Header */}
        <section
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Image
              src="/images/profile.jpg"
              alt="Profile Picture"
              width={100}
              height={100}
              style={{ borderRadius: '50%' }}
            />
            <div>
              <h2 style={{ margin: '0', fontSize: '1.8rem' }}>{userInfo.name}</h2>
              <p style={{ margin: '4px 0', color: '#555' }}>{userInfo.email}</p>
              
            </div>
          </div>
          <div>
            <LogoutButton onLogout={handleLogout} />
          </div>
        </section>

        {/* Progress and Recent Activity */}
        <section style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 50%' }}>
            <ProgressCard progress={progress} />
          </div>
          <div style={{ flex: '1 1 50%' }}>
            <RecentActivity activities={recentActivities} />
          </div>
        </section>
      </main>
    </>
  );
}
