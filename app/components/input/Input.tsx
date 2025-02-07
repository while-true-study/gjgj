"use client";

import React, { useState } from "react";
import styles from "./Input.module.css";

interface InputProps {
  type: string;
  name: string;
  label: string;
  className?: string;
  placeholder?: string;
}

const Input = ({ type, label = "", name, ...rest }: InputProps) => {
  const [inputState, setInputState] = useState(false);
  const [viewPW, setViewPW] = useState(false);
  return (
    <div className={styles.content}>
      <label className={styles.label} htmlFor="id">
        {label}
      </label>
      <input
        onChange={(e) => setInputState(e.target.value.length > 0)}
        className={`${styles.input} ${inputState ? styles.inputIn : null}`}
        type={viewPW && type === "password" ? "text" : type}
        id="id"
        name={name}
        {...rest}
      />
      {type === "password" && (
        <div onClick={() => setViewPW(!viewPW)} className={styles.EyeBox}>
          <img src={viewPW ? "/OpenEye.png" : "/CloseEye.png"}></img>
        </div>
      )}
    </div>
  );
};

export default Input;
