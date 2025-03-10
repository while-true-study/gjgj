import React from "react";
import styles from "./TopBarHome.module.css";
import Link from "next/link";

const TopBarHome = () => {
  const searchClick = () => {
    console.log("searchClick");
  };
  // const alarmClick = () => {
  //   console.log("alarmClick");
  // };

  return (
    <div className={styles.topMenu}>
      <span className="text-2xl font-normal text-fontcolor font-ef-aone">
        끄적끄적
      </span>
      <div className={styles.rigthbox}>
        <Link href="/home/homeSearch">
          <img src="/TopBarHome/search.svg" onClick={searchClick}></img>
        </Link>
        {/* <Link href="/home/homeNotice">
          <img
            src={false ? "/TopBarHome/notice.svg" : "/TopBarHome/alarm.svg"}
            onClick={alarmClick}
          ></img>
        </Link> */}
      </div>
    </div>
  );
};

export default TopBarHome;
