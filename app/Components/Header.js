import React, { useState } from 'react';
import { useMoralis } from 'react-moralis';
import Moralis from 'moralis/';
import Recorder from './Recorder';

const Header = ({ showGallery, showCrates, showDub }) => {
  const [src, setSource] = useState('');
  const { user, authenticate, logout, isAuthenticated, isAuthenticating } =
    useMoralis();

  async function login() {
    if (!isAuthenticated) {
      authenticate();
    }
  }

  return (
    <div id="header">
      {!isAuthenticated ? (
        <button onClick={login}>Connect</button>
      ) : (
        <button onClick={logout} disabled={isAuthenticating}>
          Logout
        </button>
      )}
      <button
      // onClick={() => {
      //   showGallery(true);
      // }}
      >
        Gallery
      </button>
      <button
      // onClick={() => {
      //   showCrates(true);
      // }}
      >
        Crates
      </button>
      <div id="record" className="container">
        {/* <Recorder setSource={setSource} /> */}
        <button
        // onClick={() => {
        //   showDub(true);
        // }}
        >
          Press dub plate
        </button>
      </div>
      {isAuthenticated ? <div>{user.get('ethAddress')}</div> : <div />}

      {src ? <audio src={src} controls></audio> : <div />}
    </div>
  );
};

export default Header;
