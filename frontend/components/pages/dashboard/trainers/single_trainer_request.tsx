"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Dot, XCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SingleTrainer, TrainerProps } from "./trainer_requests_tatble";
import { useSWRConfig } from "swr";
import { useToast } from "@/components/ui/use-toast";
import { LoadingBanner } from "@/components/shared/loading_banner/loading_bar";

interface SingleTrainerRequestProps {
  trainer: SingleTrainer;
}

const SingleTrainerRequest: React.FC<SingleTrainerRequestProps> = ({
  trainer,
}) => {
  const [loading, setLoading] = React.useState(false);
  const { mutate } = useSWRConfig();
  const { toast } = useToast();

  const deleteTrainerRequest = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/trainer/requests", {
        body: JSON.stringify({ trainerRequestId: trainer.id }),
        method: "DELETE",
      });
      console.log(await res.json());

      toast({
        title: "Sucessfull",
        description: "Trainer request deleted successfully",
        className: "z-2000000",
      });

      mutate("/trainer-requests");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete trainer request",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-redHat text-white">
        {loading && <LoadingBanner loading={loading} />}
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage
              src={`https://randomuser.me/api/portraits/men/${trainer.trainer.serialNo}.jpg`}
            />
            <AvatarFallback className="text-black">DP</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-redHat text-white">{trainer.trainer.name}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="font-redHat text-white">
        {trainer.trainer.location}
      </TableCell>
      <TableCell className="font-redHat text-white">
        <p className="font-redHat text-white"> {trainer.trainer.rates}</p>
      </TableCell>
      <TableCell className="font-redHat text-white">
        <div className=" flex gap-1">
          <div>
            <Dot className="text-green-800" />
          </div>
          <div>
            <p className="font-redHat text-white">
              {trainer.status.toUpperCase()}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="font-redHat text-white">
        <div>
          <button onClick={deleteTrainerRequest}>
            <XCircle className="text-red-800" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default SingleTrainerRequest;
