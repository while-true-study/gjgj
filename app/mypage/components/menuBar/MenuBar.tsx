import React from "react";
import styles from "./MenuBar.module.css";
import Link from "next/link";

interface menuBar {
  title: string;
  linkTo: string;
  register?: boolean;
}

const MenuBar = ({ title, linkTo, register }: menuBar) => {
  return (
    <div className={styles.content}>
      <div>
        <span>{title}</span>
        {register && <span className={styles.register}>미등록</span>}
      </div>

      <Link href={linkTo}>
        <button>
          <img src="/down.svg"></img>
        </button>
      </Link>
    </div>
  );
};

export default MenuBar;
