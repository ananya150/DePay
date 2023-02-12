const { ethers } = require("hardhat");

 const deploy_entryPoint = async () => {
    const EntryPoint = await ethers.getContractFactory("EntryPoint");
    const entryPoint = await EntryPoint.deploy();
  
    await entryPoint.deployed();
    console.log(`EntryPoint deployed to ${entryPoint.address}`);
    return entryPoint.address;
  }

  const deploy_factory = async (entryPoint) => {
    
    const SimpleAccountFactory = await ethers.getContractFactory("SimpleAccountFactory");
    const simpleAccountFactory = await SimpleAccountFactory.deploy(entryPoint);
  
    await simpleAccountFactory.deployed();
    console.log(`SimpleAccountFactory deployed to ${simpleAccountFactory.address}`);
    return simpleAccountFactory.address;
  }

  const deploy_paymaster = async (entryPoint) => {
    
    const SimplePaymaster = await ethers.getContractFactory("SimplePaymaster");
    const simplePaymaster = await SimplePaymaster.deploy(entryPoint);
  
    await simplePaymaster.deployed();
    console.log(`SimplePaymaster deployed to ${simplePaymaster.address}`);
    return simplePaymaster.address;
  }

  module.exports = {deploy_entryPoint , deploy_factory , deploy_paymaster}
  