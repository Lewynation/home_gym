import React from "react";
import { redirect } from "next/navigation";
import PaymentConfirmationResponse from "@/components/pages/payment-confirmation/payment_confirmation_response";
import { auth } from "@/auth";

const Page = async () => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("api/auth/signin");
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PaymentConfirmationResponse />
    </div>
  );
};

export default Page;
