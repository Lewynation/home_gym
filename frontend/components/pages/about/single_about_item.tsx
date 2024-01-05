import React from "react";
import Image, { StaticImageData } from "next/image";

interface SingleAboutElementProps {
  title: string;
  description: string;
  image: StaticImageData;
}

const SingleAboutElement: React.FC<SingleAboutElementProps> = ({
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

export default SingleAboutElement;
