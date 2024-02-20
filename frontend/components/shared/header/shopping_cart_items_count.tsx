"use client";

import React from "react";
import useSWR from "swr";

const ShoppingCartItemsCount = () => {
  const { data, error, isLoading } = useSWR("/cart-count", async () => {
    const res = await fetch("/api/cart");
    return (await res.json()) as { data: number };
  });

  return (
    <p className="absolute font-redHat text-white -top-4 left-1/2 -translate-x-1/2">
      {data?.data ?? 0}
    </p>
  );
};

export default ShoppingCartItemsCount;
