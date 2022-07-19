import React from 'react';
import { useMoralis } from 'react-moralis';
// import Moralis from 'moralis/';

const Header = ({ showEditor }) => {
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
      <div id="record" className="container">
        <button
          onClick={() => {
            showEditor(true);
          }}
        >
          Press dub plate
        </button>
      </div>
      {isAuthenticated ? <div>{user.get('ethAddress')}</div> : <div />}
    </div>
  );
};

export default Header;
