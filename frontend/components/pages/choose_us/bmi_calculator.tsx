import { ArrowRight } from "lucide-react";
import React from "react";
import Image from "next/image";
import adjustabeDumbell from "@/assets/images/adjustabledumbbell.jpg";

const BMICalculationSection = () => {
  return (
    <div className="grid grid-cols-2 gap-x-20 mb-28">
      <div className="flex flex-col gap-y-8">
        <div>
          <h2 className="uppercase font-redHat text-5xl">
            <span className="font-outline-2">Calculate</span>{" "}
            <span className="text-white font-bold">Your BMI</span>
          </h2>
        </div>
        <div>
          <p className="font-redHat text-[#b1b7b5] text-sm">
            The Body Mass Index (BMI) calculator calculates body mass index from
            your weight and height.
          </p>
        </div>
        <div className="flex flex-col gap-y-8">
          <div className="flex gap-4">
            <div className="flex gap-4 px-3 py-4 border-2 border-tertiary">
              <input
                type="number"
                placeholder="Height"
                className="outline-none w-full border-none bg-transparent text-white font-redHat"
              />
              <p className="font-redHat text-white ">cm</p>
            </div>
            <div className="flex gap-4 px-3 py-4 border-2 border-tertiary">
              <input
                type="number"
                placeholder="Weight"
                className="outline-none w-full border-none bg-transparent text-white font-redHat"
              />
              <p className="font-redHat text-white ">kg</p>
            </div>
          </div>
          <div className="w-full">
            <button className="bg-primary w-full text-black px-3 py-4 flex items-center justify-center group border-tertiary border-2">
              <div className="flex gap-3 items-center">
                <p className="font-redHat font-bold">Calculate Now</p>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-all duration-300"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src={adjustabeDumbell}
          alt="Adjustable dumbell"
          className="w-[300px] object-cover"
        />
      </div>
    </div>
  );
};

export default BMICalculationSection;
