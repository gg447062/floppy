import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { listenToDB } from '../lib/db';
import { downloadWAV } from '../lib/storage';
import Player from './Player';
import SplashPage from './SplashPage';

const Game = () => {
  const [address, setAddress] = useState(null);
  const [player, setPlayer] = useState(null);
  const [ready, setReady] = useState(false);
  const [launched, setLaunched] = useState(false);
  const modalRef = useRef();
  const buttonWrapperRef = useRef();
  const introVidRef = useRef();
  const loadingVidRef = useRef();
  const navigate = useNavigate();

  const startGame = () => {
    loadingVidRef.current.pause();
    loadingVidRef.current.style.display = 'none';
    modalRef.current.style.display = 'none';
  };

  const startLoadingGame = () => {
    introVidRef.current.pause();
    introVidRef.current.style.display = 'none';
    buttonWrapperRef.current.style.display = 'none';
    loadingVidRef.current.play();
    loadingVidRef.current.onended = () => {
      startGame();
    };
    // player.start();
  };

  function onLaunch(id) {
    console.log(`instance with id ${id} launched!`);
  }

  // useEffect(() => {
  //   const _player = new Player(setReady, onLaunch);
  //   // _player.launchInstance();
  //   setPlayer(_player);
  //   // loadingVidRef.current.style.display = 'block';

  //   return () => {
  //     _player.terminateInstance();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (launched) {
  //     const interval = setInterval(() => {
  //       if (ready) {
  //         clearInterval(interval);
  //       } else {
  //         player.checkStatus();
  //       }
  //     }, 1000);

  //     return () => {
  //       if (interval) {
  //         clearInterval(interval);
  //       }
  //     };
  //   }
  // }, [launched]);

  useEffect(() => {
    const unsubscribe = listenToDB(downloadWAV);

    return () => {
      unsubscribe();
    };
  });

  return (
    <div>
      <button
        onClick={() => {
          player.launchInstance();
          setLaunched(true);
        }}
      >
        start
      </button>
      <div id="player-container"></div>
      <button
        onClick={() => {
          navigate('/crates');
        }}
      >
        Crates
      </button>
      {/* <SplashPage
        introVidRef={introVidRef}
        loadingVidRef={loadingVidRef}
        buttonWrapperRef={buttonWrapperRef}
        modalRef={modalRef}
        startLoadingGame={startLoadingGame}
        setAddress={setAddress}
      /> */}
      <audio
        id="audio-downloader"
        controls
      ></audio>
    </div>
  );
};

export default Game;
