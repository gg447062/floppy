import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { listenForNewDownload } from '../lib/db';
import { downloadWAV } from '../lib/utils';
import Header from './Header';
import Player from './Player';
import SplashPage from './SplashPage';

const Game = () => {
  const [address, setAddress] = useState(null);
  const [player, setPlayer] = useState(null);
  const [started, setStarted] = useState(false);
  const modalRef = useRef();
  const buttonWrapperRef = useRef();
  const introVidRef = useRef();
  const loadingVidRef = useRef();
  const navigate = useNavigate();

  // const startGame = () => {
  //   loadingVidRef.current.pause();
  //   loadingVidRef.current.style.display = 'none';
  //   modalRef.current.style.display = 'none';
  // };

  // const startLoadingGame = () => {
  //   introVidRef.current.pause();
  //   introVidRef.current.style.display = 'none';
  //   buttonWrapperRef.current.style.display = 'none';
  //   loadingVidRef.current.play();
  //   loadingVidRef.current.onended = () => {
  //     startGame();
  //   };
  // };

  // function onStart(id) {
  //   setStarted(true);
  //   console.log(`instance with id ${id} started!`);
  // }

  // useEffect(() => {
  //   let _player

  //   async function setUpPlayer() {
  //     _player = new Player(onStart, 0);
  //     _player.startInstance()
  //     setPlayer(_player);
  //   }
  //   // loadingVidRef.current.style.display = 'block';
  //   setUpPlayer()

  //   return () => {
  //     _player.stopInstance();
  //   };
  // }, []);

  // useEffect(() => {
  //   async function startIfReady(interval) {
  //     const ready = await player.checkStatus()
  //     console.log('ready:', ready,)
  //     if (ready) {
  //       player.createIframe()
  //       clearInterval(interval)
  //     }
  //   }
  //   if (started) {
  //     const interval = setInterval(() => {
  //         startIfReady(interval)
  //     }, 1000);

  //     return () => {
  //       if (interval) {
  //         clearInterval(interval);
  //       }
  //     };
  //   }
  // }, [started]);

  useEffect(() => {
    const unsubscribe = listenForNewDownload(downloadWAV);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {/* <button
        onClick={() => {
          player.startInstance();
        }}
      >
        start
      </button> */}
      <Header />
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
      {/* <audio
        id="audio-downloader"
        controls
      ></audio> */}
    </div>
  );
};

export default Game;
