import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import dumbellIcon from "@/assets/icons/dumbbellicon.jpg";
import PricingCardItem from "./pricing_card_item";
import { type VariantProps, cva } from "class-variance-authority";

const pricingCardVariants = cva(" px-12 py-12 flex flex-col gap-5 border-2", {
  variants: {
    prefered: {
      true: "bg-primaryColor border-primaryColor",
      false: "bg-[#1d2120] border-[#1d2120]",
    },
  },
  defaultVariants: {
    prefered: false,
  },
});

interface SinglePricingCardProps {
  title: string;
  price: string;
  image: StaticImageData;
  items: {
    item: string;
    active: boolean;
  }[];
}

export interface PricingCardProps
  extends SinglePricingCardProps,
    VariantProps<typeof pricingCardVariants> {}

const SinglePricingCard: React.FC<PricingCardProps> = ({
  items,
  price,
  title,
  image,
  prefered = false,
}) => {
  return (
    <div className={pricingCardVariants({ prefered })}>
      <div className="">
        <Image src={image} alt="buildIcon" className="w-12 h-12 object-cover" />
      </div>
      <div className="mb-6">
        <h2 className="text-[#5f6464] mb-3 font-redHat text-xl font-bold">
          {title}
        </h2>
        <h2 className="text-white font-redHat text-3xl font-bold">{price}</h2>
      </div>
      <div>
        <ul className="flex flex-col gap-y-4">
          {items.map(({ active, item }, index) => {
            let type:
              | "notPreferActive"
              | "preferActive"
              | "preferInactive"
              | "notPreferInactive" = "notPreferActive";

            if (prefered) {
              if (active) {
                type = "preferActive";
              } else {
                type = "preferInactive";
              }
            } else {
              if (active) {
                type = "notPreferActive";
              } else {
                type = "notPreferInactive";
              }
            }
            return <PricingCardItem key={index} item={item} type={type} />;
          })}
        </ul>
      </div>
      <button className="bg-white flex items-center justify-center my-8 text-black px-3 py-2 group border-tertiaryColor border-2 hover:bg-primaryColor transiti duration-200">
        <div className="flex gap-3 items-center">
          <p className="font-redHat font-bold">Purchase Now</p>
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-all duration-300"
          />
        </div>
      </button>
    </div>
  );
};

export default SinglePricingCard;
