"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { APIManager } from "@classes/APIManager/base";
import { Text } from "@components/Text";
import React, { useRef, useState } from "react";
import styles from "./Sidebar.module.css";
import Image from "next/image";
import Link from "next/link";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    if (!optionsRef.current) return;
    setOpen(optionsRef.current?.style.display !== "block");
    optionsRef.current!.style.display = optionsRef.current?.style.display === "block" ? "none" : "block";
  };

  return (
    <div className={styles.sidebar}>
      {
        open
          ? <XMarkIcon onClick={handleClick} className={styles.icon} />
          : <Bars3Icon onClick={handleClick} className={styles.icon} />
      }

      <div className={styles.sidebarImgRoot}>
        <Image src="/imagens/logo-no-bg.png" className={styles.sidebarImg} alt="Logo do aplicativo" width={210} height={120} priority />  
      </div>
      <div className={styles.sidebarOptions} ref={optionsRef} style={{display: "none"}}>
        <Text className={styles.sidebarOption} fixeSize asChild><Link href="/">Início</Link></Text>
        <Text className={styles.sidebarOption} fixeSize asChild><Link href="/perfil">Perfil</Link></Text>
        <Text className={styles.sidebarOption} fixeSize onClick={() => APIManager.signOut()}>Sair</Text>
      </div> 
    </div>
  );
};