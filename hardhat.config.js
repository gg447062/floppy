/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

module.exports = {
  solidity: '0.8.2',
  networks: {
    rinkeby: {
      url: process.env.MORALIS_RINKEBY_URL,
      accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`],
    },
  },
};
