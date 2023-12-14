"use client";

import { Button } from "@components/Button";
import React, { useRef } from "react";
import styles from "./SearchInput.module.css";

type SearchInputProps = {
  handleSearch: (search: string) => void;
};

export const SearchInput = ({ handleSearch }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current) return;
    handleSearch(inputRef.current.value);
  };

  return (
    <form className={styles.searchRoot} onSubmit={handleSubmit}>
      <input
        type="search" className={styles.searchInput}
        placeholder="Pesquisar por local de partida..."
        aria-label="Pesquisar" ref={inputRef}
      />
      <Button className={styles.button} type="submit">Buscar</Button>
    </form>
  );
};