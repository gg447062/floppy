import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Player } from 'furioos-sdk';
import Header from './Header';
import ImageEditor from './ImageEditor';

const Game = () => {
  const [showEditor, setShowEditor] = useState(false);
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
      <Header showEditor={setshowEditor} />
      <CSSTransition
        in={showEditor}
        timeout={500}
        classNames="modal-left"
        unmountOnExit
      >
        <ImageEditor showEditor={setShowEditor} />
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

export default Game;
