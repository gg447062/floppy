import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
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

export async function listenToDB(cb) {
  let calls = 0;
  // const downloadsQuery = query(collection(db, 'downloads'));
  const downloadsQuery = query(collection(db, 'downloads'));

  const listener = onSnapshot(downloadsQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        if (calls > 0) {
          console.log('new downloads: ', change.doc.data().name);
          cb(change.doc.data().pathRef);
        }
      }
    });
    calls += 1;
  });

  return listener;
}
