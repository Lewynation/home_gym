"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const DashboardProfileEdit = () => {
  const session = useSession();

  const { data, error, isLoading } = useSWR("/dashboard-user", async () => {
    const res = await fetch("/api/user");
    return (await res.json()) as {
      data: {
        name: string | null;
        image: string | null;
        address: string | null;
        phoneNumber: string | null;
        height: number | null;
        weight: number | null;
      } | null;
    };
  });

  return (
    <div className="px-5 md:px-0">
      <div className="mt-6 flex gap-4 items-center">
        <div className="">
          <Avatar>
            <AvatarImage
              className="w-24 h-24 rounded-full"
              src={session.data?.user?.image ?? ""}
            />
            <AvatarFallback className="text-white">DP</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-white font-redHat">
          <p className="font-bold text-2xl">{data?.data?.name}</p>
          <p className="text-[#b1b7b5]">{data?.data?.address ?? ""}</p>
        </div>
      </div>
      <div className="text-white mt-8 text-lg">
        <div className="flex gap-x-2 mt-3">
          <h2 className="font-redHat font-bold">Name:</h2>
          <p>{data?.data?.name}</p>
        </div>
        <div className="flex gap-x-2 mt-3">
          <h2 className="font-redHat font-bold">Email:</h2>
          <p>{session.data?.user?.email}</p>
        </div>
        <div className="flex gap-x-2 mt-3">
          <h2 className="font-redHat font-bold">Address:</h2>
          <p>{data?.data?.address ?? "Not Provided"}</p>
        </div>
        <div className="flex gap-x-2 mt-3">
          <h2 className="font-redHat font-bold">Phone Number:</h2>
          <p>{data?.data?.phoneNumber ?? "Not Provided"}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfileEdit;
