import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Player } from 'furioos-sdk';
import Header from './Header';
import ImageEditor from './ImageEditor';
import Upload from './Upload';

const Game = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
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
        _player.sendSDKMessage({ test: 'test' });
      });
      setPlayer(_player);
    }
  });

  return (
    <div>
      {/* <Header showEditor={setShowEditor} />
      <CSSTransition
        in={showUpload}
        timeout={500}
        classNames="modal-right"
        unmountOnExit
      >
        <Upload setShowUpload={setShowUpload} />
      </CSSTransition>
      <CSSTransition
        in={showEditor}
        timeout={500}
        classNames="modal-left"
        unmountOnExit
      >
        <ImageEditor
          setShowEditor={setShowEditor}
          setShowUpload={setShowUpload}
        />
      </CSSTransition> */}
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
