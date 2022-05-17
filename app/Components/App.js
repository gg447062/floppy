import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Player } from 'furioos-sdk';
import Gallery from './Gallery';
import Crates from './Crates';
import Header from './Header';
import ImageEditor from './ImageEditor';
import Minter from './Minter';

const App = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [showCrates, setShowCrates] = useState(false);
  const [showDub, setShowDub] = useState(false);
  const [showMinter, setShowMinter] = useState(false);
  const [player, setPlayer] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [skipReady, setSkipReady] = useState(false);
  const modalRef = useRef();
  const video1Ref = useRef();
  const video2Ref = useRef();

  const options = {
    whiteLabel: true,
    hideToolbar: true,
    hideTitle: true,
    hidePlayButton: true,
  };

  const baseURL = 'https://dg3mov3znt8u.cloudfront.net';

  const z =
    process.env.NODE_ENV === 'development'
      ? 'igvJ3gqNaqGFanYaK'
      : 'xsSRkW8x7GgTk2EXE';

  const enterGame = () => {
    modalRef.current.style.display = 'none';
    video1Ref.current.play();
    video1Ref.current.onended = (e) => {
      nextVideo();
    };
    setTimeout(() => {
      setSkipReady(true);
    }, 30000);
  };

  const pauseAndHide = (v1, b, v2 = null, div = null) => {
    v1.pause();
    v1.style.display = 'none';
    b.style.display = 'none';
    if (v2) {
      v2.play();
    }
    if (div) {
      div.style.display = 'none';
    }
  };

  const nextVideo = () => {
    pauseAndHide(
      video1Ref.current,
      document.getElementById('skip-button'),
      video2Ref.current
    );
    player.start();
  };

  const startGame = () => {
    pauseAndHide(
      video2Ref.current,
      document.getElementById('start-button'),
      null,
      document.getElementsByClassName('video-wrapper')[0]
    );
  };

  useEffect(() => {
    if (!player) {
      const _player = new Player(z, 'player-container', options);
      _player.onStreamStart(() => {
        setLoaded(true);
      });
      setPlayer(_player);
    }
  }, []);

  return (
    <div>
      {/* <Header
        showGallery={setShowGallery}
        showCrates={setShowCrates}
        showDub={setShowDub}
      />
      <CSSTransition
        in={showGallery}
        timeout={500}
        classNames="modal-top"
        unmountOnExit
      >
        <Gallery showGallery={setShowGallery} />
      </CSSTransition>
      <CSSTransition
        in={showCrates}
        timeout={500}
        classNames="modal-top"
        unmountOnExit
      >
        <Crates showCrates={setShowCrates} />
      </CSSTransition>
      <CSSTransition
        in={showDub}
        timeout={500}
        classNames="modal-left"
        unmountOnExit
      >
        <ImageEditor showDub={setShowDub} showMinter={setShowMinter} />
      </CSSTransition>
      <CSSTransition
        in={showMinter}
        timeout={500}
        classNames="modal-right"
        unmountOnExit
      >
        <Minter showMinter={setShowMinter} />
      </CSSTransition> */}
      <div id="player-container"></div>
      <div id="intro-modal" ref={modalRef}>
        <button id="enter-button" onClick={enterGame}>
          ENTER
        </button>
      </div>
      {/* <audio src="assets/The_Breakdown.mp3" /> */}
      <div className="video-wrapper">
        <video
          className={'intro-video'}
          id="video1"
          src={`${baseURL}/floppy-game-intro-720.mp4`}
          ref={video1Ref}
        />
        <video
          className={'intro-video'}
          id="video2"
          src={`${baseURL}/floppy-basseface-intro-720.mp4`}
          ref={video2Ref}
          loop={true}
        />
      </div>
      {skipReady && (
        <button id={'skip-button'} onClick={nextVideo}>
          <img
            alt="skip tutorial button"
            src={`${baseURL}/skip-tutorial-button.png`}
          />
        </button>
      )}
      {loaded && (
        <button id="start-button" onClick={startGame}>
          <img
            alt="start game button"
            src={`${baseURL}/start-game-button.png`}
          />
        </button>
      )}
    </div>
  );
};

export default App;
