import React from "react";
import CloseMenuIcon from "./close_menu_icon";
import Link from "next/link";
import SideNavigationItem from "./side_navigation_item";
import { navElements } from "../nav_elements";

const SideMenu = () => {
  const navigationItems = [
    {
      name: "Home",
      href: "/",
    },
    ...navElements,
  ];

  return (
    <div
      id="sideMenu"
      className="fixed top-0 bottom-0 left-0 right-0 z-50 translate-x-full bg-[#121717]"
    >
      <CloseMenuIcon />
      <div className="flex flex-col items-center justify-center h-full gap-5">
        {navigationItems.map(({ href, name }, index) => (
          <SideNavigationItem key={index} href={href} name={name} />
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
