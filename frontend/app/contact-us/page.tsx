import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header/header";
import HeaderAssembly from "@/components/shared/header/header_assembly";
import React from "react";

const Page = () => {
  return (
    <>
      <HeaderAssembly />
      <div className="max-w-6xl mx-auto">
        <div className="h-screen mt-[100px]">Contact Us</div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
