import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

const reviewsRef = collection(db, 'reviews');

export async function getProjectReviews(projectId) {
  if (!projectId) return [];

  const q = query(reviewsRef, where('projectId', '==', projectId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export async function getAllProjectReviews() {
  const snapshot = await getDocs(reviewsRef);
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export function subscribeToProjectReviews(onReviews, onError) {
  return onSnapshot(
    reviewsRef,
    (snapshot) => {
      onReviews(snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      })));
    },
    onError
  );
}

export async function markReviewAsRead(reviewId) {
  if (!reviewId) return;
  await updateDoc(doc(db, 'reviews', reviewId), {
    readByAdmin: true,
    reviewedAt: serverTimestamp(),
  });
}

export async function addReview(review) {
  const result = await addDoc(reviewsRef, {
    ...review,
    readByAdmin: false,
    createdAt: serverTimestamp(),
  });

  return result.id;
}
