import React from "react";
import gsap from "gsap";
import { X } from "lucide-react";

const CloseMenuIcon = () => {
  const closeMenuHAndler = () => {
    gsap.to("#sideMenu", {
      duration: 1,
      x: "100%",
      ease: "power3.inOut",
    });
  };

  return (
    <div>
      <X
        onClick={closeMenuHAndler}
        className="absolute cursor-pointer top-8 right-6 w-11 h-11"
      />
    </div>
  );
};

export default CloseMenuIcon;
