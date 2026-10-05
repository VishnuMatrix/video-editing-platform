import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const homepageRef = doc(db, 'homepageContent', 'home');

export async function getHomepageContent() {
  const snapshot = await getDoc(homepageRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

export async function saveHomepageContent(payload) {
  await setDoc(
    homepageRef,
    {
      ...payload,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}
