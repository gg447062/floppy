import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

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
