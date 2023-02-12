const fs = require('fs');
const { ethers } = require("hardhat");
const {deploy_entryPoint , deploy_factory , deploy_paymaster} = require('./contracts/depoy');

const deploy = async () => {
    const entrypoint = await deploy_entryPoint();
    const factory = await deploy_factory(entrypoint);
    const paymaster = await deploy_paymaster(entrypoint);

    fs.writeFileSync('./.entrypoint', entrypoint);
    fs.writeFileSync('./.factory', factory);
    fs.writeFileSync('./.paymaster', paymaster);
}

deploy()