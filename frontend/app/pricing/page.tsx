import PricingBody from "@/components/pages/pricing/pricing_body";
import Footer from "@/components/shared/footer/footer";
import HeaderAssembly from "@/components/shared/header/header_assembly";
import React from "react";

const Page = () => {
  return (
    <>
      <HeaderAssembly />
      <div className="max-w-6xl mx-auto">
        <div className="mt-[100px]">
          <PricingBody />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
