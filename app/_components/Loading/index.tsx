import styles from "./Loading.module.css"; 
import Image from "next/image";
import React from "react";

export const Loading = () => {
  return (
    <div className={styles.loading}>
      <Image src="/imagens/loading.gif" alt="Loading" width={350} height={350} priority />
    </div>
  );
};