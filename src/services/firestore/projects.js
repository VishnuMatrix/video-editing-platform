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
  const initialStatus = project.status || 'submitted';
  const payload = {
    ...project,
    statusHistory: [{ status: initialStatus, at: new Date().toISOString() }],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(projectsRef, payload);
  return docRef.id;
}

export async function updateProject(projectId, updates) {
  const ref = doc(db, 'projects', projectId);
  const snapshot = await getDoc(ref);
  const currentProject = snapshot.exists() ? snapshot.data() : {};
  const statusChanged = updates.status && updates.status !== currentProject.status;
  let statusHistory = currentProject.statusHistory || [];

  if (statusChanged) {
    const changedAt = new Date().toISOString();
    if (statusHistory.length === 0 && currentProject.status) {
      const createdAt = currentProject.createdAt?.toDate?.()?.toISOString() || currentProject.createdAt || changedAt;
      statusHistory = [{ status: currentProject.status, at: createdAt }];
    }
    statusHistory = [...statusHistory, { status: updates.status, at: changedAt }];
  }

  await setDoc(
    ref,
    {
      ...updates,
      ...(statusChanged ? { statusHistory } : {}),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
