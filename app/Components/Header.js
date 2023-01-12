import React from 'react';
import { useSelector } from 'react-redux';
import ConnectWalletButton from './ConnectWalletButton';

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.authenticated);
  const address = useSelector((state) => state.user.address);

  return (
    <div id="header">
      <ConnectWalletButton />
      {isAuthenticated ? (
        <div style={{ color: 'green' }}>{address}</div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Header;
