const fs = require('fs');
const {deploy_entryPoint , deploy_factory , deploy_paymaster} = require('./deploy/deploy');
const {PROVIDER , DEPLOYER , PAYMASTER , BUNDLER ,  USER , HELPER} = require('./accounts/account');
const {deposit , getDeposit} = require('./paymaster/paymaster')
const {getUserOp} = require('./bundler/userOp');
const {handleOps} = require('./bundler/bundler')
const {accountDetails} = require('./wallet/details')
const {sendEth} = require('./accounts/functions')

const main = async () => {

    const Provider = PROVIDER();
    const User = await USER();
    const Paymaster = await PAYMASTER();
    const Helper = await HELPER();

    /// depoly the contracts
    const entrypoint = await deploy_entryPoint();
    const factory = await deploy_factory(entrypoint);
    const paymaster = await deploy_paymaster(entrypoint);
    console.log('-------------------------------------------------------------------------------------')
    console.log('-------------------------------------------------------------------------------------')

    fs.writeFileSync('./.entrypoint', entrypoint);
    fs.writeFileSync('./.factory', factory);
    fs.writeFileSync('./.paymaster', paymaster);

    /// Get account details before setup
    const idetails = await accountDetails(User , factory , Provider)
    console.log('The wallet details before the setup are')
    console.log(idetails)
    console.log('-------------------------------------------------------------------------------------')
    console.log('-------------------------------------------------------------------------------------')


    /// deposit from paymaster
    await deposit(paymaster , Paymaster , 2.126);
    totalPaymasterDeposits = await getDeposit(paymaster, Provider)
    console.log(`Total paymaster deposits are ${ethers.utils.formatEther(totalPaymasterDeposits)} ethers`);
    console.log('-------------------------------------------------------------------------------------')
    console.log('-------------------------------------------------------------------------------------')


    /// deploy the wallet 
    const uop = await getUserOp('0x00000000' , entrypoint , factory , paymaster , Provider , User);
    const hash = await handleOps(uop , entrypoint , User )
    console.log('-------------------------------------------------------------------------------------')
    console.log('-------------------------------------------------------------------------------------')


    /// transfer some eth to wallet from helper account
    await sendEth(Helper , idetails.wallet , '100');


    console.log('-------------------------------------------------------------------------------------')
    console.log('-------------------------------------------------------------------------------------')
    /// Get account details after setup
    const fetails = await accountDetails(User , factory , Provider)
    console.log('The wallet details after setup are')
    console.log(fetails)

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
