"use client";
import Image from "next/image";
import React from "react";
import useSWR from "swr";
import { useSession, signIn } from "next-auth/react";
import { useSWRConfig } from "swr";
import { useToast } from "@/components/ui/use-toast";
import { LoadingBanner } from "@/components/shared/loading_banner/loading_bar";
import { formatNumberWithCommas } from "@/lib/utils";
import { MoonLoader } from "react-spinners";
import { TrainerListItemProps } from "@/components/pages/trainers/trainer_list_item";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  trainerId: string;
}

const API_URL = "http://localhost:6061/api";
// const API_URL = "https://gym.ocluse.com/api";

const SingleTrainer: React.FC<Props> = ({ trainerId }) => {
  const session = useSession();
  const [loading, setLocalLoading] = React.useState(false);
  const [confirmationDialog, setConfirmationDialog] = React.useState(false);
  const { mutate } = useSWRConfig();
  const { toast } = useToast();

  const { data, error, isLoading } = useSWR(
    `/trainer/${trainerId}`,
    async () => {
      console.log("fetching");
      console.log(trainerId);
      const res = await fetch(`${API_URL}/trainer/${trainerId}`);
      const responseJson = await res.json();
      console.log("Response Json", responseJson);
      return responseJson.data as TrainerListItemProps["trainer"];
    }
  );

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
          body: JSON.stringify({ trainerId }),
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
        setConfirmationDialog(false);
      }
    }
  };

  return (
    <>
      <div className="px-5 md:px-0">
        {isLoading ? (
          <div className="flex items-center justify-center my-8">
            <MoonLoader color="white" size={28} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            {loading && <LoadingBanner loading={loading} />}
            <div className="">
              <Avatar>
                <AvatarImage
                  className="w-40 h-40 rounded-full"
                  src={`https://randomuser.me/api/portraits/men/${data?.serialNo}.jpg`}
                />
                <AvatarFallback className="text-white">DP</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="font-redHat text-white text-2xl mt-4 font-bold">
                {data?.name}
              </p>
            </div>
            <div className="max-w-[700px]">
              <div className="flex gap-3 mt-2">
                <p className="text-white font-assistant font-bold ">Bio:</p>
                <p className="text-white font-assistant">{data?.bio}</p>
              </div>
              <div className="flex gap-3 mt-2">
                <p className="text-white font-assistant font-bold ">
                  Location:
                </p>
                <p className="text-white font-assistant">{data?.location}</p>
              </div>
              <div className="flex gap-3 mt-2">
                <p className="text-white font-assistant font-bold ">
                  Availability:
                </p>
                <p className="text-white font-assistant">
                  {data?.availability}
                </p>
              </div>
              <div className="flex gap-3 mt-2">
                <p className="text-white font-assistant font-bold ">Rates:</p>
                <p className="text-white font-assistant">{data?.rates}</p>
              </div>
              <div className="flex gap-3 mt-2">
                <p className="text-white font-assistant font-bold ">
                  Experience:
                </p>
                <p className="text-white font-assistant">
                  {data?.experience} of experience
                </p>
              </div>
              <div className="mt-2">
                <p className="text-white font-assistant font-bold ">
                  Credentials:
                </p>
                <ul>
                  {data?.credentials.map((credential, index) => (
                    <li
                      key={index}
                      className="text-white font-assistant list-disc ml-8"
                    >
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-2">
                <p className="text-white font-assistant font-bold ">
                  Services Offered:
                </p>
                <ul>
                  {data?.servicesOffered.map((credential, index) => (
                    <li
                      key={index}
                      className="text-white font-assistant list-disc ml-8"
                    >
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5">
                <div className="w-full">
                  <Dialog
                    open={confirmationDialog}
                    onOpenChange={setConfirmationDialog}
                  >
                    <DialogTrigger
                      onClick={() => {
                        //   update(calculateBMI(weight, height));
                        //   fetchRecommendation(calculateBMI(weight, height));
                      }}
                      className="bg-primaryColor w-full text-black px-3 py-4 flex items-center justify-center group border-tertiaryColor border-2"
                    >
                      <div className="flex gap-3 items-center">
                        <p className="font-redHat font-bold">
                          Request contact with trainer
                        </p>
                        <ArrowRight
                          size={18}
                          className="group-hover:translate-x-1 transition-all duration-300"
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{`Confirm Contact Request`}</DialogTitle>
                        <DialogDescription>
                          {`Are you sure you want to sent a contact request to our esteemed trainer: ${data?.name}?`}
                        </DialogDescription>
                        <div className="flex justify-between">
                          <div></div>
                          <button onClick={requestContactWithTrainer}>
                            Yes
                          </button>
                        </div>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleTrainer;
