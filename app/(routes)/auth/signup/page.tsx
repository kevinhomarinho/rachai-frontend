import { RegisterForm } from "./_components/RegisterForm";
import styles from "./page.module.css";
import React from "react";

export default function RegisterPage() {
  return (
    <main className={styles.main}>
      <div className={styles.illustration} />
      <RegisterForm />
    </main>
  );
}
