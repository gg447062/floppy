import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { assetBaseURL } from '../lib/utils';

export default function SplashPage({
  introModalRef,
  videoOneRef,
  loadingVideoRef,
  loadingAudioRef,
  player,
}) {
  const isAuthenticated = useSelector((state) => state.user.authenticated);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [skipButtonState, setSkipButtonState] = useState('none');
  const [buttonState, setButtonState] = useState('none');
  const containerRef = useRef();

  const mouseEnter = (e) => {
    e.target.src = e.target.src.slice(0, -4) + 'hover.png';
  };

  const mouseOut = (e) => {
    e.target.src = e.target.src.slice(0, -9) + '.png';
  };

  const skipIntro = () => {
    videoOneRef.current.currentTime = 31;
    videoOneRef.current.volume = 0;
  };

  const hide = () => {
    setShowMessage(false);
  };

  const load = () => {
    if (!isAuthenticated) {
      setShowMessage(true);
      return;
    }
    player.startInstance();
    setLoading(true);
    containerRef.current.style.zIndex = 1;
    loadingVideoRef.current.play();
    loadingAudioRef.current.play();
  };

  useEffect(() => {
    const updateTime = () => {
      setTime(Math.floor(videoOneRef.current.currentTime));
    };
    if (videoOneRef.current) {
      videoOneRef.current.ontimeupdate = updateTime;
    }
  }, [videoOneRef.current]);

  useEffect(() => {
    if (time == 8 && skipButtonState === 'none') {
      setSkipButtonState('block');
    } else if (time == 26 && skipButtonState === 'block') {
      setSkipButtonState('none');
    } else if (time == 31 && buttonState === 'none') {
      setButtonState('block');
      setSkipButtonState('none');
    }
  }, [time]);

  return (
    <div id="intro-modal" ref={introModalRef}>
      {showMessage && (
        <div className="message-modal">
          <div onClick={hide}>x</div>
          <p>must connect wallet to play</p>
        </div>
      )}
      {!loading && (
        <div id="intro-menu-container">
          <video
            id="intro-video"
            src={`${assetBaseURL}/intro_assets/splash_page.mp4`}
            height="100%"
            width="100%"
            preload="auto"
            ref={videoOneRef}
          ></video>
          <img
            className="intro-button"
            id="skip-button"
            src={`${assetBaseURL}/intro_assets/skip_intro_3.png`}
            style={{ display: skipButtonState }}
            onClick={skipIntro}
          />
          <img
            className="intro-button"
            id="start-button"
            src={`${assetBaseURL}/intro_assets/startgame.png`}
            style={{ display: buttonState }}
            onClick={load}
            onMouseEnter={(e) => mouseEnter(e)}
            onMouseLeave={(e) => mouseOut(e)}
          />
          <img
            className="intro-button"
            id="crates-button"
            src={`${assetBaseURL}/intro_assets/crates.png`}
            style={{ display: buttonState }}
            onClick={() => {
              navigate('/crates');
            }}
            onMouseEnter={(e) => mouseEnter(e)}
            onMouseLeave={(e) => mouseOut(e)}
          />
          <a
            href="https://www.youtube.com/watch?v=oXloCc0wvQQ&list=PLPxSPhynpbXncHKNSbStKg2uiAADARi9P"
            target="_blank"
          >
            <img
              className="intro-button"
              id="tutorial-button"
              src={`${assetBaseURL}/intro_assets/tutorial.png`}
              style={{ display: buttonState }}
              onMouseEnter={(e) => mouseEnter(e)}
              onMouseLeave={(e) => mouseOut(e)}
            />
          </a>
        </div>
      )}
      <div id="loading-container" ref={containerRef}>
        <video
          id="loading-video"
          src={`${assetBaseURL}/intro_assets/loading.mov`}
          height="100%"
          width="100%"
          preload="auto"
          loop
          ref={loadingVideoRef}
        ></video>
        <audio
          src={`${assetBaseURL}/intro_assets/loading.mp3`}
          ref={loadingAudioRef}
        ></audio>
      </div>
    </div>
  );
}
