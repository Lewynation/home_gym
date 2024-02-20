import { auth } from "@/auth";
import DashboardHome from "@/components/pages/dashboard/dashboard_home";
import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header/header";
import React from "react";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("api/auth/signin");
  }

  return (
    <>
      <Header navigationType="payment-confirmation" />
      <div className="max-w-6xl mx-auto">
        <div className="mt-[130px] min-h-[50vh] mb-28">
          <div className="flex items-center justify-center mb-8">
            <h2 className="uppercase font-redHat text-5xl text-center">
              <span className="font-outline-2">Your</span>{" "}
              <span className="text-white font-bold">Dashboard</span>
            </h2>
          </div>
          <DashboardHome />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
