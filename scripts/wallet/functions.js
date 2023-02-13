const {abi} = require('../../artifacts/contracts/wallet/simple_account/SimpleAccount.sol/SimpleAccount.json')
const {PROVIDER , USER} = require('../general/accounts')
const fs = require('fs')
const {getUserOp , handleOps} = require('../bundler/index')
const { ethers } = require("ethers");
const utils = require("ethers/lib/utils");


const factory = fs.readFileSync('../setup/.factory').toString()
const provider = PROVIDER() 


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

}

