import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMoralis, useNewMoralisObject } from 'react-moralis';
import { useSelector } from 'react-redux';
import { cleanName, saveAssetsToIPFS, saveMetadataToIPFS } from '../lib/utils';
import { uploadDubplate } from '../lib/db';

export default function Upload({ setShowUpload }) {
  const { isAuthenticated, authenticate } = useMoralis();
  const frontURL = useSelector((state) => state.metadata.frontURL);
  const backURL = useSelector((state) => state.metadata.backURL);
  const artist = useSelector((state) => state.metadata.artist);
  const track = useSelector((state) => state.metadata.track);
  const [artistName, setArtistName] = useState('');
  const [trackName, setTrackName] = useState('');
  const [price, setPrice] = useState('');
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

  const saveToDatabase = async (front, back, artist, track) => {
    if (isAuthenticated) {
      const frontImage = {
        path: `${cleanName(trackName)}_front.png`,
        content: front,
      };

      const backImage = {
        path: `${cleanName(trackName)}_back.png`,
        content: back,
      };

      const audioFile = {
        path: `${trackName}.mp3`,
        content: audioInput.current.files[0],
      };

      const hashes = await saveAssetsToIPFS(frontImage, backImage, audioFile);

      const metadata = {
        name: track,
        artist: artist,
        description: 'a floppy dubplate',
        front: hashes[0],
        back: hashes[1],
        audio: hashes[2],
      };

      const metadataHash = await saveMetadataToIPFS(
        btoa(JSON.stringify(metadata)),
        `${track}_metadata.json`
      );

      await uploadDubplate({
        artist: artist,
        track: track,
        price: price,
        metadata: metadata,
        metadataHash: metadataHash,
      });

      setMessage('object saved successfully');
    } else {
      await authenticate();
      await saveToDatabase();
    }
  };

  const saveFinal = async () => {
    if (disabled) return;
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
    <div className="upload-wrapper">
      <img src={frontURL} />
      <div className="upload-inner-wrapper">
        <label htmlFor="artist-name">Artist</label>
        <input
          id="artist-name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        ></input>
        <label htmlFor="track-name">Track</label>
        <input
          id="track-name"
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
        ></input>
        <label htmlFor="price">Price (Eth)</label>
        <input
          id="price"
          type="number"
          min={0.1}
          step={0.1}
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        ></input>
        <input
          name="file"
          type={'file'}
          onChange={updateAudio}
          ref={audioInput}
        ></input>
        {audioSrc && <audio src={audioSrc} controls></audio>}
        <img
          id="upload-save"
          src="assets/bg_images/save_redux.png"
          onClick={saveFinal}
        />
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
