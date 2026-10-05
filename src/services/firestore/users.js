import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

export async function getUserProfile(uid) {
  if (!uid) return null;

  const ref = doc(db, 'users', uid);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    uid: snapshot.id,
    ...snapshot.data(),
  };
}

export async function createUserProfile({ uid, name, email, role = 'client', photoURL = null }) {
  const ref = doc(db, 'users', uid);
  const payload = {
    uid,
    name,
    email,
    role,
    photoURL,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(ref, payload, { merge: true });

  return {
    uid,
    name,
    email,
    role,
    photoURL,
  };
}

export async function updateUserProfile(uid, updates) {
  if (!uid) throw new Error('A signed-in user is required to update a profile.');

  const allowedFields = ['name', 'phone', 'company', 'timeZone', 'bio', 'preferences'];
  const profileUpdates = Object.fromEntries(
    Object.entries(updates).filter(([key]) => allowedFields.includes(key))
  );

  await setDoc(
    doc(db, 'users', uid),
    {
      ...profileUpdates,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  return profileUpdates;
}

export async function getAllClients() {
  const snapshot = await getDocs(collection(db, 'users'));

  return snapshot.docs
    .map((item) => ({
      id: item.id,
      ...item.data(),
    }))
    .filter((user) => user.role === 'client');
}
