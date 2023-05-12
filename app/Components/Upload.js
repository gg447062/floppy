import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { assetBaseURL, moralisGateway } from '../lib/utils';
import { saveAssetsToIPFS, saveMetadataToIPFS } from '../lib/ipfs';
import { uploadDubplate } from '../lib/db';

export default function Upload() {
  const isAuthenticated = useSelector((state) => state.user.authenticated);
  const frontURL = useSelector((state) => state.metadata.frontURL);
  const backURL = useSelector((state) => state.metadata.backURL);
  const audioURL = useSelector((state) => state.metadata.audioURL);
  const artist = useSelector((state) => state.metadata.artist);
  const track = useSelector((state) => state.metadata.track);
  const [artistName, setArtistName] = useState('');
  const [trackName, setTrackName] = useState('');
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState('uploading...');
  const [showMessage, setShowMessage] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  const updatePrice = (e) => {
    setPrice(e.target.value);
  };

  const saveToDatabase = async (front, back, artist, track) => {
    if (isAuthenticated) {
      const frontImage = {
        path: `${encodeURIComponent(trackName)}_front.png`,
        content: front,
      };

      const backImage = {
        path: `${encodeURIComponent(trackName)}_back.png`,
        content: back,
      };

      const hashes = await saveAssetsToIPFS(frontImage, backImage);

      const metadata = {
        name: `${artist} - ${track}`,
        description: 'a floppy dubplate',
        image: hashes[0],
        animation_url: audioURL,
      };

      const metadataHash = await saveMetadataToIPFS(
        btoa(JSON.stringify(metadata)),
        `${encodeURIComponent(track)}_metadata.json`
      );

      const audio = document.getElementById('audio');
      const audioDuration = (audio.duration / 60).toFixed(2).replace('.', ':');

      await uploadDubplate({
        artist: artist,
        track: track,
        price: price,
        front: hashes[0],
        back: hashes[1],
        audio: audioURL,
        length: audioDuration,
        metadataHash: metadataHash,
        status: 'new',
      });

      setMessage('object saved successfully');
    } else {
      setMessage('please connect wallet to upload');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setMessage('uploading...');
      }, 2000);
    }
  };

  const saveFinal = async () => {
    if (disabled) return;
    else {
      setDisabled(true);
      setShowMessage(true);
      await saveToDatabase(frontURL, backURL, artistName, trackName);
      navigate('/crates');
    }
  };

  useEffect(() => {
    if (
      artistName.length > 0 &&
      trackName.length > 0 &&
      price > 0 &&
      audioURL.length > 0
    ) {
      setDisabled(false);
    }
  }, [artistName, trackName, price, audioURL]);

  useEffect(() => {
    const onLoad = () => {
      setArtistName(artist);
      setTrackName(track);
      setAudioSrc(`${moralisGateway}/${audioURL}`);
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
          min={0}
          step={0.1}
          onChange={updatePrice}
          value={price}
        ></input>
        {audioSrc && <audio id="audio" src={audioSrc} controls></audio>}
        <img
          id="upload-save"
          src={`${assetBaseURL}/bg_images/save_redux.png`}
          onClick={saveFinal}
        />
        <button onClick={() => navigate('/')}>X</button>
      </div>
      {showMessage && (
        <div className="message-container crates-border">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
