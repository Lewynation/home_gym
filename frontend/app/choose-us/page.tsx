import BMICalculationSection from "@/components/pages/choose_us/bmi_calculator";
import ChooseUsLanding from "@/components/pages/choose_us/choose_us_landing";
import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header/header";
import React from "react";

const Page = () => {
  return (
    <main>
      <Header />
      <div className="max-w-6xl mx-auto">
        <div className="mt-[100px]">
          <ChooseUsLanding />
          <BMICalculationSection />
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Page;
