import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { listenForNewDownload, listenForNewUpload } from '../lib/db';
import { downloadWAV } from '../lib/utils';
import { setTrack, setAudioURL } from '../Redux/metadata';
import Header from './Header';
import Player from './Player';
import SplashPage from './SplashPage';

const Game = () => {
  const [player, setPlayer] = useState(null);
  const [playerIP, setPlayerIP] = useState(null);
  const [started, setStarted] = useState(false);
  const introModalRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewUpload = (url, name) => {
    dispatch(setAudioURL(url));
    dispatch(setTrack(name));
    navigate('/editor');
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
    </div>
  );
};

export default Game;
