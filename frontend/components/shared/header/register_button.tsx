"use client";

import { ArrowRight, LogOut, ShoppingCartIcon, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ShoppingCartButton from "./shopping_cart_button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const registerButtonVariants = cva(
  "px-3 py-2 group border-2 transition-all duration-200",
  {
    variants: {
      scrolledFromTop: {
        true: "bg-primaryColor text-black border-tertiaryColor",
        false: "bg-white text-black border-white",
      },
    },
    defaultVariants: {
      scrolledFromTop: false,
    },
  }
);

const RegisterButton: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const session = useSession();
  const router = useRouter();

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

  if (session.data?.user) {
    return (
      <div className="flex gap-2 md:gap-x-4 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback className="text-black">DP</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-[20000]">
            <DropdownMenuLabel>My Profile</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/dashboard">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ShoppingCartButton />
      </div>
    );
  } else {
    return (
      <button
        onClick={() => signIn()}
        className={registerButtonVariants({ scrolledFromTop: scrolled })}
      >
        <div className="flex gap-3 items-center">
          <p className="font-redHat font-bold">Register Now</p>
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 hidden md:flex transition-all duration-300"
          />
        </div>
      </button>
    );
  }
};

export default RegisterButton;
