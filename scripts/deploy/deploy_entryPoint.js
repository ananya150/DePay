require("@nomiclabs/hardhat-ethers");


async function main() {
    
    const EntryPoint = await ethers.getContractFactory("EntryPoint");
    const entryPoint = await EntryPoint.deploy();
  
    await entryPoint.deployed();
  
    console.log(`EntryPoint deployed to ${entryPoint.address}`);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });