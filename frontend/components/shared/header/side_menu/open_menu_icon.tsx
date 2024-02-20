"use client";

import React from "react";
import SideMenu from "./side_menu";
import { gsap } from "gsap";
import { Menu } from "lucide-react";

const MenuIcon = () => {
  const openMenuHAndler = () => {
    gsap.to("#sideMenu", {
      duration: 1,
      x: 0,
      ease: "power3.inOut",
    });
  };

  return (
    <>
      <Menu
        className="cursor-pointer w-9 h-9 md:hidden"
        onClick={openMenuHAndler}
      />
      <SideMenu />
    </>
  );
};

export default MenuIcon;
