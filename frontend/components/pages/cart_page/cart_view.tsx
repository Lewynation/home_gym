"use client";

import React from "react";
import CartTable, { CartTableProps } from "./cart_table";
import CartCHeckOut from "./cart_checkout";
import useSWR from "swr";
import { MoonLoader } from "react-spinners";

export const revalidate = 0;

const CartView = () => {
  const {
    data: cartItems,
    error,
    isLoading,
  } = useSWR("/checkout", async () => {
    const res = await fetch("/api/checkout");
    return (await res.json()) as CartTableProps;
  });
  return (
    <div className="px-5 md:px-0">
      <div className="flex items-center justify-center">
        <h2 className="uppercase font-redHat text-5xl">
          <span className="font-outline-2">Your</span>{" "}
          <span className="text-white font-bold">Cart</span>
        </h2>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center my-8">
          <MoonLoader color="white" size={28} />
        </div>
      ) : (
        <div className="my-10">
          {cartItems?.data && cartItems.data.products.length > 0 ? (
            <div className="grid grid-cols-1 gap-y-10 md:gap-y-0 md:grid-cols-43 gap-x-4">
              <CartTable data={cartItems.data} />
              <CartCHeckOut data={cartItems.data} />
            </div>
          ) : (
            <div className="fex items-center  justify-center">
              <h1 className="font-kaushanScript text-primaryColor text-3xl mt-10 mb-5 -rotate-3 text-center">
                Your cart is empty
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartView;
