import Web3 from 'web3'
import HDWalletProvider from '@truffle/hdwallet-provider'
import * as dotenv from "dotenv"

dotenv.config()

const GOERLI_RPC_URL = `${process.env.GOERLI_RPC_URL}`
const PRIVATE_KEY = `${process.env.PRIVATE_KEY}`

let provider: HDWalletProvider
provider = new HDWalletProvider(PRIVATE_KEY, GOERLI_RPC_URL)

const nftContract = require("../artifacts/contracts/ticketNFT.sol/ticketNFT.json")
// nft contract address
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS

const web3 = new Web3(provider)

let nftInst = new web3.eth.Contract(
  nftContract.abi, NFT_CONTRACT_ADDRESS
)

const NFT_SUPPLY = 9

async function mintNFT() {
  let accounts: string[] = await web3.eth.getAccounts()
  console.log('account', accounts[0])
  
  //get latest nonce
  const nonce: number = await web3.eth.getTransactionCount(accounts[0], "latest")
  console.log(`nonce ${nonce}`)

  try {
    const gasPrice = await web3.eth.getGasPrice()
    console.log(`gasPrice ${gasPrice}`)

    // mint NFT to organiser 
    // accounts[0] is organiser wallet
    for (let i = 0; i < NFT_SUPPLY; i++) {
      const data0 = await nftInst.methods.mintNFT(accounts[0])
      .send({from: accounts[0]})
      console.log(data0);
    }

    // show NFT number
    const data1 = await nftInst.methods.totalSupply().call()
    console.log(data1);    

  } catch (err) {
    console.log(err)
  } 
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })


