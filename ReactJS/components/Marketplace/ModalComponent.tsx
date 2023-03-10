import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  InputAdornment,
  Button,
  LinearProgress
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Marketplace.module.css";

const boxstyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalComponent({
  open,
  onClose,
  typeOfTransaction,
  callback
}) {
  const [tokenID, setTokenID] = useState(0);
  const [price, setPrice] = useState(0);
  const handleClose = () => {
    onClose();
    setTokenID(0);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxstyle}>
          <div className={styles.modal_header}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {typeOfTransaction}
            </Typography>
            <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
          </div>
          <div className="modal_input_amount" style={{ marginTop: "3rem" }}>
            <TextField
              id="standard-number"
              label="Price"
              type="number"
              variant="standard"
              placeholder="0"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">Currency Token</InputAdornment>
                ),
              }}
              fullWidth
              onChange={(e: any) => setPrice(e.target.value)}
            ></TextField>
            <TextField
              id="standard-number"
              label="tokenID"
              type="number"
              variant="standard"
              placeholder="0"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">ticket NFT</InputAdornment>
                ),
              }}
              fullWidth
              onChange={(e: any) => setTokenID(e.target.value)}
            ></TextField>
          </div>
          <div className="modal_tx_overview" style={{ marginTop: "3rem" }}>
            <Typography id="modal-modal-title" variant="caption" component="h2">
              Transaction Overview
            </Typography>
            <Typography>
              Ticket NFT 
            </Typography>
          </div>
          <div
            className={styles.modal_btn}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "3rem",
            }}
          >
            <Button disabled={tokenID ? false : true} 
              onClick={()=>{callback(typeOfTransaction, price, tokenID)}}>
              {typeOfTransaction} 
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
