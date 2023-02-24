import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Marketplace.module.css";
import { selectUserAddress } from "../../redux/selectors/user";

export default function Marketplace() {
  const account = useSelector(selectUserAddress);


  return(
    <div className={styles.container}>
      <div className={styles.title}>Marketplace</div>

      
    </div>
  )
}