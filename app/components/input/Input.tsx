"use client";

import React, { ReactNode, useState } from "react";
import styles from "./Input.module.css";

interface InputProps {
  type: string;
  name: string;
  label: string;
  id: string;
  rightBox?: ReactNode;
  classname?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  value?: string; // 추가: 부모 컴포넌트에서 value 관리
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const formatPhoneNumber = (value: string) => {
  value = value.replace(/\D/g, ""); // 숫자만 남기기

  if (value.length <= 7) {
    return value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
  } else {
    return value.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  }
};

const Input = ({
  type,
  label = "",
  classname,
  rightBox,
  onChange,
  value,
  onKeyDown,
  ...rest
}: InputProps) => {
  const [inputState, setInputState] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (type === "tel") {
      newValue = formatPhoneNumber(newValue);
    }

    onChange?.({
      // 있으면
      ...e,
      target: { ...e.target, value: newValue },
    });

    setInputState(newValue.length > 0);
  };

  return (
    <div className={`${styles.content} ${classname}`}>
      <label className={styles.label} htmlFor={rest.id}>
        {label}
      </label>
      <input
        onKeyDown={onKeyDown}
        type={type}
        value={value} // 부모에서 전달받은 값 사용
        onChange={handleChange} // 수정된 핸들러 적용
        className={`${styles.input} ${inputState ? styles.inputIn : ""}`}
        {...rest}
      />
      {rightBox}
    </div>
  );
};

export default Input;
