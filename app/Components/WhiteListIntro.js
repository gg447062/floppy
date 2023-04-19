import React, { useRef, useState } from 'react';
import Web3 from 'web3';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { setAuthenticated, setAddress } from '../Redux/user';
import { useDispatch } from 'react-redux';
import { assetBaseURL } from '../lib/utils';

import axios from 'axios';

export default function WhiteListIntro({ videoOneRef }) {
  const [blocked, setBlocked] = useState(false);
  const dispatch = useDispatch();
  const bgRef = useRef();

  async function authenticate(address) {
    const { data: message } = await axios.get(
      `/api/login/message?address=${address}`
    );

    const web3 = new Web3(Web3.givenProvider);

    const signature = await web3.eth.personal.sign(message, address);

    const { data: token } = await axios.get(
      `/api/login/token?address=${address}&signature=${signature}`
    );

    await signInWithCustomToken(auth, token);
    dispatch(setAuthenticated(true));
    dispatch(setAddress(address));
    bgRef.current.style.display = 'none';
    videoOneRef.current.play();
  }

  async function login() {
    if (window?.ethereum?.isMetaMask) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const ethAddress = accounts[0];
      const isWhitelisted = checkWhitelisted(ethAddress);
      if (isWhitelisted) {
        authenticate(ethAddress);
      } else {
        setBlocked(true);
      }
    }
  }

  async function checkWhitelisted(address) {
    const { data } = await axios.get(
      'https://dg3mov3znt8u.cloudfront.net/wallets.json'
    );
    const allowedList = data.allowed.map((el) => el.toLowerCase());
    if (allowedList.includes(address.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="whitelist-intro" ref={bgRef}>
      {!blocked && (
        <video
          id="landing-video"
          onClick={login}
          // onClick={() => {
          //   bgRef.current.style.display = 'none';
          //   videoOneRef.current.play();
          // }}
          src={`${assetBaseURL}/intro_assets/intro_1_720.mov`}
          muted
          autoPlay
          loop
          height={'100%'}
          width={'100%'}
        ></video>
      )}
      {blocked && (
        <div className="blocked">
          <p>Sorry, you aren't on the allowlist</p>
        </div>
      )}
    </div>
  );
}
