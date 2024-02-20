import React from "react";
import Image from "next/image";
import dumbellIcon from "@/assets/icons/dumbbellicon.jpg";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SinglePricingCard from "./pricing_card";
import { pricingCardElements } from "./pricing_card_elements";

const PricingBody = () => {
  return (
    <div className="px-5 md:px-0">
      <div className="flex items-center justify-center flex-col ">
        <h1 className="font-kaushanScript text-primaryColor text-3xl mt-10 mb-5 -rotate-3">
          Pricing
        </h1>
        <h2 className="uppercase font-redHat text-5xl text-center px-2">
          <span className="font-outline-2">Vile</span>{" "}
          <span className="text-white font-bold">tunakujenga</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-y-0 gap-x-16 mt-28 mb-32">
        {pricingCardElements.map(
          ({ items, prefered, tierId, price, title, image }, index) => {
            return (
              <SinglePricingCard
                key={index}
                title={title}
                items={items}
                price={price}
                image={image}
                prefered={prefered}
                subTierId={tierId}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default PricingBody;
