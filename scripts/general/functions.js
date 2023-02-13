const {PROVIDER} = require('./accounts')
provider = PROVIDER()

/// ETh functions

// gives the balace of an address
const getBalance = async (address) => {
    const bal = await provider.getBalance(address)
    return bal.toString()
}

const sendEth = async (signer , address , amount) => {
    let tx = {
        to: address,
        // Convert currency unit from ether to wei
        value: ethers.utils.parseEther(amount)
    }
    signer.sendTransaction(tx).then((txObj) => {
        console.log('txHash', txObj.hash);
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
        console.log('txHash', txObj.hash);
    })
}

/// ERC-20 functions



/// Testing functions

module.exports = {getBalance , sendEth , sendTx}