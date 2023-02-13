const { ethers } = require("ethers");
const {abi} = require('../../artifacts/contracts/eip4337/core/EntryPoint.sol/EntryPoint.json');


const simulateVal = async (userOp , entrypoint , signer) => {
    const entryPointContract = new ethers.Contract(entrypoint , abi , signer);
    try{
    await entryPointContract.simulateValidation(userOp);
    }catch(error){
        console.log("Validation failed successfully");
    }
}

const handleOps = async (userOp , entrypoint ,signer) => {

    const entryPointContract = new ethers.Contract(entrypoint , abi , signer);
    try{
    await entryPointContract.handleOps([userOp] , signer.address).then((txObj) => {
       console.log(txObj.hash);
    });
    }catch(error){
        console.log(`error is ${error}`);
    }
}

module.exports = {simulateVal , handleOps}