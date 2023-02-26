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
import { getTNContract, getCTContract } from "../../utils/web3Utils";
import ModalComponent from "./ModalComponent";
import styles from "./Marketplace.module.css";

const BUY_ACTION1 = "buy from organiser"
const BUY_ACTION2 = "buy from others"
const SELL_ACTION = "sell"
const FIXED_PRICE = 1

let contractTN: ethers.Contract;
let contractCT: ethers.Contract;
let account: string;

export default function Marketplace() {
  const buttonTextArray = ["Disable", "Buy"];
  const [buttonText, setButtonText] = useState("");
  const [previousSale, setPreviousSale] = useState<number>(FIXED_PRICE);
  const [NFTTotalOwn, setNFTTotalOwn] = useState<number>(0);
  const [typeOfTransaction, setTypeOfTransaction] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const handleOpenPopup = () => setOpenPopup(true);
  const handleClosePopup = () => setOpenPopup(false);

  account = useSelector(selectUserAddress);
  const signer = useSelector(selectSigner);
  contractTN = getTNContract(signer);
  contractCT = getCTContract(signer);

  useEffect(() => {
    if (account == "" || account == null) {
      setButtonText(buttonTextArray[0]);
    } else {
      setButtonText(buttonTextArray[1]);
    }
  }, [account]);

  const handleClick = async (action: string, price, tokenID) => {
    //alert("action "+ action + " " + tokenID + " " + price)
    console.log(price, previousSale, tokenID)
    if (action === BUY_ACTION1) {
      // buy from organiser
      alert("Your order is sent to the organiser")
      const overrides = { gasLimit: 1000000, gasPrice: 210000 };
      try {
        // check currency token total supply
        const totalSupplyCT = await contractCT.totalSupplyCurrency()
        console.log(totalSupplyCT)
        // get NFT token owner
        // token id is from tokenID
        const addressOwner = await contractTN.ownerOf(tokenID)
        console.log(addressOwner)
        // approve currency token spending, for 1 gwei
        const res0 = await contractCT.approve(account, 1000000000)
        console.log(res0)
        // send currency token from buyer to seller, for 1 wei
        const res1 = await contractCT.transferFrom(account, addressOwner, 1, overrides)
        console.log(res1)
        // transfer NFT from seller to buyer
        const res2 = await contractTN.safeTransferFromNFT(addressOwner, account, tokenID, overrides)
        console.log(res2)
        alert("Success, you can close the dialog box")
        // this transaction price is updated to previous sale price
        setPreviousSale(price)
      } catch (e) {
        console.log(e)
      }
    } else if (action === BUY_ACTION2 || action === SELL_ACTION) {
      // buy from others
      if (price <= previousSale*1.1) {
        alert("Your order is sent to secondary market")
      } else {
        alert("Order price cannot be higher than 110% of previous sale")
      }
    }
  }

  useEffect(() => {
    const fetchContractAsset = async() => {
      try {
        let data = await contractTN.balanceOf(account)
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
                {FIXED_PRICE} curency token
              </TableCell>
            </TableRow>
            <TableRow>  
              <TableCell style={{width: '20%'}}>
                Buy from organiser:
              </TableCell>
              <TableCell style={{width: '20%'}}>
                <button className={buttonText==="Disable"?styles.disableButton:styles.supplyLiquidity} 
                  onClick={()=>{setTypeOfTransaction(BUY_ACTION1);
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
                  onClick={()=>{setTypeOfTransaction(BUY_ACTION2);
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
                  onClick={()=>{setTypeOfTransaction(SELL_ACTION);
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