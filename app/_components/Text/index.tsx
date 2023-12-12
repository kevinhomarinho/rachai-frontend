import { Slot } from "@radix-ui/react-slot";
import styles from "./Text.module.css";
import React from "react";

type TextProps = {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  align?: "left" | "center" | "justify";
  weight?: "thin" | "light" | "regular" | "medium" | "bold" | "black";
  size?: "xxs" | "xs" | "sm" | "default" | "md" | "lg";
  fixeSize?: boolean;
  loading?: boolean
} & React.HTMLAttributes<HTMLParagraphElement>;

export const Text = ({ children, asChild=false, size="default", weight="regular", align="left", className="", fixeSize=false, loading=false, ...props }: TextProps) => {
  const Component = asChild ? Slot : "p";

  return (
    <Component 
      {...props}
      className={
        `${styles[size as keyof typeof styles]} ${styles[weight as keyof typeof styles]} ${styles[align as keyof typeof styles]} ${fixeSize ? styles[`fixed_${size}`] : ""} ${className} ${loading ? styles.loading : ""}`
      }
    >
      {children}
    </Component>
  );
};