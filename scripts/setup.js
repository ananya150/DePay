require("@nomiclabs/hardhat-ethers");
const {deploy_entryPoint} = require('./contracts/entryPoint');
const {deploy_factory} = require('./contracts/factory')
const {deploy_paymaster} = require('./contracts/paymaster')


const setup_contracts =  async () => {
    // 1) deploy the contracts - entrypoint , facrory , paymaster , test
    const entryPoint = await deploy_entryPoint();
    const factory = await deploy_factory(entryPoint);
    const paymaster = await deploy_paymaster(entryPoint);

  }

const setup_paymaster_deposit = async (signer) => {
  // Add deposit to paymaster with the siger key
  }

const setup_signed_userOp = async (to , value , data , signer) => {
  // Create signed user op with the signer key
  }

const setup_userOpToChain = async (userOP) => {
  // Send userop to chian
  }

