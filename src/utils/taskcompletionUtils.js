import { auth, db } from '../lib/firebaseConfig';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';

export async function markTaskComplete(taskName) {
  try {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    const timestamp = new Date().toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const activities = userData.recentActivities || [];

      // Avoid duplicate entries
      const alreadyDone = activities.some(a => a.text === `Completed ${taskName}`);
      if (alreadyDone) return;

      const newActivity = { text: `Completed ${taskName}`, date: timestamp };

      await updateDoc(userRef, {
        progress: (userData.progress || 0) + 25, // Increment by 25% per task
        recentActivities: [newActivity, ...activities].slice(0, 5)
      });
    } else {
      // If user data doesn't exist (edge case)
      await setDoc(userRef, {
        name: user.displayName || 'User',
        email: user.email,
        progress: 25,
        recentActivities: [{ text: `Completed ${taskName}`, date: timestamp }]
      });
    }
  } catch (error) {
    console.error('Failed to update user progress:', error);
  }
}
