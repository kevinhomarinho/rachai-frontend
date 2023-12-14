import { SearchInput } from "@components/SearchInput";
import { UserManager } from "@classes/APIManager/UserManager";
import { FeedItems } from "./_components/FeedItems";
import { Sidebar } from "@components/Sidebar";
import { Text } from "@components/Text";
import styles from "./page.module.css";
import React from "react";
import { redirect } from "next/navigation";

const findData = async () => {
  return UserManager.findUserByToken({ useServer: true });
};

export default async function FeedPage() {
  const user = await findData();
  if (!user) redirect("/auth/signin");
  
  return (
    <main className={styles.main}>
      <Sidebar />
      <div className={styles.content}>
        <Text size="md" className={styles.barraSuperior} asChild><h3>CARONAS DISPONÍVEIS</h3></Text>
        <SearchInput />
        <FeedItems isDriver={JSON.parse(user.motorista)} />
      </div>
    </main>
  );
}
