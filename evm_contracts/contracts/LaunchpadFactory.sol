// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./TokenLaunchpad.sol";

contract LaunchpadFactory is Initializable, ReentrancyGuardUpgradeable, UUPSUpgradeable, OwnableUpgradeable {
    using SafeERC20 for IERC20;

    address[] public launchpads;
    uint256 private _creatorFee;
    uint16 private _serviceFee;
    address private _feeCollector;

    struct PresaleConfig {
        IERC20 _token;
        uint256 _tokenPrice;
        uint256 _hardCap;
        uint256 _softCap;
        uint256 _minContribution;
        uint256 _maxContribution;
        uint256 _startTime;
        uint256 _endTime;
        uint256 _listingRate;
        uint16 _liquidityBP;
        address _routerAddress;
        uint256 _presaleTokens;
        TokenLaunchpad.RefundType _refundType;
        TokenLaunchpad.ListingOpt _listingOpt;
    }


    event LaunchpadCreated(address indexed launchpad, address indexed owner);

    function initialize(address feeCollectorAddress, uint256 creatorFee, uint16 serviceFee) public initializer {
        __Ownable_init(msg.sender);
        __ReentrancyGuard_init();
        __UUPSUpgradeable_init();

        require(feeCollectorAddress != address(0), "Invalid Fee collector address");

        _feeCollector = feeCollectorAddress;
        _creatorFee = creatorFee;
        _serviceFee = serviceFee;
    }

    function createLaunchpad(
        PresaleConfig memory _config
    ) external payable nonReentrant returns (address) {
        require(msg.value >= _creatorFee, "Invalid fee");
        require(_feeCollector != address(0), "Invalid Fee collector address");
        require(_config._liquidityBP > 0 && _config._liquidityBP <= 10000, "Invalid liquidity percentage");
        
        _forwardFunds();

        TokenLaunchpad newLaunchpad = new TokenLaunchpad();
        TokenLaunchpad.Config memory newConfig = TokenLaunchpad.Config({
            _owner: msg.sender,
            _token: _config._token,
            _tokenPrice: _config._tokenPrice,
            _hardCap: _config._hardCap,
            _softCap: _config._softCap,
            _minContribution: _config._minContribution,
            _maxContribution: _config._maxContribution,
            _startTime: _config._startTime,
            _endTime: _config._endTime,
            _listingRate: _config._listingRate,
            _liquidityBP: _config._liquidityBP,
            _serviceFee: _serviceFee,
            _uniswapRouter: _config._routerAddress,
            _feeCollector: _feeCollector,
            _refundType: _config._refundType,
            _listingOpt: _config._listingOpt
        });

        newLaunchpad.initialize(newConfig);

        IERC20(_config._token).safeTransferFrom(msg.sender, address(newLaunchpad), _config._presaleTokens);

        launchpads.push(address(newLaunchpad));
        emit LaunchpadCreated(address(newLaunchpad), msg.sender);
        return address(newLaunchpad);
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

    function getServiceFee() public view returns (uint16) {
        return _serviceFee;
    }

    function setServiceFee(uint16 newFee) external onlyOwner {
        _serviceFee = newFee;
    }

    function getFeeCollector() public view returns (address) {
        return _feeCollector;
    }

    function setFeeCollector(address feeCollectorAddress) external onlyOwner {
        require(feeCollectorAddress != address(0), "Invalid Fee collector address");
        _feeCollector = feeCollectorAddress;
    }

    function _forwardFunds() internal {
        payable(_feeCollector).transfer(msg.value);
    }
}
