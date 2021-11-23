import React, { useState } from 'react';
import { useMoralis } from 'react-moralis';
import Moralis from 'moralis/';

const Header = (props) => {
  const { showGallery, showCrates, showDub } = props;
  const [src, setSource] = useState('');
  const { user, authenticate, logout, isAuthenticated, isAuthenticating } =
    useMoralis();

  async function login() {
    if (!isAuthenticated) {
      authenticate();
    }
  }

  const record = () => {
    const source = document.getElementById('source');
    const stream = source.captureStream();

    const recordedChunks = [];
    const options = { mimeType: 'video/x-matroska;codecs=avc1,opus' };
    const recorder = new MediaRecorder(stream, options);
    recorder.start();
    console.log(recorder);

    const handleAvailableData = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
        console.log(event.data);
      }
    };
    recorder.ondataavailable = handleAvailableData;

    const prepareData = () => {
      console.log('stopped');
      const blob = new Blob(recordedChunks, {
        type: 'video/x-matroska;codecs=avc1,opus',
      });
      const url = URL.createObjectURL(blob);
      setSource(url);
    };

    recorder.onstop = prepareData;

    setTimeout(() => {
      recorder.stop();
    }, 10000);
  };

  // const stop = () => {
  //   const blob = new Blob(recordedChunks, { type: 'audio/mpeg' });
  //   const url = URL.createObjectURL(blob);
  //   console.log(url);
  // };

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
        onClick={() => {
          showGallery(true);
        }}
      >
        Gallery
      </button>
      <button
        onClick={() => {
          showCrates(true);
        }}
      >
        Crates
      </button>
      <div id="record" className="container">
        <button onClick={record}>Record</button>

        {/* <button onClick={stop}>Stop</button> */}
        <button
          onClick={() => {
            showDub(true);
          }}
        >
          Press dub plate
        </button>
      </div>
      {isAuthenticated ? <div>{user.get('ethAddress')}</div> : <div />}
      {src ? (
        <video width="230" height="160" src="src" controls></video>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Header;
