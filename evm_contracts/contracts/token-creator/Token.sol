// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    uint8 private _decimals;

    constructor(address initialOwner, uint256 initialSupply, string memory name, string memory symbol, uint8 __decimals)
        ERC20(name, symbol)
        Ownable(initialOwner)
    {
        _transferOwnership(initialOwner);
        _decimals = __decimals;
        _mint(initialOwner, initialSupply * 10 ** __decimals);
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }
}