// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract CurrencyToken is Ownable, ERC20 {

    constructor(
        string memory name,
        string memory symbol
    ) ERC20(name, symbol) {}

    function totalSupplyCurrency() public view returns (uint256) {
        return totalSupply();
    }

    function mint(
      address account, 
      uint256 amount
    ) public onlyOwner returns (bool success) {
        _mint(account, amount);

        // after minting, add the allowance
        _approve(
            account,
            msg.sender,
            amount 
        );

        return true;
    }

    function transfer(
      address recipient, 
      uint256 amount
    ) public override returns (bool success) {
        console.log("transfer");
        console.log(msg.sender);
        _transfer(msg.sender, recipient, amount );
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override returns (bool success) {
        console.log("transferFrom");
        console.log(msg.sender);

        uint256 currentAllowance = allowance(sender, msg.sender);
        console.log(currentAllowance);

        _transfer(sender, recipient, amount );

        // after transfer, reduce the allowance
        _approve(
            sender,
            msg.sender,
            currentAllowance - amount 
        );

        currentAllowance = allowance(sender, msg.sender);
        console.log(currentAllowance);

        return true;
    }

}
