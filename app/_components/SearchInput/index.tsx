"use client";

import styles from "./SearchInput.module.css";
import React from "react";

export const SearchInput = () => {
  
  return (
    <form className={styles.searchRoot}>
      <input
        type="search" className={styles.searchInput}
        placeholder="Pesquisar por local de partida..." aria-label="Pesquisar"
        aria-describedby="button-addon2" id="searchInput"
      />
      <button className="btn btn-outline-secondary" type="submit">Buscar </button>
    </form>
  );
};