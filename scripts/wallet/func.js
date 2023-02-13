const {abi} = require('../../artifacts/contracts/wallet/simple_account/SimpleAccount.sol/SimpleAccount.json')
const {getUserOp } = require('../bundler/userOp')
const {handleOps } = require('../bundler/bundler')
const { ethers } = require("ethers");
const utils = require("ethers/lib/utils");


//// SimpleAccount Functions

const exec = async (to , value , data, entrypoint , factory , paymaster , provider , signer , sender) => {

    const abi = ethers.utils.defaultAbiCoder
    const params = abi.encode(
    ["address","uint256","bytes"], // encode as address array
    [to , ethers.utils.parseEther(value) , data ])

    const calldata = "0xb61d27f6" + params.substring(2)

    const uop = await getUserOp(calldata , entrypoint , factory , paymaster , provider , signer);
    await handleOps(uop , entrypoint ,sender) ;
}


const batchExec =  async (tos , values , datas, entrypoint , factory , paymaster , provider , signer , sender) => {

    const abi = ethers.utils.defaultAbiCoder
    for (let i = 0 ; i<values.length; i++){
        values[i] = ethers.utils.parseEther(values[i])
    }
    const params = abi.encode(
    ["address[]","uint256[]","bytes[]"], // encode as address array
    [tos , values , datas ])

    const calldata = "0x47e1da2a" + params.substring(2)

    const uop = await getUserOp(calldata , entrypoint , factory , paymaster , provider , signer);
    await handleOps(uop , entrypoint ,sender) ;
}

module.exports = {exec , batchExec}