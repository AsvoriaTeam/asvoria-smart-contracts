// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

import "./TokenLaunchpad.sol";

contract LaunchpadFactory is Initializable, ReentrancyGuardUpgradeable, UUPSUpgradeable, OwnableUpgradeable {
    using SafeERC20 for IERC20;

    address[] public launchpads;
    uint256 private _creatorFee = 0.2 ether;
    address private _feeCollector;

    event LaunchpadCreated(address indexed launchpad, address indexed owner);

    function initialize(address feeCollectorAddress) public initializer {
        __Ownable_init();
        _feeCollector = feeCollectorAddress;
    }

    function createLaunchpad(
        IERC20 _token,
        uint256 _tokenPrice,
        uint256 _hardCap,
        uint256 _softCap,
        uint256 _minContribution,
        uint256 _maxContribution,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _listingRate,
        uint16 _liquidityBP,
        address _routerAddress,
        uint256 _presaleTokens
    ) external  nonReentrant {
        TokenLaunchpad newLaunchpad = new TokenLaunchpad();
        newLaunchpad.initialize(
            msg.sender,
            _token,
            _tokenPrice,
            _hardCap,
            _softCap,
            _minContribution,
            _maxContribution,
            _startTime,
            _endTime,
            _listingRate,
            _liquidityBP,
            _routerAddress
        );

        IERC20(_token).safeTransferFrom(msg.sender, newLaunchpad, _presaleTokens);

        launchpads.push(address(newLaunchpad));
        emit LaunchpadCreated(address(newLaunchpad), msg.sender);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    function getLaunchpads() external view returns (address[] memory) {
        return launchpads;
    }

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
}
