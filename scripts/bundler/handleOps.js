const fs = require('fs');
const {PROVIDER , BUNDLER} = require('../accounts');
const { ethers } = require("ethers");
const {abi} = require('../../artifacts/contracts/eip4337/core/EntryPoint.sol/EntryPoint.json');
const {getUserOp} = require('./userOp')


const handleOps = async () => {

    const userOp = await getUserOp('0x0000000000000000000000000000000000000000' , '0x' , '0x');
    // console.log(userOp)

    const entrypoint = fs.readFileSync('../.entrypoint').toString()
    const signer = (await BUNDLER());
    const provider = PROVIDER();

    const entryPointContract = new ethers.Contract(entrypoint , abi , signer);
    try{
    await entryPointContract.handleOps([userOp] , signer.address);
    }catch(error){
        console.log(`error is ${error}`);
    }
}

handleOps()

module.exports = {handleOps}