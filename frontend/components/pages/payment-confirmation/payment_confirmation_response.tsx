"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import io from "socket.io-client";
const API_URL = "https://api.gym.ocluse.com/communication";
import { useSession } from "next-auth/react";
import { ClimbingBoxLoader } from "react-spinners";
import { CheckCircle, X } from "lucide-react";
import Link from "next/link";

const socket = io(API_URL, { autoConnect: false });

type PaymentStates = "pending" | "success" | "failed";

const PaymentConfirmationResponse: React.FC = () => {
  const router = useRouter();
  const [paymentState, setPaymentState] =
    React.useState<PaymentStates>("pending");

  const session = useSession();
  useEffect(() => {
    if (socket.connected) return;
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to socket");
      socket.emit("join_room", { room: session.data?.user?.email });
    });
    socket.on(
      "payment_response",
      (response: { success: boolean; message: string }) => {
        if (response.success) {
          console.log("Payment successful");
          setPaymentState("success");
        } else if (response.success === false) {
          console.log("Payment Unsuccesful");
          setPaymentState("failed");
        }
      }
    );
    return () => {
      console.log("Disconnecting from socket");
      socket.disconnect();
    };
  }, [router, session]);

  const paymentStateUISwitch = (state: PaymentStates) => {
    switch (state) {
      case "pending":
        return (
          <>
            <div className="min-h-screen flex flex-col items-center justify-center">
              <div>
                <ClimbingBoxLoader color="#9dd02f" />
              </div>
              <div className="mt-3">
                <div>
                  <p className="font-redHat text-white text-2xl text-center">
                    Processing your payment
                  </p>
                  <p className="font-redHat mt-2 text-[#b1b7b5] text-sm text-center">
                    Enter your password in the sent Mpesa notification to
                    complete purchase
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      case "success":
        return (
          <>
            <div className="min-h-screen flex flex-col items-center justify-center">
              <div>
                <CheckCircle size={100} color="#9dd02f" />
              </div>
              <div className="mt-3">
                <p className="font-redHat text-white text-2xl text-center">
                  Your payment was successful
                </p>
                <p className="font-redHat mt-2 text-[#b1b7b5] text-sm text-center">
                  Your payment was successful.
                  <br /> You can now access your dashboard to view more details
                  about your payment.
                </p>
              </div>
              <div className="flex gap-8 my-5">
                <Link
                  href="/dashboard"
                  className="text-black bg-primaryColor px-3 py-2 rounded-full"
                >
                  Dashboard
                </Link>
                {/* <Link
                  href="/"
                  className="text-black bg-primaryColor px-8 py-2 rounded-full"
                >
                  Home
                </Link> */}
              </div>
            </div>
          </>
        );
      case "failed":
        return (
          <>
            <div className="min-h-screen flex flex-col items-center justify-center">
              <div>
                <X size={100} color="#e20000" />
              </div>
              <div className="mt-3">
                <p className="font-redHat text-white text-2xl text-center">
                  Your payment was unsuccessful
                </p>
                <p className="font-redHat mt-2 text-[#b1b7b5] text-sm text-center">
                  An error may have occured or the transaction may have been
                  cancelled.
                  <br /> Head back home to try again.
                </p>
              </div>
              <div className="flex gap-8 my-5">
                <Link
                  href="/"
                  className="text-white bg-[#e20000] px-8 py-2 rounded-full"
                >
                  Home
                </Link>
              </div>
            </div>
          </>
        );
      default:
        break;
    }
  };

  return paymentStateUISwitch(paymentState);
};

export default PaymentConfirmationResponse;
