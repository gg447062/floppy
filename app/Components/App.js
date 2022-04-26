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
  const modalRef = useRef();

  const options = {
    whiteLabel: true,
    hideToolbar: true,
    hideTitle: true,
    hidePlayButton: true,
  };

  const startGame = () => {
    modalRef.current.style.display = 'none';
  };

  useEffect(() => {
    if (!player) {
      const _player = new Player(
        process.env.FURIOOS_SDK_LINK,
        'player-container',
        options
      );
      _player.onLoad(() => {
        _player.start();
      });
      _player.onAppStart(() => {
        setLoaded(true);
      });
      setPlayer(_player);
    }
  });

  return (
    <div>
      <Header
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
      </CSSTransition>
      <div id="player-container"></div>
      <div id="intro-modal" ref={modalRef}>
        <h1 className="ff-0">Welcome to Floppy</h1>
        {loaded ? (
          <button onClick={startGame}>Start</button>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default App;
