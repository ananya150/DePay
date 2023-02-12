const { ethers } = require("hardhat");

const PROVIDER = () => {
    return new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
}

const getAccounts = async (index) => {
    const wallet1 = new ethers.Wallet.fromMnemonic('test test test test test test test test test test test junk', "m/44'/60'/0'/0" + `/${index}`);
    const wallet = new ethers.Wallet(wallet1.privateKey , PROVIDER());
    return wallet
}

const DEPLOYER = async () => {
    return await getAccounts(0)
}

const PAYMASTER = async () => {
    return await getAccounts(1)
}

const BUNDLER = async () => {
    return await getAccounts(2);
}

const USER = async () => {
    return await getAccounts(10)
}

module.exports = {PROVIDER , DEPLOYER , PAYMASTER , BUNDLER ,  USER}