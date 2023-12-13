import { PhotoIcon } from "@heroicons/react/24/solid";
import { Button } from "@components/Button";
import { Text } from "@components/Text";
import localStyles from "./FeedItemLoading.module.css";
import styles from "../FeedItem.module.css";
import React from "react";

export const FeedItemLoading = () => {
  return (
    <div className={styles.feedItem} data-location="Itapevi">
      <div className={`${styles.profileImgRoot} ${localStyles.loading}`}>
        <PhotoIcon className={localStyles.icon} />
      </div>
      <div className={styles.feedItemContent}>
        <Text size="md" weight="bold" loading asChild><h4>Loading.......</h4></Text>
        <Text size="sm" weight="light" loading>Loading...............</Text>
        <Text size="sm" weight="light" loading>Loading...............</Text>
        <Text size="sm" weight="light" loading asChild><h6>Loading.......................</h6></Text>
        <Button style={{padding: "0.6em"}} disabled>
          <Text size="sm" loading>
            Loading..........
          </Text>
        </Button>
      </div>
    </div>
  );
};