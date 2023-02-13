const fs = require('fs');
const {PROVIDER , BUNDLER} = require('../general/accounts');
const { ethers } = require("ethers");
const {abi} = require('../../artifacts/contracts/eip4337/core/EntryPoint.sol/EntryPoint.json');
const {getUserOp} = require('./userOp')


const simulateVal = async () => {

    const userOp = await getUserOp('0xa9c6C773e89D366CE677fd4c172edE648609A219' , '0x' , '0x');
    // console.log(userOp)

    const entrypoint = fs.readFileSync('../setup/.entrypoint').toString()
    const signer = (await BUNDLER());
    const provider = PROVIDER();

    const entryPointContract = new ethers.Contract(entrypoint , abi , signer);
    try{
    await entryPointContract.simulateValidation(userOp);
    }catch(error){
        console.log("success validation");
    }

}

module.exports = {simulateVal}