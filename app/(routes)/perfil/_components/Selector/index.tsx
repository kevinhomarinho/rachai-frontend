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
      <div className={styles.option}>
        <div className={styles.input} onClick={() => passengerRef.current?.click()}>
          { value === "passenger" && (<CheckIcon className={styles.icon} />) }
        </div>
        <input
          type="checkbox" onClick={handleClick} style={{display: "none"}}
          defaultChecked={true} ref={passengerRef} name="passenger"
        />
        <Text size="sm">Passageiro</Text>
      </div>
      <div className={styles.option}>
        <div className={styles.input} onClick={() => driverRef.current?.click()}>
          { value === "driver" && (<CheckIcon className={styles.icon} />) }
        </div>
        <input
          type="checkbox" onClick={handleClick} style={{display: "none"}}
          defaultChecked={false} ref={driverRef} name="driver"
        />
        <Text size="sm">Motorista</Text>
      </div>
    </div>
  );
};