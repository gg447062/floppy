import React from 'react';
import { useMoralis } from 'react-moralis';
import Moralis from 'moralis/';

// ROPSTEN TESTNET DEPLOYMENT

// const ADDRESS = '0x9E89f2EF3d15fED935a480675193AF85297194d7';
// import ABI from '../../abi';

// RINKEBY DEPLOY

const ADDRESS = '0xd7872f30CdbBF766fbf23322587011116fF8F80b';
const ABI = require('../../artifacts/contracts/Floppy.sol/Floppy.json').abi;

const Header = (props) => {
  const { showGallery, showCrates, showDub } = props;
  const { user, authenticate, logout, isAuthenticated, isAuthenticating } =
    useMoralis();
  async function login() {
    if (!isAuthenticated) {
      authenticate();
    }
  }
  async function mint() {
    if (isAuthenticated) {
      const address = user.get('ethAddress');
      const web3 = await Moralis.enableWeb3();
      const contract = new web3.eth.Contract(ABI, ADDRESS);
      const price = await contract.methods.mintRate().call();
      contract.methods.safeMint(address).send({ from: address, value: price });
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
        <button>Record</button>
        <button
          onClick={() => {
            showDub(true);
          }}
        >
          Press dub plate
        </button>
      </div>
      {/* {isAuthenticated ? <div>{user.get('ethAddress')}</div> : <div />} */}
      <button disabled={!isAuthenticated} onClick={mint}>
        MINT
      </button>
    </div>
  );
};

export default Header;
