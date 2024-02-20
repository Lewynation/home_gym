"use client";

import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import RecommendedFoodPrograms from "./recommended_food_programs/recommended_food_programs";
import RecommendedPersonalTrainers from "./recommended_personal_trainers/recommeded_personal_trainers";
import RecommendedGymEquipment from "./recommended_gym_equipment/recommended_gym_equipment";
import useSWR from "swr";
import { useCountUp } from "react-countup";
import { useToast } from "@/components/ui/use-toast";
import { useSWRConfig } from "swr";
import { LoadingBanner } from "@/components/shared/loading_banner/loading_bar";

const DashbooardHome = () => {
  const counterRef = React.useRef(null);
  const [height, setHeight] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const { update } = useCountUp({
    ref: counterRef,
    start: 0,
    end: 0,
    duration: 2,
    decimals: 2,
    delay: 0,
    suffix: " kg/m2",
    prefix: "BMI= ",
  });
  const { toast } = useToast();
  const { mutate } = useSWRConfig();

  const { data, error, isLoading } = useSWR("/dashboard-user", async () => {
    const res = await fetch("/api/user");
    return (await res.json()) as {
      data: {
        name: string | null;
        image: string | null;
        address: string | null;
        phoneNumber: string | null;
        height: number | null;
        weight: number | null;
      } | null;
    };
  });

  const [loading, setLoading] = React.useState(false);

  const calculateBMI = (weight: number, height: number) => {
    const heightInM = height / 100;
    const bmi = weight / (heightInM * heightInM);
    return bmi;
  };

  const updateUserHeightAndWeight = async (height: number, weight: number) => {
    if (loading) return;
    if (height === 0 || weight === 0) {
      toast({
        title: "Error",
        description: "Please provide your height and weight",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);
      await fetch("/api/user", {
        method: "PATCH",
        body: JSON.stringify({ weight, height }),
      });
      toast({
        title: "Success",
        description: "Your height and weight has been updated",
        variant: "default",
      });
      mutate("/dashboard-user");
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data?.data?.height && data?.data?.weight) {
      console.log("Weight and height provided, calculating BMI...");
      update(calculateBMI(data?.data?.weight, data?.data?.height));
    }
  }, [data, update]);

  return (
    <div className="flex flex-col px-5 md:px-0 gap-y-8 max-w-[650px]">
      {loading && <LoadingBanner loading={loading} />}
      <div>
        <div className="flex gap-2">
          <p className="text-white font-redHat md:text-2xl text-xl mt-4 font-bold">
            You Height:
          </p>
          <p className="text-white font-redHat md:text-2xl text-xl mt-4">
            {data?.data?.height ? `${data?.data?.height} cm` : "NOT PROVIDED"}
          </p>
        </div>
        <div className="flex gap-2">
          <p className="text-white font-redHat md:text-2xl text-xl mt-4 font-bold">
            Your Weight:
          </p>
          <p className="text-white font-redHat md:text-2xl text-xl mt-4">
            {data?.data?.weight ? `${data?.data?.weight} kg` : "NOT PROVIDED"}
          </p>
        </div>
        <div className="flex gap-2">
          <p className="text-white font-redHat md:text-2xl text-xl mt-4 font-bold">
            Calculated BMI:
          </p>
          <div
            className="text-white font-redHat md:text-2xl text-xl mt-4"
            ref={counterRef}
          />
        </div>
      </div>
      <div>
        <p className="font-redHat text-[#b1b7b5] text-sm">
          The Body Mass Index (BMI) calculator calculates body mass index from
          your weight and height.
        </p>
      </div>
      <div className="flex flex-col gap-y-8">
        <div className="flex gap-4 w-full">
          <div className="flex gap-4 px-3 py-4 border-2 border-tertiaryColor w-full">
            <input
              type="number"
              placeholder="Height"
              className="outline-none w-full border-none bg-transparent text-white font-redHat"
              onChange={(e) => {
                setHeight(parseInt(e.target.value));
              }}
            />
            <p className="font-redHat text-white ">cm</p>
          </div>
          <div className="flex gap-4 px-3 py-4 border-2 border-tertiaryColor w-full">
            <input
              type="number"
              placeholder="Weight"
              className="outline-none w-full border-none bg-transparent text-white font-redHat"
              onChange={(e) => {
                setWeight(parseInt(e.target.value));
              }}
            />
            <p className="font-redHat text-white ">kg</p>
          </div>
        </div>
        <div className="w-full">
          <button
            onClick={() => {
              update(calculateBMI(weight, height));
              updateUserHeightAndWeight(height, weight);
            }}
            className="bg-primaryColor w-full text-black px-3 py-4 flex items-center justify-center group border-tertiaryColor border-2"
          >
            <div className="flex gap-3 items-center">
              <p className="font-redHat font-bold">Calculate Now</p>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-all duration-300"
              />
            </div>
          </button>
        </div>
      </div>
      {data?.data?.height && data?.data?.weight && (
        <>
          <div>
            <div>
              <RecommendedGymEquipment />
            </div>
            <div>
              <RecommendedPersonalTrainers />
            </div>
            <div>
              <RecommendedFoodPrograms />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashbooardHome;
