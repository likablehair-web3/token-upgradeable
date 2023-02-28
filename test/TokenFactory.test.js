const { BN, constants, expectEvent, expectRevert, time } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const { expect } = require('chai');
const { ZERO_ADDRESS, MAX_UINT256 } = constants;


const TokenFactory = artifacts.require("TokenFactory")
const ERC20Preset = artifacts.require("ERC20PresetFixedSupplyUpgradeable")
const fromWei = (x) => web3.utils.fromWei(x.toString());
const toWei = (x) => web3.utils.toWei(x.toString());

let TokenProxy1, TokenProxy2;
contract('Token Factory', function (accounts) {

  const [deployer, firstAccount, secondAccount] = accounts;

  it('retrive deployed contracts', async function () {
    tokenFactoryContract = await TokenFactory.deployed();
    expect(tokenFactoryContract.address).to.be.not.equal(ZERO_ADDRESS);
    expect(tokenFactoryContract.address).to.match(/0x[0-9a-fA-F]{40}/);

  });

  it('deploy some tokens from factory', async function () {
    tx = await tokenFactoryContract.createTokenClone("First Test Token", "TT1", toWei(5000000), firstAccount, { from: deployer });
    let TokenCounter = await tokenFactoryContract.getTokenCounter();
    console.log("Deployed Token Counter: " + TokenCounter.toString());
    let TokenProxy1Address = await tokenFactoryContract.getTokenAddress(TokenCounter - 1);
    console.log("Deployed TokenProxy1 Address (from Token Factory Clone): " + TokenProxy1Address);
    TokenProxy1 = await ERC20Preset.at(TokenProxy1Address);
    console.log(fromWei(await TokenProxy1.balanceOf(firstAccount)));

    tx = await tokenFactoryContract.createTokenClone("Second Test Token", "TT2", toWei(10000000), deployer, { from: deployer });
    TokenCounter = await tokenFactoryContract.getTokenCounter();
    console.log("Deployed Token Counter: " + TokenCounter.toString());
    let TokenProxy2Address = await tokenFactoryContract.getTokenAddress(TokenCounter - 1);
    console.log("Deployed TokenProxy2 Address (from Token Factory Clone): " + TokenProxy2Address);
    TokenProxy2 = await ERC20Preset.at(TokenProxy2Address);
    console.log(fromWei(await TokenProxy2.balanceOf(deployer)));

  });

  it('distibute some tokens to TokenProxy1', async function () {
    await TokenProxy1.transfer(deployer, toWei(100000), { from: firstAccount });
    await TokenProxy1.transfer(secondAccount, toWei(150000), { from: firstAccount });
    balDepl = await TokenProxy1.balanceOf(deployer)
    balFA = await TokenProxy1.balanceOf(firstAccount)
    balSA = await TokenProxy1.balanceOf(secondAccount)

    console.log(fromWei(balDepl), fromWei(balFA), fromWei(balSA),);

  });


  it('distibute some tokens to TokenProxy2', async function () {
    await TokenProxy2.transfer(firstAccount, toWei(200000));
    await TokenProxy2.transfer(secondAccount, toWei(300000));
    balDepl = await TokenProxy2.balanceOf(deployer)
    balFA = await TokenProxy2.balanceOf(firstAccount)
    balSA = await TokenProxy2.balanceOf(secondAccount)

    console.log(fromWei(balDepl), fromWei(balFA), fromWei(balSA),);

  });


});
