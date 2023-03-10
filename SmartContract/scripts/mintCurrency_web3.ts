import Web3 from 'web3'
import HDWalletProvider from '@truffle/hdwallet-provider'
import * as dotenv from "dotenv"

dotenv.config()

const GOERLI_RPC_URL = `${process.env.GOERLI_RPC_URL}`
const PRIVATE_KEY = `${process.env.PRIVATE_KEY}`
const MNEMONIC = `${process.env.MNEMONIC}`
let provider: HDWalletProvider
provider = new HDWalletProvider(MNEMONIC, GOERLI_RPC_URL)

const currencyContract = require("../artifacts/contracts/CurrencyToken.sol/CurrencyToken.json")
// nft contract address
const CURRENCY_CONTRACT_ADDRESS = process.env.CURRENCY_CONTRACT_ADDRESS

const web3 = new Web3(provider)

let currInst = new web3.eth.Contract(
  currencyContract.abi, CURRENCY_CONTRACT_ADDRESS
)

const CURRENCY_SUPPLY = 1000000

async function mintCurrency() {
  let accounts: string[] = await web3.eth.getAccounts()
  console.log('account0', accounts[0])
  console.log('account1', accounts[1])
  
  //get latest nonce
  const nonce: number = await web3.eth.getTransactionCount(accounts[0], "latest")
  console.log(`nonce ${nonce}`)

  try {
    const gasPrice = await web3.eth.getGasPrice()
    console.log(`gasPrice ${gasPrice}`)

    // mint currency to organiser 
    // accounts[0] is organiser wallet
    
    const data0 = await currInst.methods.mint(accounts[0], CURRENCY_SUPPLY)
      .send({from: accounts[0]})
    console.log(data0);

    if (accounts[1] != undefined) {
      const data1 = await currInst.methods.mint(accounts[1], CURRENCY_SUPPLY)
        .send({from: accounts[0]})
      console.log(data1);
    } else {
      console.log("accounts[1] is undefined")
    }
    
    // show total supply 
    const data2 = await currInst.methods.totalSupply().call()
    console.log(data2);    

  } catch (err) {
    console.log(err)
  } 
}

mintCurrency()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })


