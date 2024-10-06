// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract AffiliateProgram is OwnableUpgradeable {
    uint256 public commissionRate = 500;

    mapping(address => address) public referrerOf; // referred -> referrer
    mapping(address => uint256) public commissionBalance;

    event NewReferral(address indexed referrer, address indexed referred);
    event CommissionEarned(address indexed referrer, uint256 amount);
    event CommissionWithdrawn(address indexed referrer, uint256 amount);

    // Set a new commission rate
    function setCommissionRate(uint256 newRate) external onlyOwner {
        commissionRate = newRate;
    }

    

}