"use client";

import React, { useEffect, useState } from "react";
import NavigationElement from "./navigation_element";
import { navElements } from "./nav_elements";
import { cva, type VariantProps } from "class-variance-authority";
import Logo from "./logo";
import RegisterButton from "./register_button";

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

function Header() {
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
  return (
    <header className={headerVariants({ scrolledFromTop: scrolled })}>
      <div className=" flex items-center w-full justify-between max-w-6xl mx-auto">
        <Logo />
        <nav className="flex items-center gap-x-10">
          <ul className="flex gap-10">
            {navElements.map(({ name, href }, index) => (
              <NavigationElement key={index} title={name} href={href} />
            ))}
          </ul>
          <RegisterButton />
        </nav>
      </div>
    </header>
  );
}

export default Header;
