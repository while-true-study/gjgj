import React from "react";
import styles from "./CategoryBar.module.css";

interface CategoryProps {
  categoryId: number;
  changeCategory: (newCategoryId: number) => void;
  listType: number;
  chnageListType: (type: number) => void;
}

const CategoryBar = ({
  categoryId,
  changeCategory,
  listType,
  chnageListType,
}: CategoryProps) => {
  const categoryImages = [
    {
      id: 0,
      selected: "/category/selSlow.svg",
      unselected: "/category/slow.svg",
    },
    {
      id: 1,
      selected: "/category/selName.svg",
      unselected: "/category/name.svg",
    },
    {
      id: 2,
      selected: "/category/selPhoto.svg",
      unselected: "/category/photo.svg",
    },
    {
      id: 3,
      selected: "/category/selLogo.svg",
      unselected: "/category/logo.svg",
    },
    {
      id: 4,
      selected: "/category/selIdea.svg",
      unselected: "/category/idea.svg",
    },
    {
      id: 5,
      selected: "/category/selEtc.svg",
      unselected: "/category/etc.svg",
    },
  ];

  return (
    <div className={styles.paddingBox}>
      <div className={styles.flexBar}>
        {categoryImages.map(({ id, selected, unselected }) => (
          <div key={id} onClick={() => changeCategory(id)}>
            <img
              src={categoryId === id ? selected : unselected}
              alt={`category-${id}`}
            />
          </div>
        ))}
      </div>
      <div className={styles.sortbar}>
        <span
          className={listType === 1 ? styles.sel : ""}
          onClick={() => chnageListType(1)}
        >
          마감임박순
        </span>
        <span
          className={listType === 2 ? styles.sel : ""}
          onClick={() => chnageListType(2)}
        >
          좋아요순
        </span>
        <span
          className={listType === 3 ? styles.sel : ""}
          onClick={() => chnageListType(3)}
        >
          상금높은순
        </span>
      </div>
    </div>
  );
};

export default CategoryBar;
