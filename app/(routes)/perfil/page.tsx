import { UpdateForm } from "./_components/UpdateForm";
import { Sidebar } from "@components/Sidebar";
import localStyles from "./page.module.css";
import styles from "../(feed)/page.module.css";
import React from "react";
import { UserManager } from "@/app/_classes/APIManager/UserManager";

const findData = async () => {
  return UserManager.findUserByToken({ useServer: true });
};

export default async function PerfilPage() {
  const user = await findData();

  return (
    <main className={styles.main}>
      <Sidebar />
      <div className={`${styles.content} ${localStyles.center}`}>
        <UpdateForm user={user} />
      </div>
    </main>
  );
}
