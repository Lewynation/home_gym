"use client";
import React from "react";
import { ShoppingCartIcon } from "lucide-react";
import ShoppingCartItemsCount from "./shopping_cart_items_count";
import Link from "next/link";

const ShoppingCartButton: React.FC = () => {
  return (
    <div className="relative">
      <ShoppingCartItemsCount />
      <Link href="/cart">
        <ShoppingCartIcon size={30} className="cursor-pointer" />
      </Link>
    </div>
  );
};

export default ShoppingCartButton;
