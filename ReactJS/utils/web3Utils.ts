import { ethers } from 'ethers'
import contracts from '../config/constants/contracts'
import { tn_abi } from '../config/abi/TicketNFT'
import { ct_abi } from '../config/abi/CurrencyToken'

const getContract = (abi: any, address: string, signer: ethers.providers.Provider | ethers.Signer) => {
  const contract = new ethers.Contract(address, abi, signer)
  return contract
}

export const getCTContract = (signer: ethers.providers.Provider | ethers.Signer) => {
  console.log("getLPContract", signer)
  return getContract(ct_abi, contracts.CURRENCY_TOKEN[5], signer)
}

export const getTNContract = (signer: ethers.providers.Provider | ethers.Signer): ethers.Contract => {
  console.log("getWethGwContract", signer)
  return getContract(tn_abi, contracts.TICKET_NFT[5], signer)
}

