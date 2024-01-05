import { CheckCircle2 } from "lucide-react";
import React from "react";
import { type VariantProps, cva } from "class-variance-authority";

const pricingCardItemVariants = cva(" ", {
  variants: {
    type: {
      preferActive: "text-[#1d2020]",
      preferInactive: "text-[#8bb334]",
      notPreferActive: "text-[#a3a8a8]",
      notPreferInactive: "text-[#454b4a]",
    },
  },
  defaultVariants: {
    type: "notPreferActive",
  },
});

interface PricingCardItemParams {
  item: string;
}

export interface PricingCardItemProps
  extends PricingCardItemParams,
    VariantProps<typeof pricingCardItemVariants> {}

const PricingCardItem: React.FC<PricingCardItemProps> = ({ type, item }) => {
  return (
    <li>
      <div className="flex gap-2 items-center">
        <PricingCardCheckIcon type={type} />
        <p className={pricingCardItemVariants({ type })}>{item}</p>
      </div>
    </li>
  );
};

const pricingCardCheckIconVariants = cva("stroke-2", {
  variants: {
    type: {
      preferActive: "text-white",
      preferInactive: "text-[#c1e66f]",
      notPreferActive: "text-primary",
      notPreferInactive: "text-[#465828]",
    },
  },
  defaultVariants: {
    type: "notPreferActive",
  },
});

export interface PricingCardIconProps
  extends VariantProps<typeof pricingCardCheckIconVariants> {}

const PricingCardCheckIcon: React.FC<PricingCardIconProps> = ({ type }) => {
  return (
    <div>
      <CheckCircle2
        size={20}
        className={pricingCardCheckIconVariants({ type: type })}
      />
    </div>
  );
};

export default PricingCardItem;
