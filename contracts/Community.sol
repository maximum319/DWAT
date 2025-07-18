// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Community is Ownable {
    IERC20 public immutable DWAT;

    event DwatTransferred(address to, uint256 amount);

    constructor(address _dwat) Ownable(msg.sender) {
        DWAT = IERC20(_dwat);
    }

    function transferDwat(address to, uint256 amount) public onlyOwner {
        DWAT.transfer(to, amount);
        emit DwatTransferred(to, amount);
    }
}
