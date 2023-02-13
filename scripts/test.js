const fs = require('fs');
const {PROVIDER , DEPLOYER , PAYMASTER , BUNDLER ,  USER , HELPER} = require('./accounts/account');
const {getUserOp} = require('./bundler/userOp');
const {handleOps} = require('./bundler/bundler')
const {accountDetails} = require('./wallet/details')
const {sendEth} = require('./accounts/functions')
const {exec} = require('./wallet/func')

const main = async () => {

    const Provider = PROVIDER();
    const User = await USER();
    const Paymaster = await PAYMASTER();
    const Helper = await HELPER();
    const Bundler = await BUNDLER();

    /// depoly the contracts
    const entrypoint = fs.readFileSync('./.entrypoint').toString();
    const factory = fs.readFileSync('./.factory').toString();
    const paymaster = fs.readFileSync('./.paymaster').toString();
    console.log('-------------------------------------------------------------------------------------')
    console.log('-------------------------------------------------------------------------------------')


    /// Get account details before setup
    const idetails = await accountDetails(User , factory , Provider)
    console.log('The wallet details before the transaction are')
    console.log(idetails)
    console.log('-------------------------------------------------------------------------------------')
    console.log('-------------------------------------------------------------------------------------')


    /// send eth from wallet to user
    const trans = await exec(User.address , '10' , '0x00000000' , entrypoint , factory , paymaster , Provider , User , Bundler )

    console.log('-------------------------------------------------------------------------------------')
    console.log('-------------------------------------------------------------------------------------')
    /// Get account details after setup
    const fetails = await accountDetails(User , factory , Provider)
    console.log('The wallet details after transaction are')
    console.log(fetails)

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
