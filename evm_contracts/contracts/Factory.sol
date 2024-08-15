// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Token.sol";

contract TokenFactory is Ownable {
    uint256 private _creatorFee = 0.1 ether;
    address private _feeCollector;

    constructor(
        address feeCollectorAddress
    ) Ownable(msg.sender) { 
        require(feeCollectorAddress != address(0), "Invalid Address");
        _feeCollector = feeCollectorAddress;
    }

    event TokenCreated(address indexed tokenAddress, address indexed owner, uint256 initialSupply);

    function getCreatorFee() public view returns (uint256) {
        return _creatorFee;
    }

    function setCreatorFee(uint256 newFee) external onlyOwner {
        _creatorFee = newFee;
    }

    function getFeeCollector() public view returns (address) {
        return _feeCollector;
    }

    function setFeeCollector(address feeCollectorAddress) external onlyOwner {
        require(feeCollectorAddress != address(0), "Invalid Fee collector address");
        _feeCollector = feeCollectorAddress;
    }

    function createToken(address initialOwner, uint256 initialSupply, string memory name, string memory symbol, uint8 decimals) public payable returns (address) {
        require(msg.value >= _creatorFee, "Invalid Fee Amount");
        require(_feeCollector != address(0), "Invalid Fee collector address");
        _forwardFunds();
        Token newToken = new Token(initialOwner, initialSupply, name, symbol, decimals);
        emit TokenCreated(address(newToken), initialOwner, initialSupply);
        return address(newToken);

    }

    function _forwardFunds() internal {
        payable(_feeCollector).transfer(msg.value);
    }

}