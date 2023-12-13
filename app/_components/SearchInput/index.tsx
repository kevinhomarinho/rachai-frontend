"use client";

import { Button } from "@components/Button";
import styles from "./SearchInput.module.css";
import React from "react";

export const SearchInput = () => {
  
  return (
    <form className={styles.searchRoot}>
      <input
        type="search" className={styles.searchInput}
        placeholder="Pesquisar por local de partida..."
        aria-label="Pesquisar"
      />
      <Button className={styles.button} type="submit">Buscar</Button>
    </form>
  );
};