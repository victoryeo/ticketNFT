import { expect } from "chai"
import { ethers } from 'hardhat';
import { Contract, ContractFactory } from "ethers";
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';


describe("Currency", function () {
  let contractInst: Contract;
  let owner: SignerWithAddress;
  let customer: SignerWithAddress;

  beforeEach(async () => {
    let contractFac:ContractFactory;
    contractFac = await ethers.getContractFactory("CurrencyToken");
    contractInst = await contractFac.deploy("name", "symbol");

    [owner, customer] = await ethers.getSigners();
  })

  describe("test Currency", async() => {
    it("Should mint new Currency", async function () {
      const mintRes = await contractInst.mint(owner.address, 1000);
      // wait until the transaction is mined
      await mintRes.wait();
      expect(await mintRes.blockHash).to.be.a('string');

      const totalNumber = await contractInst.totalSupplyCurrency();
      console.log('totalNumber', totalNumber.toString());
      expect(await totalNumber).to.equal(1000);

    });

  })
})