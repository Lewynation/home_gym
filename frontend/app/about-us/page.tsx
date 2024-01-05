import AboutLanding from "@/components/pages/about/about_panding";
import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header/header";
import React from "react";

const Page = () => {
  return (
    <main>
      <Header />
      <div className="max-w-6xl mx-auto">
        <div className="mt-[100px]">
          <AboutLanding />
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Page;
