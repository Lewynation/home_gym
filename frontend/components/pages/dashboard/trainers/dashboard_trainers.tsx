"use client";
import React from "react";
import SingleTrainerRequest from "./single_trainer_request";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSWR from "swr";
import { MoonLoader } from "react-spinners";
import TrainerRequestsTable, { TrainerProps } from "./trainer_requests_tatble";

const DashboardTrainers = () => {
  const {
    data: trainers,
    error,
    isLoading,
  } = useSWR("/trainer-requests", async () => {
    const res = await fetch("/api/trainer/requests");
    const response = await res.json();
    return response as TrainerProps;
  });

  console.log("trainers", trainers);

  return (
    <div className="px-5 md:px-0 my-5">
      {isLoading ? (
        <div className="flex items-center justify-center my-8">
          <MoonLoader size={28} color="white" />
        </div>
      ) : (
        <div>
          {trainers?.data && trainers.data.length > 0 ? (
            <div className="">
              <TrainerRequestsTable data={trainers.data} />
            </div>
          ) : (
            <div className="fex items-center justify-center">
              <h1 className="font-kaushanScript text-primaryColor text-3xl mt-10 mb-5 -rotate-3 text-center">
                Your have no trainer requests
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardTrainers;
