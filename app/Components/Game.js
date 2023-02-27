import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  listenForNewDownload,
  listenForNewUpload,
  addWalletToUpload,
} from '../lib/db';
import { downloadWAV } from '../lib/utils';
import { setTrack, setAudioURL } from '../Redux/metadata';
import Header from './Header';
import Player from './Player';
import SplashPage from './SplashPage';

const initialMessage = 'new upload, do you want to go to the image editor?';

const Game = () => {
  const [player, setPlayer] = useState(null);
  const [playerIP, setPlayerIP] = useState(null);
  const [started, setStarted] = useState(false);
  const address = useSelector((state) => state.user.address);
  const [uploadMessage, setUploadMessage] = useState(initialMessage);
  const [showUploadMessage, setShowUploadMessage] = useState(false);
  const [uploadData, setUploadData] = useState({});
  const introModalRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const go = () => {
    dispatch(setAudioURL(uploadData.url));
    dispatch(setTrack(uploadData.name));
    navigate('/editor');
  };

  const stay = async () => {
    setUploadMessage('saving upload for later...');
    await addWalletToUpload(uploadData.id, address);
    setShowUploadMessage(false);
    setUploadMessage(initialMessage);
  };

  const handleNewUpload = (url, name, id) => {
    setUploadData({ url, name, id });
    showUploadMessage(true);
  };

  const showGame = () => {
    introModalRef.current.style.display = 'none';
  };

  useEffect(() => {
    function onStart(id) {
      setStarted(true);
      console.log(`instance with id ${id} started!`);
    }

    const _player = new Player(onStart, 0);
    setPlayer(_player);

    return () => {
      _player.stopInstance();
    };
  }, []);

  useEffect(() => {
    async function startIfReady(interval) {
      const ready = await player.checkStatus();
      if (ready) {
        player.createIframe();
        setPlayerIP(player.getIP());
        showGame();
        clearInterval(interval);
      }
    }

    if (started) {
      const interval = setInterval(() => {
        startIfReady(interval);
      }, 1000);

      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }
  }, [started]);

  useEffect(() => {
    if (playerIP) {
      const unsubscribe = listenForNewDownload(downloadWAV, playerIP);
      return () => {
        unsubscribe();
      };
    }
  }, [playerIP]);

  useEffect(() => {
    if (playerIP) {
      const unsubscribe = listenForNewUpload(handleNewUpload, playerIP);
      return () => {
        unsubscribe();
      };
    }
  }, [playerIP]);

  return (
    <div>
      <Header />
      <div id="player-container"></div>
      <SplashPage introModalRef={introModalRef} player={player} />
      {showUploadMessage && (
        <div className="alert-upload-modal">
          <p>{uploadMessage}</p>
          <div>
            <button onClick={go}>go</button>
            <button onClick={stay}>stay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
