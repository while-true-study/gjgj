"use client";

import React, { ReactNode, useState } from "react";
import styles from "./Input.module.css";

interface InputProps {
  type: string;
  name: string;
  label: string;
  id: string; // labeling
  rightBox?: ReactNode; // input 오른쪽에 넣을 것
  classname?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
}

const Input = ({
  label = "",
  classname,
  rightBox,
  onChange,
  ...rest
}: InputProps) => {
  const [inputState, setInputState] = useState(false);
  const [viewPW, setViewPW] = useState(false);
  return (
    <div className={`${styles.content} ${classname}`}>
      <label className={styles.label} htmlFor="id">
        {label}
      </label>
      <input
        onChange={onChange}
        className={`${styles.input} ${inputState ? styles.inputIn : null}`}
        {...rest}
      />
      {rightBox}
    </div>
  );
};

export default Input;
