require("@nomiclabs/hardhat-ethers");


const deploy_factory = async (entryPoint) => {
    
    const SimpleAccountFactory = await ethers.getContractFactory("SimpleAccountFactory");
    const simpleAccountFactory = await SimpleAccountFactory.deploy(entryPoint);
  
    await simpleAccountFactory.deployed();
    console.log(`SimpleAccountFactory deployed to ${simpleAccountFactory.address}`);
    return simpleAccountFactory.address;
  }

module.exports = { deploy_factory}

  