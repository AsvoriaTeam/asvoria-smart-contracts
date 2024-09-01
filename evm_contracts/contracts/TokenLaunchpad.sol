// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";

contract TokenLaunchpad is Initializable, ReentrancyGuardUpgradeable, OwnableUpgradeable {
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
    uint16 public serviceFee;
    bool public presaleEnded;
    bool public presaleCanceled;
    bool public presaleRefund;
    address public burnAddress = 0x000000000000000000000000000000000000dEaD;
    address public feeCollector;

    IUniswapV2Router02 public uniswapRouter;
    address public uniswapPair;
    IERC20 public lpToken;  // LP Token received after adding liquidity


    enum RefundType {BURN, REFUND}
    RefundType public refundType;

    enum ListingOpt {AUTO, MANUAL}
    ListingOpt public listingOpt;

    struct Config {
        address _owner;
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
        uint16 _serviceFee;
        address _uniswapRouter;
        address _feeCollector;
        RefundType _refundType;
        ListingOpt _listingOpt;
    }

    mapping(address => uint256) public contributions;
    mapping(address => uint256) public tokensClaimed;
    mapping(address => uint256) public userPaidAmount;

    event TokensPurchased(address indexed purchaser, uint256 amount);
    event PresaleFinalized(bool success);
    event PresaleCanceled();
    event TokensClaimed(address indexed claimer, uint256 amount);
    event LiquidityAdded(uint256 tokenAmount, uint256 ethAmount);
    event LPTokenWithdrawn(address indexed owner, uint256 amount);

    function initialize(
        Config memory _config
    ) external initializer {
        require(_config._softCap <= _config._hardCap, "Soft cap must be <= hard cap");
        require(_config._startTime < _config._endTime, "Start time must be before end time");
        require(_config._liquidityBP > 0 && _config._liquidityBP <= 10000, "Invalid liquidity percentage");

        __Ownable_init(_config._owner);
        transferOwnership(_config._owner);

        token = _config._token;
        tokenPrice = _config._tokenPrice;
        hardCap = _config._hardCap;
        softCap = _config._softCap;
        minContribution = _config._minContribution;
        maxContribution = _config._maxContribution;
        startTime = _config._startTime;
        endTime = _config._endTime;
        presaleCanceled = false;
        listingRate = _config._listingRate;
        liquidityBP = _config._liquidityBP;
        serviceFee = _config._serviceFee;
        uniswapRouter = IUniswapV2Router02(_config._uniswapRouter);
        feeCollector = _config._feeCollector;
        refundType = _config._refundType;
        listingOpt = _config._listingOpt;
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
        require((totalRaised + weiAmount) <= hardCap, "Exceeds hard cap");

        uint8 decimals = ERC20(address(token)).decimals(); // Get the number of decimals from the token
        uint256 tokens = (weiAmount * (10**uint256(decimals))) / tokenPrice; // Adjust dynamically based on token decimals
        require(token.balanceOf(address(this)) >= tokens, "Not enough tokens available");

        userPaidAmount[msg.sender] += weiAmount;
        contributions[msg.sender] += weiAmount;
        tokensClaimed[msg.sender] = tokens;
        totalRaised += weiAmount;

        emit TokensPurchased(msg.sender, tokens);
    }

    // Finalize the presale
    function finalizePresale() external onlyOwner presaleNotEnded {
        require(block.timestamp > endTime || totalRaised >= hardCap, "Presale not ended");

        presaleEnded = true;

        if (totalRaised >= softCap) {
            // check listing type is auto or manual
            if(listingOpt == ListingOpt.AUTO) {
                // if auto transfer ethsoldfee to feecollector wallet check liquidity percentage and create liquidity and transfer remaining funds to the owner
                uint256 ethSoldFee = (totalRaised * serviceFee) / 10000;
                uint256 ethForLiquidity = ((totalRaised - ethSoldFee) * liquidityBP) / 10000;
                uint256 ownerAmount = totalRaised - ethSoldFee - ethForLiquidity;
                payable(feeCollector).transfer(ethSoldFee);
                addLiquidity(ethForLiquidity);
                payable(owner()).transfer(ownerAmount);
            } else {
                // if manual transfer ethsoldfee to feecollector wallet and remaining funds to the owner
                uint256 ethSoldFee = (totalRaised * serviceFee) / 10000;
                payable(feeCollector).transfer(ethSoldFee);
                payable(owner()).transfer(totalRaised - ethSoldFee);
            }
            // also check refund type for ico token if burn so transfer all tokens to dEaD address otherwise allow owner to withdrawunsoldtokens
            if(refundType == RefundType.BURN) {
                token.safeTransfer(burnAddress, token.balanceOf(address(this)));
            }
            emit PresaleFinalized(true);
        } else {
            //check refund type for ico token if burn so transfer all tokens to dEaD address otherwise allow owner to withdrawunsoldtokens
            if(refundType == RefundType.BURN) {
                token.safeTransfer(burnAddress, token.balanceOf(address(this)));
            }
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
        token.safeTransfer(msg.sender, amount);

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

     // Add liquidity to Uniswap after the presale is finalized
    function addLiquidity(uint256 ethForLiquidity) internal {
        require(presaleEnded, "Presale not finalized");
        require(!presaleCanceled, "Presale was canceled");

        uint8 decimals = ERC20(address(token)).decimals();
        uint256 tokensForLiquidity = (ethForLiquidity * (10**uint256(decimals))) / listingRate;

        // Approve token transfer to Uniswap router
        require(token.approve(address(uniswapRouter), tokensForLiquidity), "Token approval failed");

        // Add the liquidity
        (uint256 amountToken, uint256 amountETH, uint256 liquidity) = uniswapRouter.addLiquidityETH{value: ethForLiquidity}(
            address(token),
            tokensForLiquidity,
            0, // Slippage is acceptable
            0, // Slippage is acceptable
            address(this), // LP tokens will be sent to this contract
            block.timestamp
        );

        // Retrieve the pair address for the token and WETH
        IUniswapV2Factory factoryContract = IUniswapV2Factory(uniswapRouter.factory());
        uniswapPair = factoryContract.getPair(address(token), uniswapRouter.WETH());

        // Set the LP token instance
        lpToken = IERC20(uniswapPair);

        emit LiquidityAdded(amountToken, amountETH);
    }

    // Function to withdraw LP tokens from the contract
    function withdrawLPToken() external onlyOwner {
        require(address(lpToken) != address(0), "No LP token available");
        uint256 lpTokenBalance = lpToken.balanceOf(address(this));
        require(lpTokenBalance > 0, "No LP token balance to withdraw");

        lpToken.safeTransfer(owner(), lpTokenBalance);

        emit LPTokenWithdrawn(owner(), lpTokenBalance);
    }
}
