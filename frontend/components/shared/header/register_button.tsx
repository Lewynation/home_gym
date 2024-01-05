"use client";

import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import { useSession, signIn, signOut } from "next-auth/react";

const registerButtonVariants = cva(
  "px-3 py-2 group border-2 transition-all duration-200",
  {
    variants: {
      scrolledFromTop: {
        true: "bg-primary text-black border-tertiary",
        false: "bg-white text-black border-white",
      },
    },
    defaultVariants: {
      scrolledFromTop: false,
    },
  }
);

const RegisterButton = () => {
  const [scrolled, setScrolled] = useState(false);
  const session = useSession();

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

  if (session) {
    return <div>Signe In</div>;
  } else {
    <button className={registerButtonVariants({ scrolledFromTop: scrolled })}>
      <div className="flex gap-3 items-center">
        <p className="font-redHat font-bold">Register Now</p>
        <ArrowRight
          size={18}
          className="group-hover:translate-x-1 transition-all duration-300"
        />
      </div>
    </button>;
  }
};

export default RegisterButton;
