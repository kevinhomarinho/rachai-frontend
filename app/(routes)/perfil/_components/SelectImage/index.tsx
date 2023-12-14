"use client";

import { PencilIcon } from "@heroicons/react/24/solid";
import React, { useRef } from "react";
import styles from "./SelectImage.module.css";
import Image from "next/image";

type SelectImageProps = {
  setUserImage: React.Dispatch<React.SetStateAction<{ file?: File; url: string; } | undefined>>;
  image?: { file?: File; url: string; };
};

export const SelectImage = ({ image, setUserImage }: SelectImageProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]!;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      window.alert("Apenas aceitamos os formatos de imagem: \".jpeg, .jpg, .png e .webp\".");
      return;
    }
    setUserImage({ file, url: URL.createObjectURL(file) });
  };

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.imageSelector} onClick={() => inputRef.current?.click()}>
      <Image
        src={image && image.url ? image.url : "/imagens/logo-no-bg.png"}
        width={250}
        height={150}
        alt="Imagem do usuário"
        className={styles.image}
        priority
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