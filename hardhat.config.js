require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings:{
      optimizer:{
        enabled: true,
        runs: 1000,
      }
    }
  },
  networks: {
    locolhost:{
      url: 'https://localhost:8545'
    },
    goreli:{
      url: `${process.env.GORELI_RPC_URL}`,
      accounts: [`0xa47adfe550baa121d9d71a61553904c53a1addd40811da0555e56fd27e85a791`]
    },
    mumbai:{
      url: `${process.env.MUMBAI_RPC_URL}`,
      accounts: [`0xa47adfe550baa121d9d71a61553904c53a1addd40811da0555e56fd27e85a791`]
    },
    arbitrum_goreli:{
      url:`${process.env.ARB_GORELI_RPC_URL}`,
      accounts: [`0xa47adfe550baa121d9d71a61553904c53a1addd40811da0555e56fd27e85a791`]
    },
    mainnet:{
      url: `${process.env.ETH_RPC_URL}`,
      accounts: [`0xa47adfe550baa121d9d71a61553904c53a1addd40811da0555e56fd27e85a791`]
    }
  }
};
