import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import { wallets } from '../utils';

const whitelisted = (address) => {
  const ok = wallets.filter((el) => el.toLowerCase() === address.toLowerCase());
  if (ok.length > 0) {
    return true;
  } else {
    return false;
  }
};

export default function SplashPage() {
  const navigate = useNavigate();
  const { user, authenticate, isAuthenticated } = useMoralis();

  async function login() {
    if (!isAuthenticated) {
      await authenticate();
      const address = user.get('ethAddress');
      // check if address wallet is is wallets list
      if (whitelisted(address)) {
        goToGame();
      } else {
        alert('not in whitelist!');
      }
    } else {
      const address = user.get('ethAddress');
      if (whitelisted(address)) {
        goToGame();
      } else {
        alert('not in whitelist!');
      }
    }
  }

  const startVideo = () => {
    const video = document.getElementById('intro-video');
    const buttonWrapper = document.getElementById('intro-button-wrapper');
    video.play();
    setTimeout(() => {
      buttonWrapper.style.opacity = '1';
    }, 29000);
  };

  const goToCrates = () => {
    navigate('/crates');
  };

  const goToGame = () => {
    navigate('/play');
  };

  return (
    // <Suspense fallback={null}>
    //   <Canvas shadows flat linear>
    //     <Scene goToCrates={goToCrates} />
    //     <OrbitControls />
    //   </Canvas>
    // </Suspense>
    <div id="intro-modal">
      <video
        id="intro-video"
        src="Floppy_Splash_Page.mp4"
        onClick={startVideo}
      ></video>
      <div id="intro-button-wrapper">
        <img
          className="intro-button"
          src="start_game.png"
          onClick={login}
        ></img>
        <img className="intro-button" src="crates_button.png"></img>
        <a
          href="https://www.youtube.com/watch?v=oXloCc0wvQQ&list=PLPxSPhynpbXncHKNSbStKg2uiAADARi9P"
          target={'_blank'}
        >
          <img className="intro-button" src="tutorial_button.png"></img>
        </a>
      </div>
    </div>
  );
}
