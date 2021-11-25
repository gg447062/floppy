require('@nomiclabs/hardhat-ethers');
require('dotenv').config();
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.2',
  networks: {
    rinkeby: {
      url: process.env.MORALIS_RINKEBY_URL,
      accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`],
    },
  },
};
