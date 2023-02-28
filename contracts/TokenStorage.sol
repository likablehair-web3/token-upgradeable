// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
contract TokenStorageV1  {
    uint8 public constant VERSION = 1;
    uint public holderCounter;
    address public Whitelist;
  
}


contract TokenStorageV2 is TokenStorageV1{
    bool public isPaused;
  
}
