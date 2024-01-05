import React from "react";
import Image from "next/image";
import sponsor1 from "@/assets/icons/sponsor1.jpg";
import sponsor2 from "@/assets/icons/sponsor2.jpg";
import sponsor3 from "@/assets/icons/sponsor3.jpg";
import sponsor4 from "@/assets/icons/sponsor4.jpg";

const SponsorsSection = () => {
  return (
    <div className="my-20 grid grid-cols-4">
      <div className="flex items-center justify-center">
        <div className="w-48 h-32">
          <Image
            src={sponsor1}
            alt="sponsor1"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-48 h-32">
          <Image
            src={sponsor2}
            alt="sponsor2"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-48 h-32">
          <Image
            src={sponsor3}
            alt="sponsor3"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-48 h-32">
          <Image
            src={sponsor4}
            alt="sponsor4"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SponsorsSection;
