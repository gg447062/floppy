import { storage } from '../lib/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

export function downloadWAV(path) {
  console.log('downloading...');
  getDownloadURL(ref(storage, path))
    .then((url) => {
      const audio = document.getElementById('audio-downloader');
      audio.setAttribute('src', url);
      console.log('fetched successfully');
    })
    .catch((error) => {
      console.log('error fetching')
      console.log(error);
    });
}
