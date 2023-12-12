import { Text } from "@/app/_components/Text";
import styles from "../../../(feed)/_components/FeedItem/FeedItem.module.css";
import Image from "next/image";
import React from "react";

export const ReservedRide = () => {
  return (
    <div className={styles.feedItem} data-location="Itapevi">
      <div className={styles.profileImgRoot}>
        <Image className={styles.profileImg} src="/imagens/renato.jpg" alt="Foto de perfil do viajante" width={300} height={300} quality={100} />
      </div>
      <div>
        <Text size="md" weight="bold" asChild><h4>Renato Cariani</h4></Text>
        <Text size="sm" weight="light">Origem: Itapevi - SP</Text>
        <Text size="sm" weight="light">Destino: Fatec Cotia</Text>
        <Text size="sm" weight="bold">Aguardando confirmação</Text>
      </div>
    </div>
  );
};