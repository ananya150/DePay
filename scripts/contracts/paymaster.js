require("@nomiclabs/hardhat-ethers");


const deploy_paymaster = async (entryPoint) => {
    
    const SimplePaymaster = await ethers.getContractFactory("SimplePaymaster");
    const simplePaymaster = await SimplePaymaster.deploy(entryPoint);
  
    await simplePaymaster.deployed();
    console.log(`SimplePaymaster deployed to ${simplePaymaster.address}`);
    return simplePaymaster.address;
  }
  
  module.exports = {deploy_paymaster}