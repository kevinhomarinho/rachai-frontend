import styles from "./Loading.module.css"; 
import React from "react";

export const Loading = () => {
  return (
    <div className={styles.loading}>
      <img src="/imagens/loading.gif" alt="Loading" width={350} height={350} />
    </div>
  );
};