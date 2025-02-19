import React from "react";
import styles from "./RechargeMenu.module.css";
import RechargeBar from "../RechargeBar/RechargeBar";

const RechargeMenu = () => {
  const RechargeHandle = () => {
    console.log("충전");
  };

  return (
    <div className={styles.Menu}>
      <RechargeBar
        cash={1000}
        money={1000}
        onClick={RechargeHandle}
      ></RechargeBar>
      <RechargeBar
        cash={3000}
        money={3000}
        onClick={RechargeHandle}
      ></RechargeBar>
      <RechargeBar
        cash={5000}
        money={5000}
        hot={true}
        onClick={RechargeHandle}
      ></RechargeBar>
      <RechargeBar
        cash={10000}
        money={10000}
        onClick={RechargeHandle}
      ></RechargeBar>
    </div>
  );
};

export default RechargeMenu;
