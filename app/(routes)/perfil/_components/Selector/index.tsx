"use client";

import { Text } from "@components/Text";
import styles from "./Selector.module.css";
import React, { useRef } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";

type SelectorProps = {
  value: "driver" | "passenger";
  setValue: React.Dispatch<React.SetStateAction<"driver" | "passenger">>;
};

export const Selector = ({ value, setValue }: SelectorProps) => {
  const passengerRef = useRef<HTMLInputElement>(null);
  const driverRef = useRef<HTMLInputElement>(null);

  const options = [
    {
      value: "passenger",
      text: "Passageiro",
      ref: driverRef
    },
    {
      value: "driver",
      text: "Motorista",
      ref: passengerRef
    }
  ];

  const handleClick = () => {
    if (value === "driver") {
      passengerRef.current!.checked = false;
      setValue("passenger");
      return;
    }
    setValue("driver");
    driverRef.current!.checked = false;
  };

  return (
    <div className={styles.selector}>
      {
        options.map(option => (
          <div className={styles.option} key={option.value}>
            <div className={styles.input} onClick={() => option.ref.current?.click()}>
              { value === option.value && (<CheckIcon className={styles.icon} />) }
            </div>
            <input
              type="checkbox" onClick={handleClick} style={{display: "none"}}
              defaultChecked={true} ref={option.ref} name={option.value}
            />
            <Text size="sm">{option.text}</Text>
          </div>
        ))
      }
    </div>
  );
};