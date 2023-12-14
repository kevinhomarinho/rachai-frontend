import { UserManager } from "@/app/_classes/APIManager/UserManager";
import { UpdateForm } from "./_components/UpdateForm";
import { redirect } from "next/navigation";
import { Sidebar } from "@components/Sidebar";
import localStyles from "./page.module.css";
import styles from "../(feed)/page.module.css";
import React from "react";


export default async function PerfilPage() {
  const findData = async () => {
    "use server";
    return UserManager.findUserByToken({ useServer: true });
  };
  const user = await findData();
  if (!user) redirect("/auth/signin");

  return (
    <main className={styles.main}>
      <Sidebar />
      <div className={`${styles.content} ${localStyles.center}`}>
        <UpdateForm user={user} />
      </div>
    </main>
  );
}
