import { UpdateForm } from "./_components/UpdateForm";
import { Sidebar } from "@components/Sidebar";
import localStyles from "./page.module.css";
import styles from "../(feed)/page.module.css";
import React from "react";

export default async function PerfilPage() {
  return (
    <main className={styles.main}>
      <Sidebar />
      <div className={`${styles.content} ${localStyles.center}`}>
        <UpdateForm />
      </div>
    </main>
  );
}
