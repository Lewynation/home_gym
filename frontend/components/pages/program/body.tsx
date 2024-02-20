import React from "react";

import Image, { StaticImageData } from "next/image";
import { programBodyElements } from "./program_body_elements";

const ProgramBody = () => {
  return (
    <div className="px-5 md:px-0">
      <div className="flex items-center justify-center flex-col ">
        <h1 className="font-kaushanScript text-primaryColor text-3xl mt-10 mb-5 -rotate-3">
          Our Program
        </h1>
        <h2 className="uppercase font-redHat text-5xl text-center">
          <span className="font-outline-2">Build your</span>{" "}
          <span className="text-white font-bold">ideal body</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-10 mt-28 mb-32 gap-y-8">
        {programBodyElements.map(({ title, description, image }, index) => (
          <ProgramItem
            key={index}
            title={title}
            description={description}
            image={image}
          />
        ))}
      </div>
    </div>
  );
};

interface ProgramItemProps {
  title: string;
  description: string;
  image: StaticImageData;
}

const ProgramItem: React.FC<ProgramItemProps> = ({
  description,
  image,
  title,
}) => {
  return (
    <div className="bg-[#1d2120] px-8 py-8 flex flex-col gap-5 group hover:bg-primaryColor border-2 border-[#1d2120] hover:border-tertiaryColor transition-all duration-500">
      <div className="w-12 h-12 rounded-full group-hover:bg-tertiaryColor flex items-center justify-center transition-all duration-500">
        <Image src={image} alt="buildIcon" className="w-8 object-cover" />
      </div>
      <div>
        <h2 className="text-white font-redHat text-xl font-bold group-hover:text-[#1d2021] transition-all duration-500">
          {title}
        </h2>
      </div>
      <div className="mb-12">
        <p className="font-redHat text-[#9fa3a3] group-hover:text-[#2a2b29] transition-all duration-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProgramBody;
