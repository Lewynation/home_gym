import CartView from "@/components/pages/cart_page/cart_view";
import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header/header";
import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const revalidate = 0;

const Page = async () => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("api/auth/signin");
  }

  return (
    <>
      <Header navigationType="commerce" />
      <div className="max-w-6xl mx-auto">
        <div className="min-h-[50vh] mt-[130px]">
          <CartView />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
