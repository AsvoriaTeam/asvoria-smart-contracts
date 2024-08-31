// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

contract TokenLaunchpad is Initializable, ReentrancyGuardUpgradeable, OwnableUpgradeable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    IERC20 public token;
    uint256 public tokenPrice;  // Price per token in wei
    uint256 public hardCap;
    uint256 public softCap;
    uint256 public minContribution;
    uint256 public maxContribution;
    uint256 public totalRaised;
    uint256 public startTime;
    uint256 public endTime;
    uint256 public listingRate;
    uint16 public liquidityBP;
    bool public presaleEnded;
    bool public presaleCanceled;
    bool public presaleRefund;
    address public routerAddress;

    enum RefundType {BURN, REFUND}
    RefundType public refundType;

    enum ListingOpt {AUTO, MANUAL}
    ListingOpt public listingOpt;

    mapping(address => uint256) public contributions;
    mapping(address => uint256) public tokensClaimed;
    mapping(address => uint256) public userPaidAmount;

    event TokensPurchased(address indexed purchaser, uint256 amount);
    event PresaleFinalized(bool success);
    event PresaleCanceled();
    event TokensClaimed(address indexed claimer, uint256 amount);

    function initialize(
        address _owner,
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
        address _routerAddress
    ) external initializer {
        require(_softCap <= _hardCap, "Soft cap must be <= hard cap");
        require(_startTime < _endTime, "Start time must be before end time");

        __Ownable_init();
        transferOwnership(_owner);

        token = _token;
        tokenPrice = _tokenPrice;
        hardCap = _hardCap;
        softCap = _softCap;
        minContribution = _minContribution;
        maxContribution = _maxContribution;
        startTime = _startTime;
        endTime = _endTime;
        presaleCanceled = false;
        listingRate = _listingRate;
        liquidityBP = _liquidityBP;
        routerAddress = _routerAddress;
    }

    modifier presaleActive() {
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Presale is not active");
        require(!presaleEnded, "Presale has ended");
        require(!presaleCanceled, "Presale has been canceled");
        _;
    }

    modifier presaleNotEnded() {
        require(!presaleEnded, "Presale has ended");
        _;
    }

    // Function to buy tokens
    function buyTokens() external payable nonReentrant presaleActive {
        uint256 weiAmount = msg.value;
        require(weiAmount >= minContribution && weiAmount <= maxContribution, "Contribution not within limits");
        require(totalRaised.add(weiAmount) <= hardCap, "Exceeds hard cap");

        uint8 decimals = ERC20(address(token)).decimals(); // Get the number of decimals from the token
        uint256 tokens = weiAmount.mul(10**uint256(decimals)).div(tokenPrice); // Adjust dynamically based on token decimals
        require(token.balanceOf(address(this)) >= tokens, "Not enough tokens available");

        userPaidAmount[msg.sender] = weiAmount;
        contributions[msg.sender] = contributions[msg.sender].add(weiAmount);
        tokensClaimed[msg.sender] = tokensClaimed[msg.sender].add(tokens);
        totalRaised = totalRaised.add(weiAmount);

        emit TokensPurchased(msg.sender, tokens);
    }

    // Finalize the presale
    function finalizePresale() external onlyOwner presaleNotEnded {
        require(block.timestamp > endTime || totalRaised >= hardCap, "Presale not ended");

        presaleEnded = true;

        if (totalRaised >= softCap) {
            // check listing type is auto or manual
            // if auto transfer ethsoldfee to feecollector wallet check liquidity percentage and create liquidity and transfer remaining funds to the owner
            // if manual transfer ethsoldfee to feecollector wallet and remaining funds to the owner
            // also check refund type for ico token if burn so transfer all tokens to dEaD address otherwise allow owner to withdrawunsoldtokens
            payable(owner()).transfer(totalRaised);
            emit PresaleFinalized(true);
        } else {
            //check refund type for ico token if burn so transfer all tokens to dEaD address otherwise allow owner to withdrawunsoldtokens
            refundContributors();
            emit PresaleFinalized(false);
        }
    }

    // Cancel the presale
    function cancelPresale() external onlyOwner presaleNotEnded {
        presaleCanceled = true;
        refundContributors();
        emit PresaleCanceled();
    }

    // Refund contributors if presale is canceled or soft cap is not met
    function refundContributors() internal {
        presaleRefund = true;
    }

    // Withdraw unsold tokens after presale ends
    function withdrawUnsoldTokens() external onlyOwner {
        require(presaleEnded || presaleCanceled, "Presale not ended or canceled");
        uint256 unsoldTokens = token.balanceOf(address(this));
        token.safeTransfer(owner(), unsoldTokens);
    }

    // Emergency stop function in case something goes wrong
    function emergencyStop() external onlyOwner presaleNotEnded {
        presaleEnded = true;
        refundContributors();
        emit PresaleFinalized(false);
    }

    // Allow contributors to claim their tokens after presale ends
    function claimTokens() external nonReentrant {
        require(presaleEnded, "Presale not finalized");
        require(!presaleCanceled, "Presale was canceled");
        require(!presaleRefund, "Presale was refunded");
        require(tokensClaimed[msg.sender] > 0, "No tokens to claim");

        uint256 amount = tokensClaimed[msg.sender];
        tokensClaimed[msg.sender] = 0;
        require(token.safeTransfer(msg.sender, amount), "Token transfer failed");

        emit TokensClaimed(msg.sender, amount);
    }

    function claimUserRefund() external nonReentrant {
        require(presaleRefund, "Presale is not refunded");
        uint256 userRefund = userPaidAmount[msg.sender];
        if(userRefund > 0) {
                userPaidAmount[msg.sender] = 0;
                payable(msg.sender).transfer(userRefund);
        }
    }

    function withdrawLiquidityToken() external onlyOwner {
        // withdraw LP token function to be implement here
    }
}
