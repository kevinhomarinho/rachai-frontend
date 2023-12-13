import styles from "./Input.module.css";
import React, { HTMLAttributes } from "react";

type InputProps = {
  placeholder?: string;
  name?: string;
  type: "text" | "email" | "password" | "checkbox";
} & HTMLAttributes<HTMLInputElement>;

export const Input = ({ type, name, placeholder, ...props }: InputProps) => {
  return (
    <input type={type} name={name} className={styles.input} placeholder={placeholder} autoComplete="none" {...props} />
  );
};
