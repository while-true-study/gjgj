import React from "react";
import styles from "./CategoryBar.module.css";

const CategoryBar = () => {
  return (
    <div className={styles.paddingBox}>
      <div className={styles.flexBar}>
        <div>
          <img src="/category/selSlow.svg"></img>
        </div>
        <div>
          <img src="/category/selName.svg"></img>
        </div>
        <div>
          <img src="/category/selPhoto.svg"></img>
        </div>
        <div>
          <img src="/category/selLogo.svg"></img>
        </div>
        <div>
          <img src="/category/selIdea.svg"></img>
        </div>
        <div>
          <img src="/category/selEtc.svg"></img>
        </div>
      </div>
      <div className={styles.sortbar}>
        <span className={styles.sel}>마감임박순</span>
        <span>좋아요순</span>
        <span>상금높은순</span>
      </div>
    </div>
  );
};

export default CategoryBar;
