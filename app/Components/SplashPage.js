import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function SplashPage({ introModalRef, player }) {
  const isAuthenticated = useSelector((state) => state.user.authenticated);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

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
  };

  return (
    <div id="intro-modal" ref={introModalRef}>
      {showMessage && (
        <div className="message-modal">
          <div onClick={hide}>x</div>
          <p>must connect wallet to play</p>
        </div>
      )}
      {!loading && (
        <div id="intro-button-wrapper">
          <button onClick={load}>Play</button>
          <button
            onClick={() => {
              navigate('/crates');
            }}
          >
            Crates
          </button>
        </div>
      )}
      {loading && <div id="loading-message">Loading...</div>}
    </div>
  );
}
