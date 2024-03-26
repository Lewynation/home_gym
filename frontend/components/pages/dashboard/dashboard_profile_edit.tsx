"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSWRConfig } from "swr";
import { useToast } from "@/components/ui/use-toast";

const DashboardProfileEdit = () => {
  const session = useSession();
  const { mutate } = useSWRConfig();
  const { toast } = useToast();

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

  const setPhoneNumber = async (phone: string) => {
    await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify({ phoneNumber: phone }),
    });
    await mutate("/dashboard-user");
    toast({
      title: "Success",
      description: "Your details have been saved.",
    });
  };

  const setAddress = async (address: string) => {
    await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify({ address: address }),
    });
    await mutate("/dashboard-user");
    toast({
      title: "Success",
      description: "Your details have been saved.",
    });
  };

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
          <p>
            {data?.data?.address && (
              <ChangeAddressButton
                address={data?.data?.address}
                setAddress={setAddress}
              />
            )}
          </p>
        </div>
        <div className="flex gap-x-2 mt-3 items-center">
          <h2 className="font-redHat font-bold">Phone Number:</h2>
          <p>{data?.data?.phoneNumber ?? "Not Provided"}</p>
          <p>
            {data?.data?.phoneNumber && (
              <ClearPhoneNumberButton
                phoneNumber={data?.data?.phoneNumber}
                setPhoneNumber={setPhoneNumber}
              />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

interface ClearAddressButtonProps {
  address: string;
  setAddress: (address: string) => void;
}

const ChangeAddressButton: React.FC<ClearAddressButtonProps> = ({
  address,
  setAddress,
}) => {
  const [addressDialogState, setAddressDialogState] = React.useState(false);
  const [addressString, setAddressString] = React.useState("");

  const submitPhoneNumber = () => {
    if (addressString === address) {
      setAddressDialogState(false);
      return;
    }
    setAddress(addressString);
    setAddressDialogState(false);
    return;
  };

  useEffect(() => {
    setAddressString(address);
  }, [address]);

  return (
    <Dialog open={addressDialogState} onOpenChange={setAddressDialogState}>
      <DialogTrigger asChild>
        <button className="ml-4 bg-primaryColor px-3 py-1 rounded-full font-bold font-assistant text-black">
          Change Address
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Address.</DialogTitle>
          <DialogDescription>Enter your new address below</DialogDescription>
          <div>
            {
              <div className="mt-4">
                <Input
                  type="tel"
                  value={addressString}
                  placeholder="Address"
                  onChange={(e) => {
                    setAddressString(e.target.value);
                  }}
                />
              </div>
            }
            <div className="mt-6 flex justify-between items-center">
              <div></div>
              <button
                onClick={submitPhoneNumber}
                className="uppercase font-redHat text-white bg-primaryColor py-2 px-6"
              >
                Save
              </button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

interface ClearPhoneNumberButtonProps {
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
}

const ClearPhoneNumberButton: React.FC<ClearPhoneNumberButtonProps> = ({
  phoneNumber,
  setPhoneNumber,
}) => {
  const [addressDialogState, setAddressDialogState] = React.useState(false);
  const [phoneNumberString, setPhoneNumberString] = React.useState("");

  const submitPhoneNumber = () => {
    if (phoneNumberString === phoneNumber) {
      setAddressDialogState(false);
      return;
    }
    setPhoneNumber(phoneNumberString);
    setAddressDialogState(false);
    return;
  };

  useEffect(() => {
    setPhoneNumberString(phoneNumber);
  }, [phoneNumber]);

  return (
    <Dialog open={addressDialogState} onOpenChange={setAddressDialogState}>
      <DialogTrigger asChild>
        <button className="ml-4 bg-primaryColor px-3 py-1 rounded-full font-bold font-assistant text-black">
          Change PhoneNumber
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Phone Number.</DialogTitle>
          <DialogDescription>
            Enter your new phone number below
          </DialogDescription>
          <div>
            {
              <div className="mt-4">
                <Input
                  type="tel"
                  value={phoneNumberString}
                  placeholder="PhoneNumber"
                  onChange={(e) => {
                    setPhoneNumberString(e.target.value);
                  }}
                />
              </div>
            }
            <div className="mt-6 flex justify-between items-center">
              <div></div>
              <button
                onClick={submitPhoneNumber}
                className="uppercase font-redHat text-white bg-primaryColor py-2 px-6"
              >
                Save
              </button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardProfileEdit;
