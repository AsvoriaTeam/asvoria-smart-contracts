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

    // Function to register a referral
    function registerReferral(address referrer) external {
        require(referrer != msg.sender, "Cannot refer yourself");
        require(referrerOf[msg.sender] == address(0), "Already referred");
        referrerOf[msg.sender] = referrer;
        emit NewReferral(referrer, msg.sender);
    }

    function recordContribution(address contributor, uint256 amount) external onlyOwner {
        address referrer = referrerOf[contributor];
        if (referrer != address(0)) {
            uint256 commission = (amount * commissionRate) / 10000;
            commissionBalance[referrer] += commission;
            emit CommissionEarned(referrer, commission);
        }
    }

    function withdrawCommission() external {
        uint256 commission = commissionBalance[msg.sender];
        require(commission > 0, "No commission available");
        commissionBalance[msg.sender] = 0;
        payable(msg.sender).transfer(commission);
        emit CommissionWithdrawn(msg.sender, commission);
    }

    



}