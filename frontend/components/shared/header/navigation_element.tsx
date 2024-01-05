"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

type navigationElementsProps = {
  title: string;
  href: string;
};

const buttonVariants = cva(
  "font-redHat hover:text-primaryColor transition-all duration-200",
  {
    variants: {
      active: {
        true: "text-primaryColor",
        false: "text-white",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

const NavigationElement: React.FC<navigationElementsProps> = ({
  title,
  href,
}) => {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <li>
      <Link href={href} className={buttonVariants({ active: isActive })}>
        {title}
      </Link>
    </li>
  );
};

export default NavigationElement;
