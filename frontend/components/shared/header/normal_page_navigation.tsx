import React from "react";
import NavigationElement from "./navigation_element";
import { navElements } from "./nav_elements";

const NormalPageNavigation = () => {
  return (
    <ul className="flex gap-10">
      {navElements.map(({ name, href }, index) => (
        <NavigationElement key={index} title={name} href={href} />
      ))}
    </ul>
  );
};

export default NormalPageNavigation;
