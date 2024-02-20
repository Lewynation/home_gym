import React from "react";
import Image from "next/image";
import mainCover from "@/assets/images/maincover.jpg";
import { ArrowRight } from "lucide-react";

const HomeLanding = () => {
  return (
    <div className="grid grid-cols-34 gap-0 pl-5">
      <div className="flex flex-col items-start justify-center gap-y-8">
        <div>
          <h2 className="uppercase font-redHat text-3xl md:text-5xl leading-normal mt-[120px] md:mt-0">
            <span className="font-outline-2">Make your</span>
            <br />
            <span className="text-white font-bold">body shape</span>
          </h2>
        </div>
        <div>
          <p className="font-redHat text-[#b1b7b5] text-sm">
            We will help you build your ideal body and live your life to the
            fullest all at home.
          </p>
        </div>
        <button className="bg-primaryColor text-black px-3 py-2 group border-tertiaryColor border-2">
          <div className="flex gap-3 items-center">
            <p className="font-redHat font-bold">Get Started</p>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 hidden md:flex transition-all duration-300"
            />
          </div>
        </button>
      </div>
      <div className="flex justify-center relative overflow-hidden">
        <div className="home-triangle-path absolute bg-[#9dd02f] bottom-0 -top-28 right-0 w-full "></div>
        <div className="home-triangle-path absolute bg-[#a3d733] right-0 w-[405px] bottom-0 -top-28 "></div>
        <div className="home-triangle-path absolute bg-[#abdf3a] right-0 w-[205px] bottom-0 -top-28 "></div>
        <Image
          src={mainCover}
          alt="barbell"
          className="object-cover z-50 mt-[150px] translate-x-4"
        />
      </div>
    </div>
  );
};

export default HomeLanding;
