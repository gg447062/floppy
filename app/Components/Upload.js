import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMoralis, useNewMoralisObject } from 'react-moralis';
import { useSelector } from 'react-redux';
import Moralis from 'moralis/';
import { cleanName } from '../utils';

export default function Upload({ setShowUpload }) {
  const { isAuthenticated, authenticate } = useMoralis();
  const { save } = useNewMoralisObject('Dubplate');
  const frontURL = useSelector((state) => state.metadata.frontURL);
  const backURL = useSelector((state) => state.metadata.backURL);
  const artist = useSelector((state) => state.metadata.artist);
  const track = useSelector((state) => state.metadata.track);
  const [artistName, setArtistName] = useState('');
  const [trackName, setTrackName] = useState('');
  const [message, setMessage] = useState('uploading...');
  const [showMessage, setShowMessage] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const audioInput = useRef(null);
  const navigate = useNavigate();

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
      const frontImage = new Moralis.File(`${cleanName(trackName)}_front.png`, {
        base64: front,
      });
      await frontImage.saveIPFS();
      const frontHash = frontImage.hash();

      const backImage = new Moralis.File(`${cleanName(trackName)}_back.png`, {
        base64: back,
      });
      await backImage.saveIPFS();
      const backHash = backImage.hash();

      const audioFile = new Moralis.File(
        `${trackName}.mp3`,
        audioInput.current.files[0]
      );

      await audioFile.saveIPFS();
      const audioHash = audioFile.hash();

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

      await saveObject({
        artist: artist,
        track: track,
        metadata: metadata,
        metadataHash: jsonHash,
      });

      setMessage('object saved successfully');
    } else {
      await authenticate();
      saveToDatabase();
    }
  };

  const saveFinal = async () => {
    if (uploaded) {
      setDisabled(true);
      setShowMessage(true);
      await saveToDatabase(frontURL, backURL, artistName, trackName);
      navigate('/crates');
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
    <div className="upload-wrapper ff-3">
      <img src={frontURL} />
      <div className="upload-inner-wrapper">
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
        <button onClick={saveFinal} disabled={disabled}>
          Save
        </button>
        <button onClick={() => setShowUpload(false)}>X</button>
      </div>
      {showMessage && (
        <div className="message-container crates-border">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
