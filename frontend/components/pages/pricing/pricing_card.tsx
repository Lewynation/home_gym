"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import PricingCardItem from "./pricing_card_item";
import { type VariantProps, cva } from "class-variance-authority";
import { useSession, signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import useSWR, { useSWRConfig } from "swr";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input/input";
import { LoadingBanner } from "@/components/shared/loading_banner/loading_bar";
import { formatNumberWithCommas } from "@/lib/utils";
import { useRouter } from "next/navigation";

const pricingCardVariants = cva(" px-12 py-12 flex flex-col gap-5 border-2", {
  variants: {
    prefered: {
      true: "bg-primaryColor border-primaryColor",
      false: "bg-[#1d2120] border-[#1d2120]",
    },
  },
  defaultVariants: {
    prefered: false,
  },
});

interface SinglePricingCardProps {
  title: string;
  price: string;
  image: StaticImageData;
  subTierId: number;
  items: {
    item: string;
    active: boolean;
  }[];
}

export interface PricingCardProps
  extends SinglePricingCardProps,
    VariantProps<typeof pricingCardVariants> {}

const SinglePricingCard: React.FC<PricingCardProps> = ({
  items,
  price,
  title,
  image,
  prefered = false,
  subTierId,
}) => {
  const session = useSession();
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [phoneNumberDialogState, setPhoneNumberDialogState] =
    React.useState(false);
  const [transactionPaymentDialogState, setTransactionPaymentDialogState] =
    React.useState(false);
  const [submitUserPhoneNumberLoading, setSubmitUserPhoneNumberLoading] =
    React.useState(false);
  const [submitMpesaPaymentLoading, setSubmitMpesaPaymentLoading] =
    React.useState(false);
  const { toast } = useToast();
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const { data, error, isLoading } = useSWR("/user", async () => {
    const res = await fetch("/api/user");
    return (await res.json()) as {
      data: {
        name: string | null;
        image: string | null;
        address: string | null;
        phoneNumber: string | null;
      } | null;
    };
  });

  const subscriptionPaymentInit = async () => {
    if (!session.data?.user) {
      await signIn();
      return;
    }
    if (!data?.data?.phoneNumber) {
      setPhoneNumberDialogState(true);
      return;
    }
    setTransactionPaymentDialogState(true);
  };

  const submitUserPhoneNumber = async () => {
    if (submitUserPhoneNumberLoading) return;
    if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
      toast({
        title: "Error",
        description: "Please provide a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setSubmitUserPhoneNumberLoading(true);
    try {
      await fetch("/api/user", {
        method: "PATCH",
        body: JSON.stringify({ phoneNumber }),
      });
      await mutate("/user");
      toast({
        title: "Success",
        description:
          "Your details have been saved. You can now proceed to Subscription Purchase",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          "Something went wrong. The mobile number provided may already be in use.",
        variant: "destructive",
      });
    } finally {
      setSubmitUserPhoneNumberLoading(false);
      setPhoneNumber("");
      setPhoneNumberDialogState(false);
    }
  };

  const initiateMpesaPayment = async () => {
    if (submitMpesaPaymentLoading) return;
    try {
      setSubmitMpesaPaymentLoading(true);
      const res = await fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify({
          paymentType: "subscriptionPurchase",
          subscriptionTierId: subTierId,
        }),
      });
      const data = (await res.json()) as {
        message: string;
        data: {} | null;
        sent: boolean;
      };
      console.log(data);
      if (data.sent) {
        // Navigate to payment loading page
        router.push("/payment-confirmation");
      } else {
        toast({
          title: "Error",
          description:
            "There was an error initiating the payment. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitMpesaPaymentLoading(false);
      setTransactionPaymentDialogState(false);
    }
  };

  return (
    <div>
      {submitUserPhoneNumberLoading && (
        <LoadingBanner loading={submitUserPhoneNumberLoading} />
      )}
      {submitMpesaPaymentLoading && (
        <LoadingBanner loading={submitMpesaPaymentLoading} />
      )}
      <Dialog
        open={transactionPaymentDialogState}
        onOpenChange={setTransactionPaymentDialogState}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Confirmation</DialogTitle>
            <DialogDescription>
              {`An mpesa payment notification of KES ${formatNumberWithCommas(
                Number(price.split(" ")[1].split(",").join("")) ?? 1
              )} will be sent to ${
                data?.data?.phoneNumber
              }. After payment, you will enjoy the benefits of ${
                title ?? "this subscription"
              } subscription tier. Are you sure you want to proceed?`}
            </DialogDescription>
            <div>
              <div className="mt-6 flex w-full justify-center items-center">
                <button
                  onClick={initiateMpesaPayment}
                  className="uppercase font-redHat text-white bg-primaryColor py-2 px-6"
                >
                  OK
                </button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog
        open={phoneNumberDialogState}
        onOpenChange={setPhoneNumberDialogState}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              We realized we do not have your phone number😊. Provide it below
              to continue.
            </DialogTitle>
            <DialogDescription>
              Enter your mpesa supported phone number below
            </DialogDescription>
            <div>
              <div className="mt-6">
                <PhoneInput
                  international
                  country="KE"
                  withCountryCallingCode
                  onChange={(value) => {
                    setPhoneNumber(value?.toString() ?? "");
                  }}
                  style={{ width: "100%" }}
                  inputComponent={Input}
                />
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div></div>
                <button
                  onClick={submitUserPhoneNumber}
                  className="uppercase font-redHat text-white bg-primaryColor py-2 px-6"
                >
                  Save
                </button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className={pricingCardVariants({ prefered })}>
        <div className="">
          <Image
            src={image}
            alt="buildIcon"
            className="w-12 h-12 object-cover"
          />
        </div>
        <div className="mb-6">
          <h2 className="text-[#5f6464] mb-3 font-redHat text-xl font-bold">
            {title}
          </h2>
          <h2 className="text-white font-redHat text-3xl font-bold">{price}</h2>
        </div>
        <div>
          <ul className="flex flex-col gap-y-4">
            {items.map(({ active, item }, index) => {
              let type:
                | "notPreferActive"
                | "preferActive"
                | "preferInactive"
                | "notPreferInactive" = "notPreferActive";

              if (prefered) {
                if (active) {
                  type = "preferActive";
                } else {
                  type = "preferInactive";
                }
              } else {
                if (active) {
                  type = "notPreferActive";
                } else {
                  type = "notPreferInactive";
                }
              }
              return <PricingCardItem key={index} item={item} type={type} />;
            })}
          </ul>
        </div>
        <button
          onClick={subscriptionPaymentInit}
          className="bg-white flex items-center justify-center my-8 text-black px-3 py-2 group border-tertiaryColor border-2 hover:bg-primaryColor transiti duration-200"
        >
          <div className="flex gap-3 items-center">
            <p className="font-redHat font-bold">Purchase Now</p>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-all duration-300"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default SinglePricingCard;
