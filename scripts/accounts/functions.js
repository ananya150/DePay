const {HELPER , USER , PROVIDER , BUNDLER, PAYMASTER} = require('../accounts/account')
/// ETh functions

// gives the balace of an address
const getBalance = async (address , provider) => {
    const bal = await provider.getBalance(address)
    return bal.toString()
}

const sendEth = async (signer , address , amount) => {
    let tx = {
        to: address,
        // Convert currency unit from ether to wei
        value: ethers.utils.parseEther(amount)
    }
    await signer.sendTransaction(tx).then((txObj) => {
        console.log(`tx hash is ${txObj.hash} `)
    })
}

const sendTx = async (signer , to , value , data) => {
    let tx = {
        to: to,
        // Convert currency unit from ether to wei
        value: ethers.utils.parseEther(value),
        data: data
    }
    signer.sendTransaction(tx).then((txObj) => {
        console.log(`tx hash is ${txObj.hash} `)
    })
}

// async function test() {
//     const balance = await getBalance((await PAYMASTER()).address , PROVIDER())
//     console.log(balance);
// }

// test()


/// ERC-20 functions



/// Testing functions

module.exports = {getBalance , sendEth , sendTx}