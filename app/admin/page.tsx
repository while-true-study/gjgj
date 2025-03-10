"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from "./admin.module.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Table1 from "./components/Table1";
import Table2 from "./components/Table2";
import Table3 from "./components/Table3";
import Cookies from "js-cookie";

const Page = () => {
  useLayoutEffect(() => {
    document.body.className = "";
    const wrapperDiv = document.body.querySelector("body > div");
    if (wrapperDiv) {
      wrapperDiv.replaceWith(...wrapperDiv.childNodes);
    }
  }, []);

  useEffect(() => {
    const role = Cookies.get("role");
    if (role != "ADMIN") {
      alert("어드민이 아닙니다.");
    }
  });

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
          <Table2></Table2>
        ) : (
          <Table3></Table3>
        )}
      </div>
    </div>
  );
};

export default Page;
