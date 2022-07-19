import React, { useState, useEffect, useRef } from 'react';
import { useMoralis, useNewMoralisObject } from 'react-moralis';
import { useSelector } from 'react-redux';
import Moralis from 'moralis/';
import { cleanName } from '../utils';

export default function Upload({ setShowUpload }) {
  const { isAuthenticated } = useMoralis();
  const { save } = useNewMoralisObject('Dubplate');
  const frontURL = useSelector((state) => state.metadata.frontURL);
  const backURL = useSelector((state) => state.metadata.backURL);
  const artist = useSelector((state) => state.metadata.artist);
  const track = useSelector((state) => state.metadata.track);
  const [artistName, setArtistName] = useState('');
  const [trackName, setTrackName] = useState('');
  const [audioSrc, setAudioSrc] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const audioInput = useRef(null);

  const updateAudio = () => {
    setAudioSrc(URL.createObjectURL(audioInput.current.files[0]));
    setUploaded(true);
  };

  const saveObject = (data) => {
    save(data, {
      onSuccess: (dubplate) => {
        return dubplate.id;
      },
      onError: (error) => {
        console.log(error);
        return error.message;
      },
    });
  };

  const saveToDatabase = async (front, back, artist, track) => {
    if (isAuthenticated) {
      console.log('uploading...');

      const frontImage = new Moralis.File(`${cleanName(trackName)}_front.png`, {
        base64: front,
      });
      await frontImage.saveIPFS();
      const frontHash = frontImage.hash();
      console.log('front saved');

      const backImage = new Moralis.File(`${cleanName(trackName)}_back.png`, {
        base64: back,
      });
      await backImage.saveIPFS();
      const backHash = backImage.hash();
      console.log('back saved');

      const audioFile = new Moralis.File(
        `${trackName}.mp3`,
        audioInput.current.files[0]
      );

      await audioFile.saveIPFS();
      const audioHash = audioFile.hash();
      console.log('audio saved');

      const metadata = {
        name: track,
        artist: artist,
        description: 'a floppy dubplate',
        front: frontHash,
        back: backHash,
        audio: audioHash,
      };

      const jsonFile = new Moralis.File(`${name}_metadata.json`, {
        base64: btoa(JSON.stringify(metadata)),
      });

      await jsonFile.saveIPFS();
      const jsonHash = jsonFile.hash();

      console.log('metadata saved');

      await saveObject({
        artist: artist,
        track: track,
        metadata: metadata,
        metadataHash: jsonHash,
      });

      console.log('object saved successfully');
    }
  };

  const saveFinal = () => {
    if (uploaded) {
      saveToDatabase(frontURL, backURL, artistName, trackName);
    }
  };

  useEffect(() => {
    const onLoad = () => {
      setArtistName(artist);
      setTrackName(track);
    };
    onLoad();
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: '4em',
        backgroundColor: 'grey',
      }}
    >
      <img src={frontURL} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: '2em',
        }}
      >
        <label htmlFor="artist">Artist</label>
        <input
          id="artist"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        ></input>
        <label htmlFor="track">Track</label>
        <input
          id="track"
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
        ></input>

        <input type={'file'} onChange={updateAudio} ref={audioInput}></input>

        {audioSrc && <audio src={audioSrc} controls></audio>}
        <button onClick={saveFinal}>Save</button>
        <div onClick={() => setShowUpload(false)}>X</div>
      </div>
    </div>
  );
}
