"use client";

import type { ResponseUserBody } from "@classes/APIManager/base/types/ResponseBody.types";
import { CaronasManager } from "@classes/APIManager/CaronasManager";
import { CookieManager } from "@classes/CookieManager";
import { UserManager } from "@classes/APIManager/UserManager";
import { SearchInput } from "../SearchInput";
import { mergeArray } from "@functions/mergeArray";
import { useRouter } from "next/navigation";
import { FeedItem } from "../FeedItem";
import { Text } from "@components/Text";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./FeedItems.module.css";

export const FeedItems = () => {
  const [allItemsLoaded, setAllItemsLoaded] = useState(false);
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<ResponseUserBody[]>([]);
  const [page, setPage] = useState(0);
  const [user, setUser] = useState<ResponseUserBody | null>(null);
  const router = useRouter();

  const getitems = async () => {
    if (searching) return;
    setSearching(true);

    console.log(search);

    const allitems = search === ""
      ? await CaronasManager.findAll(page) as ResponseUserBody[] & { error?: string; message?: string; }
      : await CaronasManager.findAllByOrigin(page, search) as ResponseUserBody[] & { error?: string; message?: string; };

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
  
  const getUser = async () => {
    const userFromToken = await UserManager.findUserByToken() as ResponseUserBody & { error?: string; message?: string; };
    if (!userFromToken || userFromToken.error === "UNAUTHORIZED") {
      await CookieManager.delete({ useServer: false });
      return router.push("/auth/signin");
    }
    setUser(userFromToken);
  };

  useEffect(() => {
    getUser();
    getitems();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleGlobalScroll);
    return () => {
      window.removeEventListener("scroll", handleGlobalScroll);
    };
  }, []);

  const handleSearch = (searchText: string) => {
    setSearch(searchText);
    setItems([]);
    setPage(0);
    setAllItemsLoaded(false);
  };

  useEffect(() => {
    if (!allItemsLoaded) getitems();
  }, [page, allItemsLoaded, search]);
  
  if (!user) return null;

  return (
    <>
      <SearchInput handleSearch={handleSearch} />
      <div className={styles.items}>
        {
          items.map(item => (
            <FeedItem actualUser={user} user={item} key={item.email} />
          ))
        }
        {
          items.length === 0 && (
            <div className={styles.loadingDiv}>
              <Text size="lg" asChild>
                <h3>
                  { 
                    user.motorista 
                      ? "Não foram encontrados passageiros nessa origem."
                      : "Sem caronas disponíveis nessa região." 
                  }
                </h3>
              </Text>
            </div>
          )
        }
        {
          searching && (
            <div className={styles.loadingDiv}>
              <img src="/imagens/loading.gif" alt="Loading" width={350} height={350} />
            </div>
          )
        }
      </div>
    </>
  );
};