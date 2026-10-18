import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

const reviewsRef = collection(db, 'reviews');
const homepageReviewsRef = collection(db, 'homepageReviews');

export async function getProjectReviews(projectId) {
  if (!projectId) return [];

  const q = query(reviewsRef, where('projectId', '==', projectId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export async function getClientReviews(clientId) {
  if (!clientId) return [];

  const q = query(reviewsRef, where('clientId', '==', clientId));
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

export function subscribeToHomepageReviews(onReviews, onError) {
  return onSnapshot(
    homepageReviewsRef,
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
  const batch = writeBatch(db);
  const reviewRef = doc(reviewsRef);
  batch.set(reviewRef, {
    ...review,
    readByAdmin: false,
    createdAt: serverTimestamp(),
  });

  if (review.rating > 4) {
    batch.set(doc(homepageReviewsRef, review.projectId), {
      text: review.feedback,
      author: review.authorName,
      role: review.authorRole,
      rating: review.rating,
      createdAt: serverTimestamp(),
    });
  }

  await batch.commit();
  return reviewRef.id;
}
