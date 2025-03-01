import Image from "next/image";
import React from "react";
import styles from "./Footerbutton.module.css";
import Link from "next/link";

const Footerbutton = () => {
  return (
    <div className="flex justify-end mr-5">
      <Link href="/contentHost">
        <div className={styles.button}>
          <Image src="/home/+.svg" alt="+버튼" width={20} height={20}></Image>
          <span>공모전 열기</span>
        </div>
      </Link>
    </div>
  );
};

export default Footerbutton;
