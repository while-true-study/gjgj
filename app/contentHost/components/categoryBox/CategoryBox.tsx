import React from "react";
import styles from "./CategoryBox.module.css";

interface categoryBox {
  title: string;
  active: boolean;
  onClick: () => void;
}

const CategoryBox = ({ title, active, onClick }: categoryBox) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <div>
      <span
        className={`${styles.category} ${active ? styles.sel : ""}`}
        onClick={handleClick}
      >
        {title}
      </span>
    </div>
  );
};

export default CategoryBox;
