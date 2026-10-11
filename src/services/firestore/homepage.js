import { doc, getDoc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const homepageRef = doc(db, 'homepageContent', 'home');

export async function getHomepageContent() {
  const snapshot = await getDoc(homepageRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

export function subscribeToHomepageContent(onContent, onError) {
  return onSnapshot(
    homepageRef,
    (snapshot) => onContent(snapshot.exists() ? snapshot.data() : null),
    onError
  );
}

export async function saveHomepageContent(payload) {
  await setDoc(
    homepageRef,
    {
      ...payload,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
