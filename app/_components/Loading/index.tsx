import Image from "next/image";
import React from "react";

export const Loading = () => {
  return (
    <Image src="/imagens/loading.gif" alt="Loading" width={350} height={350} priority />
  );
};