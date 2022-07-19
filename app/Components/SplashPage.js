import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import { wallets } from '../utils';

const checkWhitelisted = (address, start) => {
  const ok = wallets.filter((el) => el.toLowerCase() === address.toLowerCase());
  if (ok.length > 0) {
    start();
  } else {
    alert('not in whitelist!');
  }
};

export default function SplashPage({
  introVidRef,
  loadingVidRef,
  buttonWrapperRef,
  modalRef,
  startLoadingGame,
}) {
  const navigate = useNavigate();
  const { user, authenticate, isAuthenticated } = useMoralis();

  async function login() {
    if (!isAuthenticated) {
      await authenticate();
      const address = user.get('ethAddress');
      checkWhitelisted(address, startLoadingGame);
    } else {
      const address = user.get('ethAddress');
      checkWhitelisted(address, startLoadingGame);
    }
  }

  const startVideo = () => {
    document.getElementById('enter').style.display = 'none';
    introVidRef.current.play();
    setTimeout(() => {
      buttonWrapperRef.current.style.display = 'flex';
    }, 29000);
  };

  const goToCrates = () => {
    navigate('/crates');
  };

  const handleEnter = (e) => {
    e.target.src = e.target.src.replace('.png', '_selected.png');
  };

  const handleLeave = (e) => {
    e.target.src = e.target.src.replace('_selected.png', '.png');
  };

  return (
    <div id="intro-modal" ref={modalRef}>
      <div id="enter" onClick={startVideo}>
        ENTER
      </div>
      <video
        id="intro-video"
        src="Floppy_Splash_Page.mp4"
        ref={introVidRef}
      ></video>
      <video id="loading-video" src="F081.mp4" ref={loadingVidRef}></video>
      <div id="intro-button-wrapper" ref={buttonWrapperRef}>
        <img
          className="intro-button"
          src="start_game.png"
          onClick={login}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        ></img>
        <img
          className="intro-button"
          src="crates_button.png"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        ></img>
        <a
          href="https://www.youtube.com/watch?v=oXloCc0wvQQ&list=PLPxSPhynpbXncHKNSbStKg2uiAADARi9P"
          target={'_blank'}
          onClick={() => {
            introVidRef.current.pause();
          }}
        >
          <img
            className="intro-button"
            src="tutorial_button.png"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          ></img>
        </a>
      </div>
    </div>
  );
}
