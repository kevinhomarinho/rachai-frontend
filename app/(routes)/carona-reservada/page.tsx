import { ReservedRide } from "./_components/ReservedRide";
import { SearchInput } from "@components/SearchInput";
import { Sidebar } from "@components/Sidebar";
import { Text } from "@components/Text";
import styles from "../(feed)/page.module.css";
import React from "react";

export default function CaronaReservadaPage() {
  return (
    <main className={styles.main}>
      <Sidebar />
      <div className={styles.content}>
        <Text size="md" asChild><h3>CARONAS AGENDADAS</h3></Text>
        <SearchInput />
        <ReservedRide />
      </div>
    </main>
  );
}
