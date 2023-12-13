"use client";

import type { ResponseUserBody } from "@classes/APIManager/base/types/ResponseBody.types";
import { CaronasManager } from "@classes/APIManager/CaronasManager";
import { mergeArray } from "@functions/mergeArray";
import { FeedItem } from "../FeedItem";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./FeedItems.module.css";
import { FeedItemLoading } from "../FeedItem/FeedItemLoading";

export const FeedItems = ({ isDriver }: { isDriver: boolean; }) => {
  console.log(isDriver);

  const [allItemsLoaded, setAllItemsLoaded] = useState(false);
  const [searching, setSearching] = useState(false);
  const [items, setItems] = useState<ResponseUserBody[]>([]);
  const [page, setPage] = useState(0);

  const getitems = async () => {
    if (searching) return;
    setSearching(true);
    const allitems = await CaronasManager.findAll(page) as ResponseUserBody[] & { error?: string; message?: string; };

    if (!allitems || allitems.error || allitems.length === 0) {
      setSearching(false);
      return setAllItemsLoaded(true);
    }

    if (page === 0) {
      setSearching(false);
      return setItems(allitems);
    }

    if (allitems.length < 10) setAllItemsLoaded(true);
    setSearching(false);
    setItems(previtems => (mergeArray(previtems, allitems) as ResponseUserBody[]));
  };

  const handleGlobalScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const scrollThreshold = 100;
    const needToRenderMore = scrollHeight - scrollTop <= clientHeight + scrollThreshold;
    if (!needToRenderMore || searching || allItemsLoaded) return;
    setPage(prevPage => prevPage + 1);
  }, [searching, allItemsLoaded]);
  
  useEffect(() => {
    getitems();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleGlobalScroll);
    return () => {
      window.removeEventListener("scroll", handleGlobalScroll);
    };
  }, []);

  useEffect(() => {
    if (page !== 0 && !allItemsLoaded) getitems();
  }, [page, allItemsLoaded]);

  return (
    <div className={styles.items}>
      {
        items.map(item => (
          <FeedItem key={item.email} />
        ))
      }
      {
        !searching && (
          [1, 2, 3].map(value => ( <FeedItemLoading key={value} />))
        )
      }
    </div>
  );
};