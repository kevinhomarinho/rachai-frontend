"use client";

import { Slot } from "@radix-ui/react-slot";
import React, { HtmlHTMLAttributes } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  asChild?: boolean;
  color?: "primary" | "secondary";
  type?: "button" | "reset" | "submit";
  style?: HtmlHTMLAttributes<HTMLButtonElement>["style"];
} & HtmlHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children, onClick, type,
  color="primary", asChild=false,
  style, className, disabled=false,
  ...props 
}: ButtonProps) => {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      onClick={onClick}
      className={`${styles.button} ${styles[`button_${color}`]} ${className} ${disabled ? styles.disabled : ""}`}
      style={style}
      type={type}
      {...props}
    >
      {children}
    </Component>
  );
};