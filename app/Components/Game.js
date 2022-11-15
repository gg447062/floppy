import React, { useState, useEffect, useRef } from 'react';
import { Player } from 'furioos-sdk';
import SplashPage from './SplashPage';

const Game = () => {
  const [address, setAddress] = useState(null);
  const [player, setPlayer] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const modalRef = useRef();
  const buttonWrapperRef = useRef();
  const introVidRef = useRef();
  const loadingVidRef = useRef();

  const options = {
    whiteLabel: true,
    hideToolbar: true,
    hideTitle: true,
    hidePlayButton: true,
  };

  const z =
    process.env.NODE_ENV === 'development'
      ? 'igvJ3gqNaqGFanYaK'
      : 'xsSRkW8x7GgTk2EXE';

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
    player.start();
  };

  useEffect(() => {
    if (!player) {
      const _player = new Player(z, 'player-container', options);
      _player.onStreamStart(() => {
        setLoaded(true);
      });
      _player.onAppStart(() => {
        console.log('SDK client FIRED: App started');
        _player.sendSDKMessage({ address: address });
      });
      setPlayer(_player);
      loadingVidRef.current.style.display = 'block';
    }
  }, []);

  // useEffect(() => {
  //   if (loaded) {
  //     setTimeout(() => {
  //       startGame();
  //     }, 2000);
  //   }
  // }, [loaded]);

  return (
    <div>
      {/* <Header showEditor={setShowEditor} />
      <EditAndUpload
        showEditor={showEditor}
        showUpload={showUpload}
        setShowEditor={setShowEditor}
        setShowUpload={setShowUpload}
      /> */}

      <div id="player-container"></div>
      <SplashPage
        introVidRef={introVidRef}
        loadingVidRef={loadingVidRef}
        buttonWrapperRef={buttonWrapperRef}
        modalRef={modalRef}
        startLoadingGame={startLoadingGame}
        setAddress={setAddress}
      />
    </div>
  );
};

export default Game;
