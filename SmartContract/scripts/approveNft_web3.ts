import Web3 from 'web3'
import HDWalletProvider from '@truffle/hdwallet-provider'
import * as dotenv from "dotenv"

dotenv.config()

const GOERLI_RPC_URL = `${process.env.GOERLI_RPC_URL}`
const MNEMONIC = `${process.env.MNEMONIC}`

let provider: HDWalletProvider
provider = new HDWalletProvider(MNEMONIC, GOERLI_RPC_URL)

const nftContract = require("../artifacts/contracts/TicketNFT.sol/TicketNFT.json")
// nft contract address
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS
console.log("nft contract ",NFT_CONTRACT_ADDRESS)

const web3 = new Web3(provider)

let nftInst = new web3.eth.Contract(
  nftContract.abi, NFT_CONTRACT_ADDRESS
)

async function approveNFT() {
  let accounts: string[] = await web3.eth.getAccounts()
  console.log('account0', accounts[0])
  console.log('account1', accounts[1])

  //get latest nonce
  const nonce: number = await web3.eth.getTransactionCount(accounts[0], "latest")
  console.log(`nonce ${nonce}`)

  try {
    const gasPrice = await web3.eth.getGasPrice()
    console.log(`gasPrice ${gasPrice}`)

    // approve NFT 
    const data0 = await nftInst.methods.setApprovalForAll(accounts[1], true).send({from: accounts[0]})
    console.log(data0)

  } catch (err) {
    console.log(err)
  } 
}

approveNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })


