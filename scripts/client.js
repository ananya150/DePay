const {abi} = require('../artifacts/contracts/wallet/simple_account/SimpleAccount.sol/SimpleAccount.json')
const {PROVIDER , USER} = require('./accounts')
const fs = require('fs')
const {getContractAddress} = require('./bundler/userOp')
const { getPackedSettings } = require('http2')

const factory = fs.readFileSync('./.factory').toString()
const provider = PROVIDER() 

const walletAddress = async ( user ) => {

    const owner = (await user()).address
    const wallet = await getContractAddress(factory , owner , provider);
    // console.log(wallet);
    return wallet;
}


const getOwner = async (walletAddr) => {
    const walletContract = new ethers.Contract(walletAddr, abi , provider);
    try{
        const owner = await walletContract.owner();
        return owner
    }catch{
        return 'Account not deployed yet'
    }
}

const test = async () => {
    const wallet = await walletAddress(USER);
    const owner = await getOwner(wallet);
    console.log((await USER()).address)
    console.log(wallet);
    console.log(owner)
}
test()