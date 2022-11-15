import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import { useSelector } from 'react-redux';
import { cleanName, moralisGateway, getRandomAudio } from '../lib/utils';
import { saveAssetsToIPFS, saveMetadataToIPFS } from '../lib/ipfs';
import { uploadDubplate } from '../lib/db';

export default function Upload({ setShowUpload }) {
  const { isAuthenticated, authenticate } = useMoralis();
  const frontURL = useSelector((state) => state.metadata.frontURL);
  const backURL = useSelector((state) => state.metadata.backURL);
  const artist = useSelector((state) => state.metadata.artist);
  const track = useSelector((state) => state.metadata.track);
  const [artistName, setArtistName] = useState('');
  const [trackName, setTrackName] = useState('');
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState('uploading...');
  const [showMessage, setShowMessage] = useState(false);
  const [audioHash, setAudioHash] = useState(null);
  const [audioSrc, setAudioSrc] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  const updatePrice = (e) => {
    setPrice(e.target.value);
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

      // will need to fetch track from database and then save it ipfs here for nft purposes
      const hashes = await saveAssetsToIPFS(frontImage, backImage);

      const metadata = {
        name: `${artist} - ${track}`,
        description: 'a floppy dubplate',
        image: hashes[0],
        animation_url: audioHash,
      };

      const metadataHash = await saveMetadataToIPFS(
        btoa(JSON.stringify(metadata)),
        `${track}_metadata.json`
      );

      await uploadDubplate({
        artist: artist,
        track: track,
        price: price,
        front: hashes[0],
        back: hashes[1],
        audio: audioHash,
        metadataHash: metadataHash,
        status: 'new',
      });

      setMessage('object saved successfully');
    } else {
      await authenticate();
      await saveToDatabase();
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
      audioSrc
    ) {
      setDisabled(false);
    }
  }, [artistName, trackName, price, audioSrc]);

  useEffect(() => {
    const onLoad = () => {
      setArtistName(artist);
      setTrackName(track);
      const _audioHash = getRandomAudio();
      setAudioHash(_audioHash);
      setAudioSrc(`${moralisGateway}/${_audioHash}`);
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
