"use client";
import React from "react";
import useSWR from "swr";
import SubsTable from "./subs_table";
import { MoonLoader } from "react-spinners";

export interface SingleSubscription {
  ref: string;
  id: string;
  createdAt: string;
  amountPaid: number | null;
  tier: {
    name: string;
    price: number;
    duration: string;
  };
}

export interface DashboardSubItems {
  data: {
    subscriptionExpiry: string | null;
    Subscription: SingleSubscription[];
  } | null;
}

const DashboardSubs = () => {
  const { data, error, isLoading } = useSWR("/subscription", async () => {
    const res = await fetch("/api/subscription");
    return (await res.json()) as DashboardSubItems;
  });
  console.log(data);
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center my-8">
          <MoonLoader color="white" size={28} />
        </div>
      ) : (
        <div className="my-10">
          {data?.data && data.data.Subscription.length > 0 ? (
            <div className="">
              <SubsTable data={data} />
            </div>
          ) : (
            <div className="fex items-center justify-center">
              <h1 className="font-kaushanScript text-primaryColor text-3xl mt-10 mb-5 -rotate-3 text-center">
                Your have no active subscriptions
              </h1>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DashboardSubs;
