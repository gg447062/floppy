import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';

export async function uploadDubplate(data) {
  const dubplate = collection(db, 'dubplates');
  try {
    const docRef = await addDoc(dubplate, data);
  } catch (error) {
    console.error('error uploading: ', error);
  }
}

export async function fetchDubplates() {
  const snapshot = await getDocs(collection(db, 'dubplates'));

  const dubplates = [];
  snapshot.forEach((doc) => {
    dubplates.push(doc.data());
  });

  return dubplates;
}

export function listenForNewDownload(cb) {
  const downloadsQuery = query(
    collection(db, 'uploads'),
    where('download', '==', true)
  );

  const listener = onSnapshot(downloadsQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (
        change.type === 'added' &&
        change.doc.data().timestamp >= Timestamp.now().toMillis()
      ) {
        console.log('new download: ', change.doc.data().name, change.doc.id);
        cb(change.doc.data().hash, change.doc.data().name);
      }
    });
  });

  return listener;
}

export function listenForNewUpload(cb) {
  const uploadsQuery = query(
    collection(db, 'uploads'),
    where('download', '==', false)
  );

  const listener = onSnapshot(uploadsQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (
        change.type === 'added' &&
        change.doc.data().timestamp >= Timestamp.now().toMillis()
      ) {
        console.log('new upload: ', change.doc.data().name, change.doc.id);
        cb(change.doc.data().hash, change.doc.data().name);
      }
    });
  });

  return listener;
}
