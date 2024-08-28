// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TokenPresale.sol";  // Include the TokenPresale contract file

contract TokenPresaleFactory {
    address[] public deployedPresales;

    event PresaleCreated(address presaleAddress, address tokenAddress, uint256 startTime, uint256 endTime);

    function createPresale(
        address tokenAddress,
        uint256 startTime,
        uint256 endTime,
        uint256 presaleRate,
        uint256 hardCap,
        uint256 softCap,
        uint256 tokenSupply,
        TokenPresale.PresaleType presaleType,
        TokenPresale.PaymentMethod paymentMethod,
        address paymentTokenAddress // Only used if paymentMethod is USDT
    ) public {
        require(startTime < endTime, "Start time must be before end time");
        require(endTime > block.timestamp, "End time must be in the future");
        require(paymentMethod == TokenPresale.PaymentMethod.ETH || paymentTokenAddress != address(0), "Invalid payment token address");

        TokenPresale newPresale = new TokenPresale(
            tokenAddress,
            startTime,
            endTime,
            presaleRate,
            hardCap,
            softCap,
            tokenSupply,
            presaleType,
            paymentMethod,
            paymentTokenAddress
        );

        deployedPresales.push(address(newPresale));
        emit PresaleCreated(address(newPresale), tokenAddress, startTime, endTime);
    }

    function getDeployedPresales() public view returns (address[] memory) {
        return deployedPresales;
    }
}
