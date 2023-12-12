import { ReservedRide } from "./_components/ReservedRide";
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
        <form className={styles.searchRoot}>
          <input type="search" className={styles.searchInput} placeholder="Pesquisar por local de partida..." aria-label="Pesquisar" aria-describedby="button-addon2" id="searchInput" />
          <button className="btn btn-outline-secondary" type="submit">Buscar </button>
        </form>
        <ReservedRide />
      </div>
    </main>
  );
}
