"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useSWR from "swr";
import { ProductRecommendation } from "@/components/pages/choose_us/bmi_calculator";
import { MoonLoader } from "react-spinners";
import { formatNumberWithCommas } from "@/lib/utils";
import Link from "next/link";
import { Eye } from "lucide-react";
import Image from "next/image";
import AddToCartButton from "@/components/shared/add_to_cart_buttons/add_to_cart_button";
import { TrainerListItemProps } from "@/components/pages/trainers/trainer_list_item";

const RecommendedPersonalTrainers = () => {
  const [loading, setLoading] = React.useState(false);
  const {
    data: trainers,
    error,
    isLoading: recommendationsLoading,
  } = useSWR("/trainers", async () => {
    const res = await fetch(`/api/recommendations/trainer?limit=8`);
    const response = await res.json();
    return response.data as TrainerListItemProps["trainer"][];
  });

  console.log(trainers, "trainers");
  return (
    <div>
      <div className="my-3">
        {recommendationsLoading ? (
          <div className="flex items-center justify-center my-10">
            <MoonLoader color="#fff" size={28} />
          </div>
        ) : trainers && trainers.length > 0 ? (
          <div>
            <p className="font-assistant font-bold text-white">
              Recommended Personal Trainers:
            </p>
            <div className="mt-6">
              <Carousel
                opts={{
                  align: "start",
                }}
                className=" mx-auto max-w-[300px] md:max-w-max"
              >
                <CarouselContent>
                  {trainers.map((prod) => (
                    <CarouselItem
                      key={prod.id}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <div
                        key={prod.id}
                        className="flex flex-col items-center justify-center overflow-hidden relative group"
                      >
                        <div className="absolute  left-1/2 -translate-x-1/2 top-1/2 gap-x-2 -translate-y-1/2 flex items-center justify-center scale-0 group-hover:scale-100 transition-all duration-150">
                          <div
                            onClick={() => console.log("Clicked")}
                            className="rounded-full bg-primaryColor p-2 cursor-pointer"
                          >
                            <Link href={`/trainers/${prod.id}`}>
                              <Eye className="text-white" />
                            </Link>
                          </div>
                          {/* <AddToCartButton
                            productId={prod.id}
                            setLoading={setLoading}
                          /> */}
                        </div>
                        <div className="w-[150px] h-[150px] ">
                          <Image
                            src={`https://randomuser.me/api/portraits/men/${prod.serialNo}.jpg`}
                            alt={prod.name}
                            className="w-full h-full object-cover rounded-full"
                            width={150}
                            height={150}
                          />
                        </div>
                        <p className="font-redHat text-white text-lg mt-4">
                          {prod.name}
                        </p>

                        <p className="font-redHat text-white text-xs mt-2">
                          {prod.experience} of experience
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default RecommendedPersonalTrainers;
