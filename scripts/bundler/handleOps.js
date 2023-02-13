const fs = require('fs');
const {PROVIDER , BUNDLER} = require('../general/accounts');
const { ethers } = require("ethers");
const {abi} = require('../../artifacts/contracts/eip4337/core/EntryPoint.sol/EntryPoint.json');


const handleOps = async (userOp) => {


    const entrypoint = fs.readFileSync('../setup/.entrypoint').toString()
    const signer = (await BUNDLER());
    const provider = PROVIDER();

    const entryPointContract = new ethers.Contract(entrypoint , abi , signer);
    try{
    await entryPointContract.handleOps([userOp] , signer.address).then((txObj) => {
        console.log('tx hash is ' + `${txObj.hash}`);
    });
    }catch(error){
        console.log(`error is ${error}`);
    }
}

// handleOps()

module.exports = {handleOps}