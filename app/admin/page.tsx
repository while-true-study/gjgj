"use client";

import React, { useLayoutEffect, useState } from "react";
import styles from "./admin.module.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Table1 from "./components/Table1";

const Page = () => {
  useLayoutEffect(() => {
    document.body.className = "";

    const wrapperDiv = document.body.querySelector("body > div");
    if (wrapperDiv) {
      wrapperDiv.replaceWith(...wrapperDiv.childNodes);
    }
  }, []);

  const [pageState, setPageState] = useState<number>(1);

  const changeState = (state: number) => {
    setPageState(state);
  };

  return (
    <div style={{ display: "flex", position: "relative" }}>
      <hr className={styles.hr}></hr>
      <Sidebar changeState={changeState} pageState={pageState} />
      <div style={{ flex: 1 }}>
        <Header></Header>
        {pageState === 1 ? (
          <Table1></Table1>
        ) : pageState === 2 ? (
          <p>2임</p>
        ) : (
          <p>3임</p>
        )}
      </div>
    </div>
  );
};

export default Page;
