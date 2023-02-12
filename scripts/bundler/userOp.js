const { ethers } = require("ethers");
const utils = require("ethers/lib/utils");
const fs = require('fs');
const {PROVIDER , USER} = require('../accounts');

const getUserOp = async (to , value , data) => {

    const paymaster = fs.readFileSync('../.paymaster').toString()
    const entrypoint = fs.readFileSync('../.entrypoint').toString()
    const factory = fs.readFileSync('../.factory').toString()

    const signer = (await USER());
    const owner = signer.address;
    const provider = PROVIDER();
    const wallet = await getContractAddress(factory , owner , provider);

    const op = await getUnsignedUserOp(wallet , provider , factory , owner , to , value , data , entrypoint);
    op.paymasterAndData = paymaster;
    const signedUserOp = await createSignedUserOp(op, entrypoint, provider , signer)
    console.log(signedUserOp);
}

getUserOp('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' , '0x' , '0x');







var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('aa.rpc');

const getPaddedString = (stringToPad, padLength) => {
    return stringToPad.substring(0, 2) === '0x'
      ? stringToPad.substring(2).padStart(padLength, '0')
      : stringToPad.padStart(64, '0');
  };

const calcNonce = async (address , provider) => {
    try{
        const _nonce = await provider.call({
            to: address,
            data: "0xaffed0e0"
        })
        nonce = parseInt(_nonce.substring(2) , 16)
        return (ethers.BigNumber.from(nonce));
        }catch{
            return (ethers.BigNumber.from(0))
    }
}

const getNonce = async (address , provider) => {
    return await calcNonce(address , provider)
}

const getInitCode = async (wallet, factory , owner , salt , provider) => {
    const senderAddressCode = await provider.getCode(wallet);
    if(senderAddressCode.length > 2){
        return "0x";
    }else{
        return factory+ "5fbfb9cf" + getPaddedString(owner , 64) + getPaddedString(salt , 0);
    }
}

const getCallData = (to , value , data) => {
    return "0x" + getPaddedString(to , 40) + getPaddedString(value , 64) + data.substring(2) ;
}

const getCallGasLimit = async (entryPoint , wallet , callData , provider) => {
    const callGasLimit = await provider.estimateGas({
        from: entryPoint,
        to: wallet,
        data: callData
    });
    return callGasLimit;
}

const getVerificationGasLinit = async (initCode , provider) => {
    const initGas = await estimateCreationGas(initCode , provider);
    verificationGasLimit = ethers.BigNumber.from(100000).add(initGas)
    return verificationGasLimit;
}

const getMaxFessPerGas = async (provider) => {
    const feeData = await provider.getFeeData();
    const maxFeePerGas = feeData.maxFeePerGas;
    return maxFeePerGas;
}

const getMaxPriorityFeePerGas = async (provider) => {
    const feeData = await provider.getFeeData();
    const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas
    return maxPriorityFeePerGas;
}

const getPreVerificationGas = () => {
    return "0xc350";
}

const estimateCreationGas = async (initCode , provider) => {
    if (initCode == null || initCode === '0x')
        return 0;
    const deployerAddress = initCode.substring(0, 42);
    const deployerCallData = '0x' + initCode.substring(42);
    return await provider.estimateGas({ to: deployerAddress, data: deployerCallData });
}

const getContractAddress = async (factory , owner , provider) => {

    const tempdata = "0x8cb84e18" + getPaddedString(owner , 64) + getPaddedString("0" , 64)
    const address = await provider.call({
        to: factory,
        data: tempdata
    })
    return "0x" + address.substring(address.length - 40);
}

const getUnsignedUserOp = async (wallet , provider ,factory, owner , to , value , data , entryPoint) => {

    const UserOp = {}

    UserOp.sender = wallet;
    UserOp.nonce =  await getNonce(wallet , provider) ;
    UserOp.initCode = await getInitCode(wallet , factory , owner , "0" , provider);
    UserOp.callData = getCallData(to , value , data );
    UserOp.callGasLimit = await getCallGasLimit(entryPoint , wallet , UserOp.callData , provider);
    UserOp.verificationGasLimit = await getVerificationGasLinit(UserOp.initCode , provider);
    UserOp.preVerificationGas = getPreVerificationGas();
    UserOp.maxFeePerGas = await getMaxFessPerGas(provider);
    UserOp.maxPriorityFeePerGas = await getMaxPriorityFeePerGas(provider);
    UserOp.paymasterAndData = "";
    // console.log(UserOp);
    return UserOp;
}

function encode(typevalues, forSignature) {
    const types = typevalues.map(typevalue => typevalue.type === 'bytes' && forSignature ? 'bytes32' : typevalue.type);
    const values = typevalues.map((typevalue) => typevalue.type === 'bytes' && forSignature ? (0, utils.keccak256)(typevalue.val) : typevalue.val);
    return utils.defaultAbiCoder.encode(types, values);
}

/**
 * pack the userOperation
 * @param op
 * @param forSignature "true" if the hash is needed to calculate the getUserOpHash()
 *  "false" to pack entire UserOp, for calculating the calldata cost of putting it on-chain.
 */
function packUserOp(op, forSignature = true) {
    if (forSignature) {
        // lighter signature scheme (must match UserOperation#pack): do encode a zero-length signature, but strip afterwards the appended zero-length value
        const userOpType = {
            components: [
                {
                    type: 'address',
                    name: 'sender'
                },
                {
                    type: 'uint256',
                    name: 'nonce'
                },
                {
                    type: 'bytes',
                    name: 'initCode'
                },
                {
                    type: 'bytes',
                    name: 'callData'
                },
                {
                    type: 'uint256',
                    name: 'callGasLimit'
                },
                {
                    type: 'uint256',
                    name: 'verificationGasLimit'
                },
                {
                    type: 'uint256',
                    name: 'preVerificationGas'
                },
                {
                    type: 'uint256',
                    name: 'maxFeePerGas'
                },
                {
                    type: 'uint256',
                    name: 'maxPriorityFeePerGas'
                },
                {
                    type: 'bytes',
                    name: 'paymasterAndData'
                },
                {
                    type: 'bytes',
                    name: 'signature'
                }
            ],
            name: 'userOp',
            type: 'tuple'
        };
        // console.log('hard-coded userOpType', userOpType)
        // console.log('from ABI userOpType', UserOpType)

        let encoded = utils.defaultAbiCoder.encode([userOpType], [Object.assign(Object.assign({}, op), { signature: '0x' })]);
        // remove leading word (total length) and trailing word (zero-length signature)
        encoded = '0x' + encoded.slice(66, encoded.length - 64);
        return encoded;
    }
    const typevalues = UserOpType.components.map((c) => ({
        type: c.type,
        val: op[c.name]
    }));
    return encode(typevalues, forSignature);
}

function getUserOpHash(op, entryPoint, chainId) {
    const userOpHash = (0, utils.keccak256)(packUserOp(op, true));
    const enc = utils.defaultAbiCoder.encode(['bytes32', 'address', 'uint256'], [userOpHash, entryPoint, chainId]);
    return (0, utils.keccak256)(enc);
}

const signUserOpHash = async (userOpHash , signer) => {
    return await signer.signMessage((0, utils.arrayify)(userOpHash));
}



const signUserOp = async (userOp , entrypoint , provider , signer) => {
    const chainId = await provider.getNetwork().then(net => net.chainId);
    const userOpHash = await getUserOpHash(userOp , entrypoint , chainId);
    console.log(userOpHash)
    const signature = signUserOpHash(userOpHash , signer); 
    return Object.assign(Object.assign({}, userOp), { signature });
    }

const createSignedUserOp = async (userOp , entryPoint , provider , signer ) => {
        return await signUserOp(userOp ,  entryPoint , provider , signer );
    }

/**
 * hexlify all members of object, recursively
 * @param obj
 */
function deepHexlify(obj) {
    if (typeof obj === 'function') {
        return undefined;
    }
    if (obj == null || typeof obj === 'string' || typeof obj === 'boolean') {
        return obj;
    }
    else if (obj._isBigNumber != null || typeof obj !== 'object') {
        return (0, utils.hexlify)(obj).replace(/^0x0/, '0x');
    }
    if (Array.isArray(obj)) {
        return obj.map(member => deepHexlify(member));
    }
    return Object.keys(obj)
        .reduce((set, key) => (Object.assign(Object.assign({}, set), { [key]: deepHexlify(obj[key]) })), {});
}


