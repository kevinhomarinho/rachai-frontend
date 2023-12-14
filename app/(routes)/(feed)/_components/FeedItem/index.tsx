import type { ResponseUserBody } from "@classes/APIManager/base/types/ResponseBody.types";
import { Button } from "@/app/_components/Button";
import { Text } from "@/app/_components/Text";
import styles from "./FeedItem.module.css";
import Image from "next/image";
import React from "react";

type FeedItemProps = {
  actualUser: ResponseUserBody;
  user: ResponseUserBody;
};

export const FeedItem = ({ actualUser, user }: FeedItemProps) => {
  const url = user.imagem_perfil
    ? `${process.env["NEXT_PUBLIC_BACKEND_URL"]}/${user.imagem_perfil}`
    : "/imagens/logo-no-bg.png";
  return (
    <div className={styles.feedItem}>
      <div className={styles.profileImgRoot}>
        <Image
          src={url}
          alt={`Foto de perfil do ${user.username}`} width={300} height={300} quality={100}
          className={styles.profileImg}
        />
      </div>
      <div className={styles.feedItemContent}>
        <Text size="md" weight="bold" asChild><h4>{user.username}</h4></Text>
        <Text size="sm" weight="light">{user.origem}</Text>
        <Text size="sm" weight="light">{user.destino}</Text>
        <Text size="sm" weight="light" asChild><h6>{user.horarios}</h6></Text>
        <Button style={{padding: "0.6em"}} disabled>
          <Text size="sm">
            { actualUser.motorista ? "Oferecer Carona" : "Agendar Carona" }
          </Text>
        </Button>
      </div>
    </div>
  );
};