import React from "react";
import Image from "next/image";
import dumbellIcon from "@/assets/icons/dumbbellicon.jpg";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SinglePricingCard from "./pricing_card";
import { pricingCardElements } from "./pricing_card_elements";

const PricingBody = () => {
  return (
    <div>
      <div className="flex items-center justify-center flex-col ">
        <h1 className="font-kaushanScript text-primary text-3xl mt-10 mb-5 -rotate-3">
          Pricing
        </h1>
        <h2 className="uppercase font-redHat text-5xl">
          <span className="font-outline-2">Vile</span>{" "}
          <span className="text-white font-bold">tunakujenga</span>
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-x-16 mt-28 mb-32">
        {pricingCardElements.map(
          ({ items, prefered, price, title, image }, index) => {
            return (
              <SinglePricingCard
                key={index}
                title={title}
                items={items}
                price={price}
                image={image}
                prefered={prefered}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default PricingBody;
