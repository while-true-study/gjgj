"use client";
import React from "react";
import styles from "./NavigationBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCurrentPage } from "@/redux/slices/navigationSlice";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const currnetPage = useSelector(
    (state: RootState) => state.navigation.currentPage
  );
  const handleNavigation = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className={styles.footerBox}>
      <div className={styles.NaviBar}>
        <div className={styles.NaviBox} onClick={() => handleNavigation(1)}>
          <img
            src={
              currnetPage === 1
                ? "/NavigationBar/selhome.svg"
                : "/NavigationBar/home.svg"
            }
          ></img>
        </div>
        <div className={styles.NaviBox} onClick={() => handleNavigation(2)}>
          <img
            src={
              currnetPage === 2
                ? "/NavigationBar/selcategory.svg"
                : "/NavigationBar/category.svg"
            }
          ></img>
        </div>
        <div className={styles.NaviBox} onClick={() => handleNavigation(3)}>
          <img
            src={
              currnetPage === 3
                ? "/NavigationBar/selmypage.svg"
                : "/NavigationBar/mypage.svg"
            }
          ></img>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
