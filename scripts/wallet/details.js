const {abi} = require('../../artifacts/contracts/wallet/simple_account/SimpleAccount.sol/SimpleAccount.json')
const {getContractAddress , getNonce} = require('../bundler/userOp')
const {getBalance} = require('../accounts/functions')



const accountDetails = async (user , factory , provider) => {
    const wallet = await walletAddress(user , factory , provider);
    const owner = await getOwner(wallet , provider);
    const bal = await getBalance(wallet , provider)
    const nonce = await getNonce(wallet , provider);
    return {
        wallet: wallet,
        owner: owner,
        balance: bal,
        nonce: nonce
    }
}

module.exports = {accountDetails}


// wallet address of the user for the specific factory
const walletAddress = async ( user , factory , provider ) => {
    const owner = (user).address
    const wallet = await getContractAddress(factory , owner , provider);
    // console.log(wallet);
    return wallet;
}

// Gives the owwner of the wallet
const getOwner = async (walletAddr , provider) => {
    const walletContract = new ethers.Contract(walletAddr, abi , provider);
    try{
        const owner = await walletContract.owner();
        return owner
    }catch{
        console.log('account not deployed yet: Please do a transaction');
        return '0x';
    }
}