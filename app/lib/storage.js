import { storage } from '../lib/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

export function downloadWAV(path) {
  let tries = 0
  console.log('downloading...');
  getDownloadURL(ref(storage, path))
    .then((url) => {
      const audio = document.getElementById('audio-downloader');
      audio.setAttribute('src', url);
      console.log('fetched successfully');
    })
    .catch((error) => {
      if (tries < 5) {
        tries += 1
        return downloadWAV(path)
      } else {
        console.log('error fetching')
        console.log(error);
      }
    });
}
