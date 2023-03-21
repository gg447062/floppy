import React, { useRef, useState } from 'react';
import Web3 from 'web3';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { setAuthenticated, setAddress } from '../Redux/user';
import { useDispatch } from 'react-redux';
import wallets from '../../wallets.json';
import axios from 'axios';

export default function WhiteListIntro() {
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

  function checkWhitelisted(address) {
    const allowedList = wallets.allowed.map((el) => el.toLowerCase());
    if (allowedList.includes(address.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="whitelist-intro" ref={bgRef}>
      {!blocked && <button onClick={login}>Login to Enter</button>}
      {blocked && (
        <div className="blocked">
          <p>Sorry, you aren't on the allowlist</p>
        </div>
      )}
    </div>
  );
}
