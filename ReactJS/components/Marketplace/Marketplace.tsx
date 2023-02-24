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
import ModalComponent from "./ModalComponent";
import styles from "./Marketplace.module.css";

let contractNT: ethers.Contract;
let account: string;

export default function Marketplace() {
  const buttonTextArray = ["Disable", "Buy"];
  const [buttonText, setButtonText] = useState("");
  const [NFTTotalOwn, setNFTTotalOwn] = useState<number>(0);
  const [typeOfTransaction, setTypeOfTransaction] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const handleOpenPopup = () => setOpenPopup(true);
  const handleClosePopup = () => setOpenPopup(false);

  account = useSelector(selectUserAddress);
  const signer = useSelector(selectSigner);
  contractNT = getTNContract(signer);

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
    <>
    <div className={styles.container}>
      <div className={styles.title}>Marketplace</div>
      <TableContainer>
        <Table>
          <TableBody className={styles.tokenList}>
            <TableRow>
              <TableCell style={{width: '20%'}}>
                You own:
              </TableCell> 
              <TableCell style={{width: '20%'}}>
                {NFTTotalOwn} ticket
              </TableCell> 
            </TableRow>
            <TableRow>
              <TableCell style={{width: '20%'}}>
                Ticket price:
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
                  onClick={()=>{setTypeOfTransaction("buy from organiser");
                    handleOpenPopup()}}
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
                  onClick={()=>{setTypeOfTransaction("buy from others");
                    handleOpenPopup()}}
                  disabled={buttonText==="Disable"?true:false}>
                  {buttonText}
                </button>
              </TableCell>
            </TableRow>
            <TableRow> 
              <TableCell style={{width: '20%'}}>
                Sell to others
              </TableCell> 
              <TableCell style={{width: '20%'}}>
                <button className={buttonText==="Disable"?styles.disableButton:styles.supplyLiquidity} 
                  onClick={()=>{setTypeOfTransaction("sell");
                    handleOpenPopup()}}
                  disabled={buttonText==="Disable"?true:false}>
                  Sell
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
      <ModalComponent
        open={openPopup}
        onClose={handleClosePopup}
        typeOfTransaction={typeOfTransaction}
        callback={handleClick}/>
    </>
  )
}