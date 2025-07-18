// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract DWAT is Initializable, ERC20Upgradeable, OwnableUpgradeable {
    uint256 public constant CO_FOUNDER_PERCENTAGE = 12;
    uint256 public constant DEVELOPER_PERCENTAGE = 8;
    uint256 public constant COMMUNITY_ECOSYSTEM_PERCENTAGE = 40;
    uint256 public constant ICO_PERCENTAGE = 20;
    uint256 public constant LIQUIDITY_PERCENTAGE = 15;
    uint256 public constant MARKETING_PERCENTAGE = 5;

    uint256 public constant TOTAL_SUPPLY = 100000000000 ether;

    function initialize() public initializer {
        __ERC20_init("DWAT", "DWAT");
        __Ownable_init(msg.sender);
        _mint(msg.sender, TOTAL_SUPPLY);
    }
}
