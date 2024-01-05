import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header/header";
import React from "react";

const Page = () => {
  return (
    <main>
      <Header />
      <div className="max-w-6xl mx-auto">
        <div className="h-screen mt-[100px]">Featured Items</div>
        <Footer />
      </div>
    </main>
  );
};

export default Page;
