import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import {
  Multicall,
  ContractCallResults,
  ContractCallContext,
} from "ethereum-multicall";
import { CallContext } from "ethereum-multicall/dist/esm/models";
import { useSelector } from "react-redux";
import contracts from "../../config/constants/contracts";
import { tn_abi } from '../../config/abi/TicketNFT'
import styles from "./NFT.module.css";
import { selectSigner } from "../../redux/selectors"
import { getTNContract } from "../../utils/web3Utils";
import { selectUserAddress } from "../../redux/selectors/user";

const NFT_PER_BATCH = 100

const imgsrc = "https://gateway.pinata.cloud/ipfs/QmcxJNpGFmAfxVwh56ik8v7DFHxRHCm6m1QfZGt3wKsWuW"
const nft_con_address = contracts.TICKET_NFT[5]
let contractTN: ethers.Contract;
let account: string;

export default function NFT() {
  const [NFTTotalSupply, setNFTTotalSupply] = useState<number>(0);
  const [NFTOwned, setNFTOwned] = useState<number[]>([]);
  const signer = useSelector(selectSigner);
  contractTN = getTNContract(signer);
  account = useSelector(selectUserAddress);

  const provider = ethers.getDefaultProvider(process.env.REACT_APP_WEB3_PROVIDER_HTTPS)
  console.log(provider)
  const multicall = new Multicall({ ethersProvider: provider, tryAggregate: true })

  useEffect(() => {
    const fetchContractAsset = async() => {
      try {
        let data = await contractTN.totalSupply()
        console.log('data',data)
        setNFTTotalSupply(parseInt(data.toString(),10))
      } catch (e) {
        console.log("fetchContractAsset", e)
      }
    }
    fetchContractAsset()
  }, []);

  useEffect(() => {
    const fetchNftAsset = async() => {
      const callsData: CallContext[] = []
      try {
        const owned: number[] = [];
        for (let i = 1; i <= NFTTotalSupply; i++) {
          // multicall of smart contracts, for view methods only
          // multicall does not support set funtions
          callsData.push({
            reference: String(i),
            methodName: 'ownerOf',
            methodParameters: [i],
          })
          if (
            i % NFT_PER_BATCH === 0 ||
            (i === NFTTotalSupply && callsData.length > 0)
          )  {
            owned.push (
              ...Object.values(
                (await multicall.call({
                  reference: 'info',
                  contractAddress: contracts.TICKET_NFT[5],
                  abi: tn_abi,
                  //from 0 to callsData.length of methods per multicall
                  calls: callsData.splice(0, callsData.length),
                })
              ).results.info.callsReturnContext
              ).map(function(r, index) {
                if (r.returnValues[0].toLowerCase() == account) {
                  console.log("You own NFT tokenID ",index+1)
                  return index+1
                }
              })
            )
            console.log(owned)
          }
        }
        const newState = owned.filter((item) => {
          if (item !== undefined) {
            return item
          }
        })
        console.log(newState)
        setNFTOwned(newState)
      } catch (e) {
        console.log("fetchNftAsset", e)
      }
    }
    setNFTOwned([]) //reset the state at each invocation
    fetchNftAsset()
  }, [NFTTotalSupply])

  const nftItems = NFTOwned.map((item, index)=> 
    <TableRow style={{width: '1%'}} key={index}>
      {item}
    </TableRow>
  )

  return(
    <div className={styles.container}>
      <div className={styles.title}>NFT information</div>
      <TableContainer>
        <Table>
          <TableBody className={styles.tokenList}>
            <TableRow>
              <TableCell style={{width: '20%'}}>
                NFT ticket picture
              </TableCell>
              <TableCell style={{width: '15%'}}>
                <img src={imgsrc} alt="pic" width="50" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{width: '20%'}}>
                NFT contract address: 
              </TableCell>
              <TableCell style={{width: '15%'}}>
                {nft_con_address}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{width: '20%'}}>
                NFT total supply:
              </TableCell>  
              <TableCell style={{width: '15%'}}>
                {NFTTotalSupply}
              </TableCell>  
            </TableRow>
            <TableRow>
              <TableCell style={{width: '20%'}}>
                NFT owned by you <br/>
              </TableCell>
              <TableCell style={{width: '15%'}}>
                (sorted by TokenID):
                </TableCell>
            </TableRow>
            {nftItems}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}