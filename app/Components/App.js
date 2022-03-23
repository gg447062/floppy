import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Gallery from './Gallery';
import Crates from './Crates';
import Header from './Header';
import ImageEditor from './ImageEditor/ImageEditor';
import Minter from './Minter';

const App = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [showCrates, setShowCrates] = useState(false);
  const [showDub, setShowDub] = useState(true);
  const [showMinter, setShowMinter] = useState(false);
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
      <video id="source" src="assets/test.mp4" controls />
    </div>
  );
};

export default App;
