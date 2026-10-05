import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

const projectsRef = collection(db, 'projects');

export async function getClientProjects(uid) {
  if (!uid) return [];

  const q = query(projectsRef, where('clientId', '==', uid));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export async function getAllProjects() {
  const snapshot = await getDocs(projectsRef);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export async function getProjectById(projectId) {
  if (!projectId) return null;

  const snapshot = await getDoc(doc(db, 'projects', projectId));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

export async function createProject(project) {
  const payload = {
    ...project,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(projectsRef, payload);
  return docRef.id;
}

export async function updateProject(projectId, updates) {
  const ref = doc(db, 'projects', projectId);

  await setDoc(
    ref,
    {
      ...updates,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
