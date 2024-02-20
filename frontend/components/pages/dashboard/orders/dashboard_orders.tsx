"use client";

import React from "react";
import useSWR from "swr";
import OrdersTable from "./orders_table";
import { MoonLoader } from "react-spinners";

export interface SingleOrder {
  id: string;
  ref: string | null;
  amount: number | null;
  createdAt: string;
  serialNo: number;
  product: {
    quantity: number;
    product: {
      id: string;
      name: string;
      image: string | null;
      shortDesc: string | null;
      price: number;
    };
  }[];
}

export interface OrderItems {
  data: {
    Order: SingleOrder[];
  } | null;
}

const DashboardOrders = () => {
  const {
    data: orderItems,
    error,
    isLoading,
  } = useSWR("/order", async () => {
    const res = await fetch("/api/order");
    return (await res.json()) as OrderItems;
  });
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center my-8">
          <MoonLoader size={28} color="white" />
        </div>
      ) : (
        <div className="my-10">
          {orderItems?.data && orderItems.data.Order.length > 0 ? (
            <div className="">
              <OrdersTable data={orderItems} />
            </div>
          ) : (
            <div className="fex items-center justify-center">
              <h1 className="font-kaushanScript text-primaryColor text-3xl mt-10 mb-5 -rotate-3 text-center">
                Your have no orders
              </h1>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DashboardOrders;
