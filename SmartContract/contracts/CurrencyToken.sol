// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract CurrencyToken is Ownable, ERC20 {
    uint8 _decimals;

    constructor(
        string memory name,
        string memory symbol,
        uint8 __decimals
    ) ERC20(name, symbol) {
      _decimals = __decimals;
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function mint(
      address account, 
      uint256 amount
    ) public virtual onlyOwner returns (bool success) {
        _mint(account, amount * (10 ** (_decimals)));

        // after minting, add the allowance
        _approve(
            account,
            msg.sender,
            amount * (10 ** (_decimals))
        );

        return true;
    }

    function transfer(
      address recipient, 
      uint256 amount
    ) public override returns (bool success) {
        console.log("transfer");
        console.log(msg.sender);
        _transfer(msg.sender, recipient, amount * (10 ** (_decimals)));
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

        _transfer(sender, recipient, amount * (10 ** (_decimals)));

        // after transfer, reduce the allowance
        _approve(
            sender,
            msg.sender,
            currentAllowance - amount * (10 ** (_decimals))
        );

        currentAllowance = allowance(sender, msg.sender);
        console.log(currentAllowance);

        return true;
    }

}
