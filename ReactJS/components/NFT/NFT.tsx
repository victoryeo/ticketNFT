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
import { useSelector } from "react-redux";
import contracts from "../../config/constants/contracts";
import styles from "./NFT.module.css";
import { selectSigner } from "../../redux/selectors"
import { getTNContract } from "../../utils/web3Utils";

const imgsrc = "https://gateway.pinata.cloud/ipfs/QmcxJNpGFmAfxVwh56ik8v7DFHxRHCm6m1QfZGt3wKsWuW"
const nft_con_address = contracts.TICKET_NFT[5]
let contractNT: ethers.Contract;

export default function NFT() {
  const [NFTTotalSupply, setNFTTotalSupply] = useState<number>(0);
  const signer = useSelector(selectSigner);
  contractNT = getTNContract(signer);

  useEffect(() => {
    const fetchContractAsset = async() => {
      try {
        let data = await contractNT.totalSupply()
        console.log('data',data)
        setNFTTotalSupply(parseInt(data.toString(),10))
      } catch (e) {
        console.log("fetchContractAsset", e)
      }
    }
    fetchContractAsset()
  }, []);

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
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}