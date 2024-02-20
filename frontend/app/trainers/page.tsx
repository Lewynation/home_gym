import TrainersBody from "@/components/pages/trainers/trainers";
import Footer from "@/components/shared/footer/footer";
import HeaderAssembly from "@/components/shared/header/header_assembly";
import React from "react";

const Trainers = () => {
  return (
    <>
      <HeaderAssembly />
      <div className="max-w-6xl mx-auto">
        <div className="mt-[100px]">
          <TrainersBody />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Trainers;
