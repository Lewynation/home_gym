"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Banknote, LocateIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useSWRConfig } from "swr";
import { LoadingBanner } from "@/components/shared/loading_banner/loading_bar";

export interface TrainerListItemProps {
  trainer: {
    id: string;
    name: string;
    phoneNumber?: string | null;
    email?: string | null;
    location?: string | null;
    bio?: string | null;
    servicesOffered: string[];
    availability?: string | null;
    rates?: string | null;
    credentials: string[];
    experience?: string | null;
    serialNo: number;
  };
}

const TrainerListItem: React.FC<TrainerListItemProps> = ({ trainer }) => {
  const session = useSession();
  const { toast } = useToast();
  const { mutate } = useSWRConfig();
  const [loading, setLocalLoading] = React.useState(false);

  const requestContactWithTrainer = async () => {
    if (!session.data?.user) {
      signIn();
    } else {
      if (loading) {
        return;
      }
      setLocalLoading(true);
      try {
        const res = await fetch("/api/trainer_contact", {
          body: JSON.stringify({ trainerId: trainer.id }),
          method: "POST",
        });
        console.log(await res.json());
        toast({
          title: "Sucessfull",
          description: "Request sent to trainer successfully",
          className: "z-2000000",
        });
        mutate("/trainer-requests");
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong",
          className: "z-2000000",
        });
      } finally {
        setLocalLoading(false);
      }
    }
  };

  return (
    <div className="my-5 flex gap-5 bg-[#1d2120] py-6 px-3 md:px-6 w-full">
      {loading && <LoadingBanner loading={loading} />}
      <div>
        <Avatar>
          <AvatarImage
            // className="w-28 h-28 rounded-full"
            src={`https://randomuser.me/api/portraits/men/${trainer.serialNo}.jpg`}
          />
          <AvatarFallback className="text-black">DP</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full">
        <div className="flex justify-between mb-4">
          <Link href={`/trainers/${trainer.id}`}>
            <h2 className="text-lg font-assistant text-white font-bold">
              {trainer.name}
            </h2>
          </Link>
          <div className="">
            <button
              onClick={requestContactWithTrainer}
              className="bg-primaryColor text-black px-3 py-1 flex items-center justify-center group border-tertiaryColor border-2"
            >
              <div className="flex gap-3 items-center">
                <p className="font-redHat font-bold">Send Request</p>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 hidden md:flex transition-all duration-300"
                />
              </div>
            </button>
          </div>
        </div>
        <p className="text-[#b1b792]">{trainer.bio}</p>

        <div className="flex gap-3 items-center mt-2">
          <div>
            <LocateIcon className="text-white" />
          </div>
          <p className="text-white font-assistant">{trainer.location}</p>
        </div>
        <div className="flex gap-3 items-center mt-2">
          <div>
            <Banknote className="text-white" />
          </div>
          <p className="text-white font-assistant">{trainer.rates}</p>
        </div>
      </div>
    </div>
  );
};

export default TrainerListItem;
