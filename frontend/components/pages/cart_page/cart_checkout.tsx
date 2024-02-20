import React, { useEffect } from "react";
import { CartTableProps, SingleCartRowProps } from "./cart_table";
import { formatNumberWithCommas } from "@/lib/utils";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input/input";
import useSWR from "swr";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useSWRConfig } from "swr";
import { LoadingBanner } from "@/components/shared/loading_banner/loading_bar";
import { useRouter } from "next/navigation";

interface CartCHeckOutProps extends CartTableProps {}

const CartCHeckOut: React.FC<CartCHeckOutProps> = ({ data: cartItems }) => {
  const [addressDialogState, setAddressDialogState] = React.useState(false);
  const [submitAdressLoading, setSubmitAdressLoading] = React.useState(false);
  const [paymentConfirmationDialogState, setPaymentConfirmationDialogState] =
    React.useState(false);
  const [submitCheckoutLoading, setSubmitCheckoutLoading] =
    React.useState(false);
  const [address, setAddress] = React.useState<null | string>(null);
  const [phoneNumber, setPhoneNumber] = React.useState<null | string>(null);
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

  const calculateTotalAmount = (
    cartItems: SingleCartRowProps[] | undefined
  ): number | undefined => {
    const totalAmount = cartItems?.reduce((accumulator, cartItem) => {
      const itemAmount = cartItem.quantity * cartItem.product.price;
      return accumulator + itemAmount;
    }, 0);

    return totalAmount;
  };

  const checkOut = async () => {
    if (!data?.data?.address || !data?.data?.phoneNumber) {
      setAddressDialogState(true);
      return;
    }
    if (submitCheckoutLoading) return;
    setPaymentConfirmationDialogState(true);
  };

  const submitUserDetails = async () => {
    if (submitAdressLoading) return;
    if (
      (!data?.data?.address && !address) ||
      (!data?.data?.phoneNumber && !phoneNumber) ||
      (!data?.data?.phoneNumber && !isValidPhoneNumber(phoneNumber!))
    ) {
      toast({
        title: "Error",
        description: "Please provide valid credentials",
        variant: "destructive",
      });
      return;
    }
    setSubmitAdressLoading(true);
    try {
      await fetch("/api/user", {
        method: "PATCH",
        body: JSON.stringify({ address, phoneNumber }),
      });
      await mutate("/user");
      toast({
        title: "Success",
        description:
          "Your details have been saved. You can now proceed to Checkout",
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
      setSubmitAdressLoading(false);
      setAddressDialogState(false);
      setPhoneNumber("");
      setAddress("");
    }
  };

  const initiateMpesaPayment = async () => {
    if (submitCheckoutLoading) return;
    try {
      setSubmitCheckoutLoading(true);
      const res = await fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify({
          cartId: cartItems?.id,
          paymentType: "productPurchase",
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
      setSubmitCheckoutLoading(false);
      setPaymentConfirmationDialogState(false);
    }
  };

  return (
    <div>
      {submitAdressLoading && <LoadingBanner loading={submitAdressLoading} />}
      {submitCheckoutLoading && (
        <LoadingBanner loading={submitCheckoutLoading} />
      )}
      <Dialog
        open={paymentConfirmationDialogState}
        onOpenChange={setPaymentConfirmationDialogState}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Confirmation</DialogTitle>
            <DialogDescription>
              {`An mpesa payment notification of KES ${formatNumberWithCommas(
                calculateTotalAmount(cartItems?.products) ?? 0
              )} will be sent to ${
                data?.data?.phoneNumber
              }. After payment, your order will be processed and delivered to ${
                data?.data?.address
              } by one of our agents. Are you sure you want to proceed?`}
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
      <Dialog open={addressDialogState} onOpenChange={setAddressDialogState}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              We realized we do not have all your details😊. Provide them below
              to continue.
            </DialogTitle>
            <DialogDescription>Enter your details below</DialogDescription>
            <div>
              {!data?.data?.address && (
                <div className="mt-4">
                  <Input
                    placeholder="Address/City/Town"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
              )}
              {!data?.data?.phoneNumber && (
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
              )}
              <div className="mt-6 flex justify-between items-center">
                <div></div>
                <button
                  onClick={submitUserDetails}
                  className="uppercase font-redHat text-white bg-primaryColor py-2 px-6"
                >
                  Save
                </button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="bg-[#1d2120]">
        <div className="border-b-[1px] py-4 px-4 border-[#b1b7b5]">
          <p className="font-redHat text-white font-bold">Order Summary</p>
        </div>
        <div className="px-4 py-8">
          <div className="flex justify-between mb-6">
            <p className="font-redHat text-[#b1b7b5]">Subtotal</p>
            <p className="font-redHat text-white">{`KES ${formatNumberWithCommas(
              calculateTotalAmount(cartItems?.products) ?? 0
            )}`}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-redHat text-[#b1b7b5]">Shipping</p>
            <p className="font-redHat text-white">Free</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between py-4 px-4 border-t-[1px] border-[#b1b7b5] bg-[#8d8f8e]">
            <p className="font-redHat text-white font-bold">Total</p>
            <p className="font-redHat text-white">{`KES ${formatNumberWithCommas(
              calculateTotalAmount(cartItems?.products) ?? 0
            )}`}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={checkOut}
          className="uppercase font-redHat text-white bg-primaryColor py-3 w-full px-4"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartCHeckOut;
