"use client";
import Image from "next/image";
import React from "react";
import useSWR from "swr";
import { useSession, signIn } from "next-auth/react";
import { useSWRConfig } from "swr";
import { useToast } from "@/components/ui/use-toast";
import { LoadingBanner } from "@/components/shared/loading_banner/loading_bar";
import { formatNumberWithCommas } from "@/lib/utils";
import { MoonLoader } from "react-spinners";

interface Props {
  productId: string;
}

// const API_URL = "http://localhost:6061/api";
const API_URL = "https://gym.ocluse.com/api";

const SingleProduct: React.FC<Props> = ({ productId }) => {
  const session = useSession();
  const [loading, setLocalLoading] = React.useState(false);
  const { mutate } = useSWRConfig();
  const { toast } = useToast();

  const { data, error, isLoading } = useSWR(
    `/product/${productId}`,
    async () => {
      console.log("fetching");
      console.log(productId);
      const res = await fetch(`${API_URL}/product/${productId}`);
      const responseJson = await res.json();
      console.log("Response Json", responseJson);
      return responseJson as {
        data: {
          id: string;
          name: string;
          description: string | null;
          shortDesc: string | null;
          price: number;
          image: string | null;
          createdAt: Date;
          category: string | null;
        } | null;
      };
    }
  );

  const onAddToCart = async () => {
    if (!session.data?.user) {
      signIn();
    } else {
      if (loading) {
        return;
      }
      setLocalLoading(true);
      try {
        const res = await fetch("/api/cart", {
          body: JSON.stringify({ productId }),
          method: "POST",
        });
        toast({
          title: "Sucessfull",
          description: "Item added sucessfully to cart",
          className: "z-2000000",
        });
        mutate("/cart-count");
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong",
          className: "z-2000000",
        });
      } finally {
        setLocalLoading(false);
      }
    }
  };

  return (
    <>
      <div>
        {isLoading ? (
          <div className="flex items-center justify-center my-8">
            <MoonLoader color="white" size={28} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-10 md:gap-y-0 md:grid-cols-2 gap-x-10 px-5 md:px-0">
            {loading && <LoadingBanner loading={loading} />}
            <div className="h-screen">
              <Image
                src={`/images/${data?.data?.image!}`}
                alt={data?.data?.name!}
                className="h-full w-full object-cover"
                width={500}
                height={500}
              />
            </div>
            <div>
              <h2 className="font-redHat text-4xl text-white font-bold uppercase">
                {data?.data?.name}
              </h2>
              <p className="font-redHat mt-2 text-[#b1b7b5] text-xl font-bold">
                {data?.data?.shortDesc}
              </p>
              <p className="text-xl text-white mt-4">{`KES ${formatNumberWithCommas(
                Number(data?.data?.price ?? 0)
              )}`}</p>
              <p className="font-bold font-redHat text-white text-xl mt-3">
                Description:
              </p>
              <p className="font-redHat mt-2 text-[#b1b7b5] text-xl">
                {data?.data?.description}
              </p>
              <button
                onClick={onAddToCart}
                className="mt-6 font-bold bg-primaryColor w-full text-black px-3 py-4 flex items-center justify-center group border-tertiaryColor border-2"
              >
                Add To Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
