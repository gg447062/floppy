import React, { useState, useEffect } from 'react';
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
  const [showDub, setShowDub] = useState(true);
  const [showMinter, setShowMinter] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const options = {
    whiteLabel: true,
    hideToolbar: true,
    hideTitle: true,
    hidePlayButton: false,
  };

  useEffect(() => {
    if (!loaded) {
      const player = new Player(
        process.env.FURIOOS_SDK_LINK,
        'player-container',
        options
      );
      setLoaded(true);
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
    </div>
  );
};

export default App;
