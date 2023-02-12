const {abi} = require('../../artifacts/contracts/paymaster/SimplePaymaster.sol/SimplePaymaster.json')
const { ethers } = require("hardhat");

  
const deposit = async (paymaster, signer , amount) => {
  const paymasterContract = new ethers.Contract(paymaster , abi , signer);
  await paymasterContract.deposit({value: ethers.utils.parseUnits(`${amount}`, "ether") });
}

const getDeposit = async (paymaster , provider) => {
  const paymasterContract = new ethers.Contract(paymaster , abi , provider);
  const deposits = await paymasterContract.getDeposit();
  return deposits;
}

module.exports = {deposit , getDeposit}
