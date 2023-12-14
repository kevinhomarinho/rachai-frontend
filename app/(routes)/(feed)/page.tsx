import { ResponseUserBody } from "@classes/APIManager/base/types/ResponseBody.types";
import { SearchInput } from "@components/SearchInput";
import { UserManager } from "@classes/APIManager/UserManager";
import { FeedItems } from "./_components/FeedItems";
import { redirect } from "next/navigation";
import { Sidebar } from "@components/Sidebar";
import { Text } from "@components/Text";
import styles from "./page.module.css";
import React from "react";


export default async function FeedPage() {
  const findData = async () => {
    "use server";
    return UserManager.findUserByToken({ useServer: true });
  };

  const user = await findData() as ResponseUserBody & { error?: string; message?: string; };
  if (!user || user.error === "UNAUTHORIZED") redirect("/auth/signin");
  
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
