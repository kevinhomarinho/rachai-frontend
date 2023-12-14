import { SearchInput } from "@components/SearchInput";
import { FeedItems } from "./_components/FeedItems";
import { Sidebar } from "@components/Sidebar";
import { Text } from "@components/Text";
import styles from "./page.module.css";
import React from "react";

export default async function FeedPage() {
  return (
    <main className={styles.main}>
      <Sidebar />
      <div className={styles.content}>
        <Text size="md" className={styles.barraSuperior} asChild><h3>CARONAS DISPONÍVEIS</h3></Text>
        <SearchInput />
        <FeedItems />
      </div>
    </main>
  );
}
