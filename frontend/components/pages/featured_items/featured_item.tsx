"use client";

import React from "react";
import Image from "next/image";
import { formatNumberWithCommas } from "@/lib/utils";
import { Eye, Plus, ShoppingBasketIcon } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { useSWRConfig } from "swr";
import { LoadingBanner } from "@/components/shared/loading_banner/loading_bar";
import { useToast } from "@/components/ui/use-toast";
import AddToCartButton from "@/components/shared/add_to_cart_buttons/add_to_cart_button";
import Link from "next/link";

interface FeaturedItemProps {
  image: string;
  name: string;
  price: number;
  shortDesc: string;
  prodId: string;
}

const FeaturedItem: React.FC<FeaturedItemProps> = ({
  image,
  name,
  price,
  shortDesc,
  prodId,
}) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="flex flex-col">
      {loading && <LoadingBanner loading={loading} />}
      <div className="overflow-hidden h-96 rounded-lg relative group">
        <Image
          src={`/images/${image}`}
          alt="img"
          className="w-full h-full object-cover hover:scale-125 transition-all duration-300"
          width={150}
          height={150}
        />
        <div className="absolute  left-1/2 -translate-x-1/2 top-1/2 gap-x-2 -translate-y-1/2 flex items-center justify-center scale-0 group-hover:scale-100 transition-all duration-150">
          <div
            onClick={() => console.log("Clicked")}
            className="rounded-full bg-primaryColor p-2 cursor-pointer"
          >
            <Link href={`/featured-items/${prodId}`}>
              <Eye className="text-white" />
            </Link>
          </div>
          <AddToCartButton productId={prodId} setLoading={setLoading} />
        </div>
      </div>
      <div className="mt-3 flex justify-between">
        <h1 className="font-redHat text-white font-bold">{name}</h1>
        <h1 className="font-redHat text-white font-bold">{`KES ${formatNumberWithCommas(
          price
        )}`}</h1>
      </div>
      <div className="mt-1">
        <p className="font-redHat text-[#b0b7b3]">{shortDesc}</p>
      </div>
    </div>
  );
};

export default FeaturedItem;
