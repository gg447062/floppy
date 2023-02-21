import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const baseURL = 'https://dg3mov3znt8u.cloudfront.net';

export default function SplashPage({ introModalRef, player }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const goToCrates = () => {
    navigate('/crates');
  };

  const load = () => {
    player.startInstance();
    setLoading(true);
  };

  return (
    <div id="intro-modal" ref={introModalRef}>
      {!loading && (
        <div id="intro-button-wrapper">
          <button onClick={load}>Play</button>
          <button onClick={goToCrates}>Crates</button>
        </div>
      )}
      {loading && <div id="loading-message">Loading...</div>}
    </div>
  );
}
