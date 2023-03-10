import { expect, assert } from "chai"
import { ethers } from 'hardhat';
import { Contract, ContractFactory } from "ethers";
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';


describe("NFT", function () {
  let contractInst: Contract;
  let owner: SignerWithAddress;
  let customer: SignerWithAddress;

  beforeEach(async () => {
    let contractFac:ContractFactory;
    contractFac = await ethers.getContractFactory("TicketNFT");
    contractInst = await contractFac.deploy();

    [owner, customer] = await ethers.getSigners();
  })

  describe("test NFT", async() => {
    it("Should mint new NFT", async function () {
      const mintRes = await contractInst.mintNFT(owner.address);
      // wait until the transaction is mined
      await mintRes.wait();
      expect(await mintRes.blockHash).to.be.a('string');

      const totalSupply = await contractInst.totalSupply();
      console.log('totalSupply', totalSupply.toString());
      expect(await totalSupply).to.equal(1);

    });

    it("Should own minted NFT", async function () {
      const mintRes = await contractInst.mintNFT(owner.address);
      // wait until the transaction is mined
      await mintRes.wait();

      const total = await contractInst.balanceOf(owner.address);
      console.log('totalSupply', total.toString());
      expect(await total).to.equal(1);
    });

    it("transfer NFT", async function () {
      console.log('owner', owner.address)
      const mintRes = await contractInst.mintNFT(owner.address);
      // wait until the transaction is mined
      await mintRes.wait();

      const res = await contractInst.safeTransferFromNFT(
        owner.address, customer.address, 1);
      // wait until the transaction is mined
      await res.wait();

      const res2 = await contractInst.ownerOf(1);
      console.log('new owner', res2)
      expect(res2).to.equal(customer.address)
    });

    it("should return the correct royalty info", async function() {
      console.log('owner', owner.address)
      const mintRes = await contractInst.mintNFT(owner.address);
      // wait until the transaction is mined
      await mintRes.wait();
     
      // Override royalty for this token to be 10% and 
      // paid to a different account
      // NFT is minted to customer, and 
      // owner will receive the 10% royalty
      const mintRes1 = await contractInst.mintNFTWithRoyalty(customer.address, owner.address, 1000);
      await mintRes1.wait();
  
      const defaultRoyaltyInfo = await contractInst.royaltyInfo(1, 1000)
      ;
      console.log('Royalty %: ', defaultRoyaltyInfo[1].toNumber())
      assert.equal(defaultRoyaltyInfo[1].toNumber(), 10, "Royalty fee is not 10%");
    });

    it("Should batch mint new NFT", async function () {
      const numberToMint = 100
      const mintRes = await contractInst.batchMintNFT(owner.address, numberToMint);
      // wait until the transaction is mined
      await mintRes.wait();

      const totalSupply = await contractInst.totalSupply();
      console.log('totalSupply', totalSupply.toString());
      expect(await totalSupply).to.equal(numberToMint);

    });
  })
})