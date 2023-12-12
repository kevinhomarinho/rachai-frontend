import { LoginForm } from "./_components/LoginForm";
import styles from "../signup/page.module.css";
import React from "react";

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <div className={styles.illustration} />
      <LoginForm />
    </main>
  );
}
