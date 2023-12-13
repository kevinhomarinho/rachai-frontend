"use client";

import { PencilIcon } from "@heroicons/react/24/solid";
import React, { useRef } from "react";
import styles from "./SelectImage.module.css";
import Image from "next/image";

type SelectImageProps = {
  setUserImage: React.Dispatch<React.SetStateAction<Blob | undefined>>;
};

export const SelectImage = ({ setUserImage }: SelectImageProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0]!;
    setUserImage(selectedFile);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.imageSelector} onClick={() => inputRef.current?.click()}>
      <Image
        src="/imagens/logo-no-bg.png"
        width={250}
        height={150}
        alt="Imagem do usuário"
      />
      <div className={styles.imageOverlay}>
        <PencilIcon className={styles.imageOverlayIcon} />
      </div>
      <input
        type="file" accept="image/webp,image/png,image/jpeg"
        ref={inputRef} style={{display: "none"}} onChange={handleFileChange}
      />
    </div>
  );
};