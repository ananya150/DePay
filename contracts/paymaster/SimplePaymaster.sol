// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

/* solhint-disable reason-string */

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "../eip4337/core/BasePaymaster.sol";

/**
 * A token-based paymaster that accepts token deposits
 * The deposit is only a safeguard: the user pays with his token balance.
 *  only if the user didn't approve() the paymaster, or if the token balance is not enough, the deposit will be used.
 *  thus the required deposit is to cover just one method call.
 * The deposit is locked for the current block: the user must issue unlockTokenDeposit() to be allowed to withdraw
 *  (but can't use the deposit for this or further operations)
 *
 * paymasterAndData holds the paymaster address followed by the token address to use.
 * @notice This paymaster will be rejected by the standard rules of EIP4337, as it uses an external oracle.
 * (the standard rules ban accessing data of an external contract)
 * It can only be used if it is "whitelisted" by the bundler.
 * (technically, it can be used by an "oracle" which returns a static value, without accessing any storage)
 */
contract SimplePaymaster is BasePaymaster {
    
    constructor(IEntryPoint _entryPoint) BasePaymaster(_entryPoint) {}


    /**
     * Validate the request:
     * The sender should have enough deposit to pay the max possible cost.
     * Note that the sender's balance is not checked. If it fails to pay from its balance,
     * this deposit will be used to compensate the paymaster for the transaction.
     */
    function _validatePaymasterUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256 maxCost)
    internal view override returns (bytes memory context, uint256 sigTimeRange) {

        return ('',0);
    }

    /**
     * perform the post-operation to charge the sender for the gas.
     * in normal mode, use transferFrom to withdraw enough tokens from the sender's balance.
     * in case the transferFrom fails, the _postOp reverts and the entryPoint will call it again,
     * this time in *postOpReverted* mode.
     * In this mode, we use the deposit to pay (which we validated to be large enough)
     */
    function _postOp(PostOpMode mode, bytes calldata context, uint256 actualGasCost) internal override {

    }
}