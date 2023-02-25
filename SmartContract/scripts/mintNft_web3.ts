import Web3 from 'web3'
import HDWalletProvider from '@truffle/hdwallet-provider'
import * as dotenv from "dotenv"
import {
  Multicall,
  ContractCallResults,
  ContractCallContext,
} from 'ethereum-multicall';
import { CallContext } from 'ethereum-multicall/dist/esm/models';

dotenv.config()

const GOERLI_RPC_URL = `${process.env.GOERLI_RPC_URL}`
const PRIVATE_KEY = `${process.env.PRIVATE_KEY}`

let provider: HDWalletProvider
provider = new HDWalletProvider(PRIVATE_KEY, GOERLI_RPC_URL)

const nftContract = require("../artifacts/contracts/TicketNFT.sol/TicketNFT.json")
// nft contract address
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS
console.log("nft contract ",NFT_CONTRACT_ADDRESS)

const web3 = new Web3(provider)

let nftInst = new web3.eth.Contract(
  nftContract.abi, NFT_CONTRACT_ADDRESS
)

const NFT_SUPPLY: number = 1000
const NFT_PER_BATCH: number = 100

const multicall = new Multicall({ web3Instance: web3, tryAggregate: true })

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
    const callsData: CallContext[] = []
    for (let i = 1; i <= NFT_SUPPLY; i++) {
      // multicall of smart contracts, for view methods only
      /*callsData.push({
        reference: String(i),
        methodName: 'ownerOf',
        methodParameters: [i],
      })
      if (
        i % NFT_PER_BATCH === 0 ||
        (i === NFT_SUPPLY && callsData.length > 0)
      )  {
        const results: ContractCallResults = await multicall.call({
          reference: 'mint',
          contractAddress: NFT_CONTRACT_ADDRESS!,
          abi: nftContract.abi,
          //from 0 to callsData.length of methods per multicall
          calls: callsData.splice(0, callsData.length),
        })
        console.log(JSON.stringify(results))
        //console.log(callsData.length)
        //console.log(callsData.splice(0, callsData.length))
      }*/

      // original way of minting NFT
      const data0 = await nftInst.methods.mintNFT(accounts[0]).send({from: accounts[0]})
      console.log(data0)
    }

    // show NFT number
    const data1 = await nftInst.methods.totalSupply().call()
    console.log(data1)

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


