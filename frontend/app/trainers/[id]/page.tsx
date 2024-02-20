import Footer from "@/components/shared/footer/footer";
import HeaderAssembly from "@/components/shared/header/header_assembly";
import React from "react";
import SingleTrainer from "@/components/pages/trainers/single_trainer/single_trainer";

interface Props {
  params: {
    id: string;
  };
}

const Page: React.FC<Props> = ({ params }) => {
  const trainerId = params.id;

  return (
    <>
      <HeaderAssembly />
      <div className="max-w-6xl mx-auto">
        <div className="mt-[130px] mb-28">
          <SingleTrainer trainerId={trainerId} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
