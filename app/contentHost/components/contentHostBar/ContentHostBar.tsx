import React, { ChangeEvent, FocusEvent } from "react";
import styles from "./ContentHostBar.module.css";

interface HostBar {
  id: string; // id
  type: string; // type
  value: string; // 값
  label: string; // 라벨
  placeholder: string;
  maxLength?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; // 값 변경
  onChange2?: (e: ChangeEvent<HTMLTextAreaElement>) => void; // 값 변경
}

const ContentHostBar = ({
  id,
  type,
  value,
  label,
  placeholder,
  maxLength,
  onChange,
  onChange2,
}: HostBar) => {
  return (
    <div className="">
      <label className={styles.label} htmlFor={id.toString()}>
        {label}
      </label>
      <div className={styles.Box}>
        {id === "content" ? (
          <textarea
            id={id}
            value={value}
            onChange={onChange2}
            placeholder={placeholder}
            rows={6}
            cols={37}
          />
        ) : (
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            maxLength={maxLength}
          />
        )}
      </div>
    </div>
  );
};

export default ContentHostBar;
