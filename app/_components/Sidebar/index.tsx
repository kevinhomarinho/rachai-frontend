import { Text } from "@components/Text";
import styles from "./Sidebar.module.css";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Image src="/imagens/logo-no-bg.png" alt="Logo do aplicativo" width={210} height={120} />  
      <div className={styles.sidebarOptions}>
        <Text className={styles.sidebarOption} fixeSize asChild><Link href="/perfil">Perfil</Link></Text>
        <Text className={styles.sidebarOption} fixeSize asChild><Link href="/carona-reservada">Caronas Agendadas</Link></Text>
        <Text className={styles.sidebarOption} fixeSize>Sair</Text>
      </div> 
    </div>
  );
};