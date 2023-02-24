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

const style = {
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
import styles from "./Marketplace.module.css";

export default function ModalComponent({
  open,
  onClose,
  typeOfTransaction,
  callback
}) {
  const [amount, setAmount] = useState(0);

  const handleClose = () => {
    onClose();
    setAmount(0);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.modal_header}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            </Typography>
            <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
          </div>
          <div className="modal_input_amount" style={{ marginTop: "3rem" }}>
            <TextField
              id="standard-number"
              label="Unit"
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
              onChange={(e: any) => setAmount(e.target.value)}
            ></TextField>
          </div>
          <div className="modal_tx_overview" style={{ marginTop: "3rem" }}>
            <Typography id="modal-modal-title" variant="caption" component="h2">
              Transaction Overview
            </Typography>
          </div>
          <div
            className="modal_btn"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "3rem",
            }}
          >
            <Button disabled={amount ? false : true} onClick={()=>{callback(typeOfTransaction)}}>
              ticket NFT
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
