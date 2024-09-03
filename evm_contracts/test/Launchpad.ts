import { expect } from "chai";
import {parseEther, formatEther, parseUnits} from 'ethers'
import {ethers, upgrades} from 'hardhat'
const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");


const setUpContracts = async () => {  
    const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
    const FactoryContract = await ethers.getContractFactory("LaunchpadFactory")
    const factoryContract = await upgrades.deployProxy(FactoryContract, [addr1.address, parseEther("0.2"), 500], {
        initializer: "initialize"
    })

    await factoryContract.waitForDeployment();

    const Token = await ethers.deployContract("Token", [addr2, 10000, "test", "TST",18])
    return {factoryContract, owner, Token, addr1, addr2, addr3, addr4};
}

describe("Launchpad", function () {
    async function deployFixtures() {
        const data = await setUpContracts()
        return data
    }

    describe("deploy factory contract", function () {
        it("Create Launchpad", async function () {
            const {factoryContract, owner, Token, addr1, addr2, addr3, addr4} = await loadFixture(deployFixtures)
            const tokenAddress = await Token.getAddress()
            const tokenDecimals = await Token.decimals()
            const presaleTokens = 100 //how many tokens in 1 Eth 
            const liquidityPercentage = 70;
            const tokenSupply = await Token.totalSupply();
            const presaleRate = parseEther((1 / presaleTokens).toString())
            const softCap = parseEther('1')
            const hardCap = parseEther('4')
            const minBuy = parseEther("0.01")
            const maxBuy = parseEther("1")
            const startTime = await time.latest()
            const endTime = await time.latest() + 86400 // 1 day in seconds
            const listingRate = parseEther((1 / 95).toString())
            const liquidityBP = liquidityPercentage * 100;
            const routerAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
            const presaleTotalTokens = parseUnits((parseFloat(hardCap.toString()) / parseFloat(presaleRate.toString())).toString(), tokenDecimals)
            const factoryAddress = await factoryContract.getAddress()

            const netHardCap = hardCap - (hardCap * BigInt(500) / BigInt(10000))
            const ethForLiquidity = netHardCap * BigInt(liquidityBP) / BigInt(10000)
            const tokensForLiquidity = BigInt((ethForLiquidity * parseUnits('1', tokenDecimals)) / listingRate)
            
            await Token.connect(addr2).approve(factoryAddress, tokensForLiquidity + presaleTotalTokens)

            const config = {
                _token: tokenAddress,
                _tokenPrice: presaleRate,
                _hardCap: hardCap,
                _softCap: softCap,
                _minContribution: minBuy,
                _maxContribution: maxBuy,
                _startTime: startTime,
                _endTime: endTime,
                _listingRate: listingRate,
                _liquidityBP: liquidityBP,
                _routerAddress: routerAddress,
                _presaleTokens: tokensForLiquidity + presaleTotalTokens,
                _liquidityLockTime: 400,
                _refundType: 0,
                _listingOpt: 0,
                _liquidityType: 0 
            }

            const tx = await factoryContract.connect(addr2).createLaunchpad(
                config,               
                {
                    value: parseEther("0.2")
                }
            );

            const launchpadAddresses = await factoryContract.getLaunchpads()
            console.log(launchpadAddresses)
        })

        it("Buy Tokens", async function () {
            const {factoryContract, owner, Token, addr1, addr2, addr3, addr4} = await loadFixture(deployFixtures)
            const tokenAddress = await Token.getAddress()
            const tokenDecimals = await Token.decimals()
            const presaleTokens = 100 //how many tokens in 1 Eth 
            const liquidityPercentage = 70;
            const tokenSupply = await Token.totalSupply();
            const presaleRate = parseEther((1 / presaleTokens).toString())
            const softCap = parseEther('0.5')
            const hardCap = parseEther('1')
            const minBuy = parseEther("0.01")
            const maxBuy = parseEther("1")
            const startTime = await time.latest()
            const endTime = await time.latest() + 86400 // 1 day in seconds
            const listingRate = parseEther((1 / 95).toString())
            const liquidityBP = liquidityPercentage * 100;
            const routerAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
            const presaleTotalTokens = parseUnits((parseFloat(hardCap.toString()) / parseFloat(presaleRate.toString())).toString(), tokenDecimals)
            const factoryAddress = await factoryContract.getAddress()

            const netHardCap = hardCap - (hardCap * BigInt(500) / BigInt(10000))
            const ethForLiquidity = netHardCap * BigInt(liquidityBP) / BigInt(10000)
            const tokensForLiquidity = BigInt((ethForLiquidity * parseUnits('1', tokenDecimals)) / listingRate)
            
            await Token.connect(addr2).approve(factoryAddress, tokensForLiquidity + presaleTotalTokens)

            const config = {
                _token: tokenAddress,
                _tokenPrice: presaleRate,
                _hardCap: hardCap,
                _softCap: softCap,
                _minContribution: minBuy,
                _maxContribution: maxBuy,
                _startTime: startTime,
                _endTime: endTime,
                _listingRate: listingRate,
                _liquidityBP: liquidityBP,
                _routerAddress: routerAddress,
                _presaleTokens: tokensForLiquidity + presaleTotalTokens,
                _liquidityLockTime: 400,
                _refundType: 0,
                _listingOpt: 0,
                _liquidityType: 1
            }

            await factoryContract.connect(addr2).createLaunchpad(
                config,               
                {
                    value: parseEther("0.2")
                }
            );

            const launchpadAddresses = await factoryContract.getLaunchpads()

            const launchpadContract = await ethers.getContractAt("TokenLaunchpad", launchpadAddresses[0])

            await launchpadContract.connect(addr3).buyTokens({value: parseEther("1")})

            await launchpadContract.connect(addr2).finalizePresale()

            const lptoken = await launchpadContract.lpToken()

            console.log(lptoken)

            const erc20Abi = [
                "function balanceOf(address account) external view returns (uint256)"
            ]
            const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")
            const lpTokenContract = new ethers.Contract(lptoken, erc20Abi, provider);

            const balance = await lpTokenContract.balanceOf(await launchpadContract.getAddress());
            console.log('before contract balance', balance)

            await time.increaseTo((await time.latest()) + (599));

            await launchpadContract.connect(addr2).withdrawLPToken()

            const balanceAfter = await lpTokenContract.balanceOf(await launchpadContract.getAddress());
            console.log('after contract balance', balanceAfter)

            const ownerBalance = await lpTokenContract.balanceOf(await addr2.getAddress());
            console.log('owner balance', ownerBalance)
        })
    })
})
