require("@nomiclabs/hardhat-ethers");


 const deploy_entryPoint = async () => {
    
    const EntryPoint = await ethers.getContractFactory("EntryPoint");
    const entryPoint = await EntryPoint.deploy();
  
    await entryPoint.deployed();
    console.log(`EntryPoint deployed to ${entryPoint.address}`);
    return entryPoint.address;
  }

  module.exports = {deploy_entryPoint}
  