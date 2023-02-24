import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { selectUserAddress } from "../../redux/selectors/user";
import { selectSigner } from "../../redux/selectors"
import { getTNContract } from "../../utils/web3Utils";
import styles from "./Marketplace.module.css";

let contractNT: ethers.Contract;
let account: string;

export default function Marketplace() {
  account = useSelector(selectUserAddress);
  const signer = useSelector(selectSigner);
  contractNT = getTNContract(signer);

  const buttonTextArray = ["Disable", "Buy"];
  const [buttonText, setButtonText] = useState("");
  const [NFTTotalOwn, setNFTTotalOwn] = useState<number>(0);

  const imgsrc = "https://gateway.pinata.cloud/ipfs/QmcxJNpGFmAfxVwh56ik8v7DFHxRHCm6m1QfZGt3wKsWuW"

  useEffect(() => {
    if (account == "" || account == null) {
      setButtonText(buttonTextArray[0]);
    } else {
      setButtonText(buttonTextArray[1]);
    }
  }, [account]);

  const handleClick = async (action: string) => {
    alert("action "+ action)
  }

  useEffect(() => {
    const fetchContractAsset = async() => {
      try {
        let data = await contractNT.balanceOf(account)
        console.log('data',data)
        setNFTTotalOwn(parseInt(data.toString(),10))
      } catch (e) {
        console.log("fetchContractAsset", e)
      }
    }
    fetchContractAsset()
  }, []);

  return(
    <div className={styles.container}>
      <div className={styles.title}>Marketplace</div>
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
                NFT ticket price:
              </TableCell>  
              <TableCell style={{width: '15%'}}>
               1 curency token
              </TableCell>
            </TableRow>
            <TableRow>  
              <TableCell style={{width: '20%'}}>
                Buy from organiser:
              </TableCell>
              <TableCell style={{width: '20%'}}>
                <button className={buttonText==="Disable"?styles.disableButton:styles.supplyLiquidity} 
                  onClick={()=>handleClick(`${buttonText}`)} 
                  disabled={buttonText==="Disable"?true:false}>
                  {buttonText}
                </button>
              </TableCell>
            </TableRow>
            <TableRow> 
              <TableCell style={{width: '20%'}}>
                Buy from others
              </TableCell> 
              <TableCell style={{width: '20%'}}>
                <button className={buttonText==="Disable"?styles.disableButton:styles.supplyLiquidity} 
                  onClick={()=>handleClick(`buy from others`)} 
                  disabled={buttonText==="Disable"?true:false}>
                  {buttonText}
                </button>
              </TableCell>
            </TableRow>
            <TableRow> 
              <TableCell style={{width: '20%'}}>
                You own {NFTTotalOwn} ticker 
              </TableCell> 
              <TableCell style={{width: '20%'}}>
                Sell to others
              </TableCell> 
              <TableCell style={{width: '20%'}}>
                <button className={buttonText==="Disable"?styles.disableButton:styles.supplyLiquidity} 
                  onClick={()=>handleClick("sell")} 
                  disabled={buttonText==="Disable"?true:false}>
                  Sell
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  )
}