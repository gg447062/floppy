import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Gallery from './Components/Gallery';
import Crates from './Components/Crates';
import Header from './Components/Header';
import DubPlate from './Components/DubPlate';

const App = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [showCrates, setShowCrates] = useState(false);
  const [showDub, setShowDub] = useState(false);
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
        <DubPlate showDub={setShowDub} />
      </CSSTransition>
    </div>
  );
};

export default App;
