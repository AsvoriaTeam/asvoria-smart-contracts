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

            const tx = await factoryContract.connect(addr2).createLaunchpad(
                tokenAddress,
                presaleRate,
                hardCap,
                softCap,
                minBuy,
                maxBuy,
                startTime,
                endTime,
                listingRate,
                liquidityBP,
                routerAddress,
                tokensForLiquidity + presaleTotalTokens,
                0,
                0,                
                {
                    value: parseEther("0.2")
                }
            );

            console.log(await ethers.provider.getBalance(addr1.address))
        })
    })
})
