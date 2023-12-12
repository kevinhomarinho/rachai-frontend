import { Text } from "@components/Text";
import styles from "./page.module.css";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function CaronaConfirmadaPage() {
  return (
    <main className={styles.main}>
      <div className={styles.caronaConfirmada}>
        <Image src="/imagens/confirma.png" alt="Sucesso" className={styles.confirmationImage} width={100} height={100} />
        <Text asChild><h3>Carona solicitada com sucesso</h3></Text>
        <Link href="/carona-reservada" className={styles.btnPrimary}>Ver minhas caronas agendadas</Link>
      </div>
    </main>
  );
}
