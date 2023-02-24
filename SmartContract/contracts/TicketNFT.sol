// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract TicketNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string ticketURI = "https://ipfs.io/ipfs/QmcxJNpGFmAfxVwh56ik8v7DFHxRHCm6m1QfZGt3wKsWuW";

    constructor() ERC721("ticketNFT", "NFT") {}

    modifier lessThan1000 {
        require(_tokenIds.current() < 1000, "already 1000 tickets exist");
        _;
    }

    //get the current supply of tokens
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    // for opensea collection 
    function contractURI() public view returns (string memory) {
        return ticketURI;
    }

    function mintNFT(address recipient)
        public onlyOwner lessThan1000 returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, ticketURI);

        return newItemId;
    }

    function updateNFT(uint256 tokenId) public onlyOwner
    {
        _setTokenURI(tokenId, ticketURI);
    }

    function safeTransferFromNFT(
        address from,
        address to,
        uint256 tokenId
    ) public {
        safeTransferFrom(from, to, tokenId, "");
    }
}
