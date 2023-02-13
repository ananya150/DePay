const {abi} = require('../../artifacts/contracts/wallet/simple_account/SimpleAccount.sol/SimpleAccount.json')
const {getUserOp , handleOps} = require('../bundler/index')
const { ethers } = require("ethers");
const utils = require("ethers/lib/utils");


//// SimpleAccount Functions

const exec = async (to , value , data) => {

    const abi = ethers.utils.defaultAbiCoder
    const params = abi.encode(
    ["address","uint256","bytes"], // encode as address array
    [to , ethers.utils.parseEther(value) , data ])

    const calldata = "" + params.substring(2)

    const uop = await getUserOp(calldata);
    await handleOps(uop) ;

}

const batchExec = async (tos , values , datas) => {

    const abi = ethers.utils.defaultAbiCoder
    const params = abi.encode(
    ["address[]","uint256[]","bytes[]"], // encode as address array
    [tos , ethers.utils.parseEther(values) , datas ])

    const calldata = "" + params.substring(2)

    const uop = await getUserOp(calldata);
    await handleOps(uop) ;

}

