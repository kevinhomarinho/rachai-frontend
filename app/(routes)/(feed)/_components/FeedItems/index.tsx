import { FeedItem } from "../FeedItem";
import styles from "./FeedItems.module.css";
import React from "react";

export const FeedItems = ({ isDriver }: { isDriver: boolean; }) => {
  console.log(isDriver);
  return (
    <div className={styles.items}>
      <FeedItem />
    </div>
  );
};