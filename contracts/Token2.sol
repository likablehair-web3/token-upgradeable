// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "./TokenStorage.sol"

contract Token2 is ERC20Upgradeable, OwnableUpgradeable, TokenStorageV2 {
    uint8 private constant VERSION = 2;
    function initialize(
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 supply
    ) public initializer {
        __ERC20_init_unchained(_tokenName, _tokenSymbol);
        __Ownable_init_unchained();

        _mint(msg.sender, supply*(1e18));
    }

    function getContractVersione() external pure returns (uint8) {
        return VERSION;
    }
}
