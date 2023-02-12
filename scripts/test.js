const fs = require('fs');
const {getDeposit , deposit} = require('./contracts/paymaster');
const {PROVIDER , PAYMASTER} = require('./accounts');
const { sign } = require('crypto');


// console.log(DEPLOYER);

const test = async () => {

    const paymaster = fs.readFileSync('./.paymaster').toString()
    const signer = await PAYMASTER()

    await deposit(paymaster , signer , 2);
    const total = await getDeposit(paymaster , PROVIDER());
    console.log(total)
}

test()



