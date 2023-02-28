const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const { BN, constants, expectEvent, expectRevert, time } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const Token = artifacts.require("Token")
const Token2 = artifacts.require("Token2")

module.exports = async (deployer, network, accounts) => {

    deployer = accounts[0];

    const tokenName = "MasterZDev Token"
    const tokenSymbol = "MDZ"
    const totSupply = 1000000;

    if (network == "development") {
        let IS_UPGRADE = false;

        let TOKEN_ADDRESS = "";

        if (IS_UPGRADE) {
            console.log("Token is being upgraded...");
            const tokenInstance = await upgradeProxy(TOKEN_ADDRESS, Token, { from: deployer });
            console.log(`New Token deployed @: ${tokenInstance.address}`);
            console.log('Token owner:', await tokenInstance.owner());
        } else {
            console.log("Token is being deployed...");
            const tokenInstance = await deployProxy(Token, [tokenName, tokenSymbol, totSupply], { from: deployer });
            console.log('Token deployed @:', tokenInstance.address);
            console.log('Token owner:', await tokenInstance.owner());
        }
    } else if (network == "dashboard") {
        let IS_UPGRADE = true;

        let TOKEN_ADDRESS = "0x05810cfb85CbA5b3eC101594B32a723Bf66eCd63";

        if (IS_UPGRADE) {
            console.log("Token is being upgraded...");
            const tokenInstance = await upgradeProxy(TOKEN_ADDRESS, Token2, { from: deployer });
            console.log(`New Token deployed @: ${tokenInstance.address}`);
            console.log('Token owner:', await tokenInstance.owner());
        } else {
            console.log("Token is being deployed...");
            const tokenInstance = await deployProxy(Token, [tokenName, tokenSymbol, totSupply], { from: deployer });
            console.log('Token deployed @:', tokenInstance.address);
            console.log('Token owner:', await tokenInstance.owner());
        }

    }

}