import React from "react";
import Image from "next/image";
import barbel from "@/assets/images/barbell.jpg";

const ChooseUsLanding = () => {
  return (
    <div className="grid grid-cols-2 gap-20 mb-28">
      <div className="flex justify-center relative overflow-hidden">
        <div className="triangle-path absolute bg-[#9dd02f] bottom-0 -top-28 left-0 w-full "></div>
        <div className="triangle-path absolute bg-[#a3d733] left-0 w-[405px] bottom-0 -top-28 "></div>
        <div className="triangle-path absolute bg-[#abdf3a] left-0 w-[205px] bottom-0 -top-28 "></div>
        <Image
          src={barbel}
          alt="barbell"
          className="object-cover w-[450px] z-50"
        />
      </div>
      <div className="flex flex-col gap-y-14">
        <div className="flex items-start justify-center flex-col ">
          <h1 className="font-kaushanScript text-primaryColor text-3xl mt-10 mb-5 -rotate-3">
            We Are The Best
          </h1>
          <h2 className="uppercase font-redHat text-5xl">
            <span className="font-outline-2">Why</span>{" "}
            <span className="text-white font-bold">choose us</span>
          </h2>
        </div>
        <div>
          <p className="font-redHat text-[#b1b7b5] text-sm">
            Select your desired class and start now! Remember your goal...The
            only bad workout is the one you don&apos;t do.
          </p>
        </div>
        <div className="flex flex-col text-white gap-y-16">
          <WhyChooseUsStat
            stat1="200+"
            stat1Title="Total Members"
            stat2="50+"
            stat2Title="Best Trainers"
          />
          <WhyChooseUsStat
            stat1="25+"
            stat1Title="Programs"
            stat2="100+"
            stat2Title="Awards"
          />
        </div>
      </div>
    </div>
  );
};

interface WhyChooseUsStatProps {
  stat1: string;
  stat2: string;
  stat1Title: string;
  stat2Title: string;
}

const WhyChooseUsStat: React.FC<WhyChooseUsStatProps> = ({
  stat1,
  stat1Title,
  stat2,
  stat2Title,
}) => {
  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col gap-y-2">
        <p className="font-kaushanScript text-4xl">{stat1}</p>
        <p className="font-redHat text-[#b1b7b5]">{stat1Title}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="font-kaushanScript text-4xl">{stat2}</p>
        <p className="font-redHat text-[#b1b7b5]">{stat2Title}</p>
      </div>
    </div>
  );
};

export default ChooseUsLanding;
