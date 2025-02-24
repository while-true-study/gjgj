import React from "react";
import styles from "./CategoryBar.module.css";

const CategoryBar = () => {
  return (
    <div className={styles.paddingBox}>
      <div className={styles.flexBar}>
        <div>
          <img src="/category/selSlow.svg" alt="슬로건"></img>
        </div>
        <div>
          <img src="/category/selName.svg" alt="네이밍"></img>
        </div>
        <div>
          <img src="/category/selPhoto.svg" alt="포토샵"></img>
        </div>
        <div>
          <img src="/category/selLogo.svg" alt="로고"></img>
        </div>
        <div>
          <img src="/category/selIdea.svg" alt="아이디어"></img>
        </div>
        <div>
          <img src="/category/selEtc.svg" alt="기타"></img>
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
