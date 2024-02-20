import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SingleTrainerRequest from "./single_trainer_request";

export interface SingleTrainer {
  trainer: {
    id: string;
    serialNo: number;
    name: string;
    location: string | null;
    bio: string | null;
    servicesOffered: string[];
    availability: string | null;
    rates: string | null;
    credentials: string[];
    experience: string | null;
  };
  id: string;
  status: string;
}

export interface TrainerProps {
  data: SingleTrainer[];
}

const TrainerRequestsTable: React.FC<TrainerProps> = ({ data }) => {
  return (
    <Table>
      <TableCaption>A list of your sent trainer requests</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">NAME</TableHead>
          <TableHead className="">LOCATION</TableHead>
          <TableHead className="">RATES</TableHead>
          <TableHead className="">REQUEST STATUS</TableHead>
          <TableHead className=""></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.length > 0 ? (
          <>
            {data.map((trainer, index) => {
              return <SingleTrainerRequest key={index} trainer={trainer} />;
            })}
          </>
        ) : (
          <></>
        )}
      </TableBody>
    </Table>
  );
};

export default TrainerRequestsTable;
