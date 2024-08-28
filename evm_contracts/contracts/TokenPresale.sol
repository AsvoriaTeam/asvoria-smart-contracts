// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TokenPresale {
    using SafeMath for uint256;

    address public owner;
    address public tokenAddress;
    uint256 public startTime;
    uint256 public endTime;
    uint256 public presaleRate; // Rate of tokens per ETH or USDT
    uint256 public hardCap;     // Maximum amount of ETH/USDT to raise
    uint256 public softCap;     // Minimum amount of ETH/USDT to raise
    uint256 public raisedAmount;
    uint256 public tokenSupply; // Total tokens available for presale

    IERC20 public token;
    IERC20 public paymentToken;

    enum PresaleType { Standard, Whitelist, Private }
    PresaleType public presaleType;

    enum PaymentMethod { ETH, USDT }
    PaymentMethod public paymentMethod;

    mapping(address => uint256) public contributions;
    mapping(address => bool) public whitelist;

    event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost);
    event PresaleEnded(uint256 raisedAmount);

    constructor(
        address _tokenAddress,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _presaleRate,
        uint256 _hardCap,
        uint256 _softCap,
        uint256 _tokenSupply,
        PresaleType _presaleType,
        PaymentMethod _paymentMethod,
        address _paymentTokenAddress // Only required if _paymentMethod is USDT
    ) {
        require(_paymentMethod == PaymentMethod.ETH || _paymentTokenAddress != address(0), "Invalid payment token address");
        owner = msg.sender;
        tokenAddress = _tokenAddress;
        startTime = _startTime;
        endTime = _endTime;
        presaleRate = _presaleRate;
        hardCap = _hardCap;
        softCap = _softCap;
        tokenSupply = _tokenSupply;
        presaleType = _presaleType;
        paymentMethod = _paymentMethod;

        if (paymentMethod == PaymentMethod.USDT) {
            paymentToken = IERC20(_paymentTokenAddress);
        }
        token = IERC20(_tokenAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    modifier presaleActive() {
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Presale not active");
        require(raisedAmount < hardCap, "Hard cap reached");
        _;
    }

    modifier presaleEnded() {
        require(block.timestamp > endTime || raisedAmount >= hardCap, "Presale still active");
        _;
    }

    function buyTokens(uint256 tokenAmount) public payable presaleActive {
        uint256 cost;

        if (paymentMethod == PaymentMethod.ETH) {
            cost = tokenAmount.div(presaleRate);
            require(msg.value >= cost, "Insufficient funds sent");
        } else {
            cost = tokenAmount.div(presaleRate);
            require(paymentToken.transferFrom(msg.sender, address(this), cost), "USDT transfer failed");
        }

        require(raisedAmount.add(cost) <= hardCap, "Exceeds hard cap");
        require(tokenAmount <= tokenSupply, "Exceeds token supply");

        raisedAmount = raisedAmount.add(cost);
        tokenSupply = tokenSupply.sub(tokenAmount);
        contributions[msg.sender] = contributions[msg.sender].add(cost);

        if (paymentMethod == PaymentMethod.ETH) {
            payable(owner).transfer(cost);
        }

        token.transfer(msg.sender, tokenAmount);

        emit TokensPurchased(msg.sender, tokenAmount, cost);
    }

    function addWhitelist(address[] memory addresses) public onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelist[addresses[i]] = true;
        }
    }

    function removeWhitelist(address[] memory addresses) public onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelist[addresses[i]] = false;
        }
    }

    function isWhitelisted(address addr) public view returns (bool) {
        return whitelist[addr];
    }

    function endPresale() public onlyOwner presaleEnded {
        if (raisedAmount >= softCap) {
            // Successful presale, finalize here
        } else {
            // Failed presale, refund logic here
        }
        emit PresaleEnded(raisedAmount);
        selfdestruct(payable(owner));
    }
}
