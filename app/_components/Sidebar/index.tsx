"use client";

import { Text } from "@components/Text";
import { Bars3Icon } from "@heroicons/react/24/solid";
import React, { useRef } from "react";
import styles from "./Sidebar.module.css";
import Image from "next/image";
import Link from "next/link";
import { APIManager } from "@/app/_classes/APIManager/base";

export const Sidebar = () => {
  const optionsRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    if (!optionsRef.current) return;
    optionsRef.current!.style.display = optionsRef.current?.style.display === "block" ? "none" : "block";
  };

  return (
    <div className={styles.sidebar}>
      <Bars3Icon onClick={handleClick} className={styles.icon} />
      <div className={styles.sidebarImgRoot}>
        <Image src="/imagens/logo-no-bg.png" className={styles.sidebarImg} alt="Logo do aplicativo" width={210} height={120} />  
      </div>
      <div className={styles.sidebarOptions} ref={optionsRef}>
        <Text className={styles.sidebarOption} fixeSize asChild><Link href="/perfil">Perfil</Link></Text>
        <Text className={styles.sidebarOption} fixeSize asChild><Link href="/carona-reservada">Caronas Agendadas</Link></Text>
        <Text className={styles.sidebarOption} fixeSize onClick={() => APIManager.signOut()}>Sair</Text>
      </div> 
    </div>
  );
};