import { Text } from "@/app/_components/Text";
import styles from "./FeedItem.module.css";
import Image from "next/image";
import React from "react";

export const FeedItem = () => {
  return (
    <div className={styles.feedItem} data-location="Itapevi">
      <div className={styles.profileImgRoot}>
        <Image className={styles.profileImg} src="/imagens/renato.jpg" alt="Foto de perfil do viajante" width={300} height={300} quality={100} />
      </div>
      <div>
        <Text size="md" weight="bold" asChild><h4>Renato Cariani</h4></Text>
        <Text size="sm" weight="light">Origem: Itapevi - SP</Text>
        <Text size="sm" weight="light">Destino: Fatec Cotia</Text>
        <Text size="sm" weight="light" asChild><h6>Segundas e quartas as 17:00</h6></Text>
        <Text size="sm">
          <a href="loading_carona.html" className={`${styles.btn} ${styles.btnAgendar}`}>
            Agendar Carona
          </a>
        </Text>
      </div>
    </div>
  );
};