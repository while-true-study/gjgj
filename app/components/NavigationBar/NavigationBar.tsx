"use client";
import React from "react";
import styles from "./NavigationBar.module.css";
import Link from "next/link";

interface crrstate {
  state: number;
}

const NavigationBar = ({ state }: crrstate) => {
  return (
    <div className={styles.footerBox}>
      <div className={styles.NaviBar}>
        <div className={styles.NaviBox} onClick={() => console.log("1로 가기")}>
          <Link href="/home">
            <img
              src={
                state === 1
                  ? "/NavigationBar/selhome.svg"
                  : "/NavigationBar/home.svg"
              }
            ></img>
          </Link>
        </div>
        <div className={styles.NaviBox} onClick={() => console.log("2로 가기")}>
          <Link href="/category">
            <img
              src={
                state === 2
                  ? "/NavigationBar/selcategory.svg"
                  : "/NavigationBar/category.svg"
              }
            ></img>
          </Link>
        </div>
        <div
          className={styles.NaviBox}
          onClick={() => {
            console.log("3으로 가기");
          }}
        >
          <Link href="/mypage">
            <img
              src={
                state === 3
                  ? "/NavigationBar/selmypage.svg"
                  : "/NavigationBar/mypage.svg"
              }
            ></img>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
