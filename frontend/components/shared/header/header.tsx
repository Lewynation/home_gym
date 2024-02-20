"use client";

import React, { useEffect, useState } from "react";
import NavigationElement from "./navigation_element";
import { navElements } from "./nav_elements";
import { cva, type VariantProps } from "class-variance-authority";
import Logo from "./logo";
import RegisterButton from "./register_button";
import NormalPageNavigation from "./normal_page_navigation";
import CommerceNavigation from "./commerce_navigation";
import OpenMenuIcon from "./side_menu/open_menu_icon";

const headerVariants = cva(
  "text-white flex justify-center fixed top-0 w-full h-[100px] transition-all duration-200 z-[1000]",
  {
    variants: {
      scrolledFromTop: {
        true: "bg-[#121717] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]",
        false: "bg-transparent",
      },
    },
    defaultVariants: {
      scrolledFromTop: false,
    },
  }
);

interface HeaderProps {
  navigationType?: "normal" | "commerce" | "payment-confirmation";
}

const Header: React.FC<HeaderProps> = ({ navigationType = "normal" }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navigationSwitch = (type: HeaderProps["navigationType"]) => {
    switch (type) {
      case "normal":
        return <NormalPageNavigation />;
      case "commerce":
        return <CommerceNavigation text="Continue Shopping" />;
      case "payment-confirmation":
        return <CommerceNavigation text="View products" />;
      default:
        return <NormalPageNavigation />;
    }
  };

  return (
    <header className={headerVariants({ scrolledFromTop: scrolled })}>
      <div className="px-2 sm:px-5 md:px-0 flex items-center w-full justify-between max-w-6xl mx-auto">
        <Logo />
        <nav className="md:flex hidden items-center gap-x-10">
          {navigationSwitch(navigationType)}
        </nav>
        <div className="flex gap-1 sm:gap-x-2 items-center">
          <RegisterButton />
          <OpenMenuIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
