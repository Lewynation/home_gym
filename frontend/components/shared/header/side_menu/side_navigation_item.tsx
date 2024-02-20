"use client";

import React from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

interface SideNavigationItemProps {
  name: string;
  href: string;
}

const SideNavigationItem: React.FC<SideNavigationItemProps> = ({
  href,
  name,
}) => {
  const router = useRouter();
  const navigationClichHandler = () => {
    gsap.to("#sideMenu", {
      duration: 1,
      x: "100%",
      ease: "power3.inOut",
      onComplete: () => {
        router.push(href);
      },
    });
  };

  return (
    <button onClick={navigationClichHandler}>
      <h2 className="font-redHat text-4xl text-white hover:text-primaryColor transition-all duration-200">
        {name}
      </h2>
    </button>
  );
};

export default SideNavigationItem;
