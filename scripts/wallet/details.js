const {abi} = require('../../artifacts/contracts/wallet/simple_account/SimpleAccount.sol/SimpleAccount.json')
const {PROVIDER , USER} = require('../general/accounts')
const fs = require('fs')
const {getContractAddress , getNonce} = require('../bundler/index')


const factory = fs.readFileSync('../setup/.factory').toString()
const provider = PROVIDER() 

const accountDetails = async (user) => {
    const wallet = await walletAddress(USER);
    const owner = await getOwner(wallet);
    const bal = await getBalance(wallet)
    const nonce = await getNonce(wallet , provider);
    return {
        wallet: wallet,
        owner: owner,
        balance: bal,
        nonce: nonce
    }
}


// wallet address of the user for the specific factory
const walletAddress = async ( user ) => {
    const owner = (await user()).address
    const wallet = await getContractAddress(factory , owner , provider);
    // console.log(wallet);
    return wallet;
}

// Gives the owwner of the wallet
const getOwner = async (walletAddr) => {
    const walletContract = new ethers.Contract(walletAddr, abi , provider);
    try{
        const owner = await walletContract.owner();
        return owner
    }catch{
        console.log('account not deployed yet: Please do a transaction');
        return '0x';
    }
}