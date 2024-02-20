"use client";

import { ArrowRight, Eye } from "lucide-react";
import React from "react";
import Image from "next/image";
import adjustabeDumbell from "@/assets/images/adjustabledumbbell.jpg";
import { useCountUp } from "react-countup";
import { MoonLoader } from "react-spinners";
import { formatNumberWithCommas } from "@/lib/utils";
import AddToCartButton from "@/components/shared/add_to_cart_buttons/add_to_cart_button";
import { LoadingBanner } from "@/components/shared/loading_banner/loading_bar";
import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";
import { useToast } from "@/components/ui/use-toast";
import { useSWRConfig } from "swr";
import { useSession, signIn } from "next-auth/react";

export interface ProductRecommendation {
  id: string;
  name: string;
  description: string | null;
  shortDesc: string | null;
  price: number;
  image: string | null;
  category: string;
}

// interface BMICalculationSectionProps {
//   isDashbaord?: boolean;
// }

const bmiSectionVariants = cva(
  "grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-0 gap-x-20",
  {
    variants: {
      isDashboard: {
        false: "",
        true: "",
      },
    },
    defaultVariants: {
      isDashboard: false,
    },
  }
);

type BMICalculationSectionProps = VariantProps<typeof bmiSectionVariants>;

const BMICalculationSection: React.FC<BMICalculationSectionProps> = ({
  isDashboard,
}) => {
  const [height, setHeight] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [productRecommendations, setProductRecommendations] = React.useState<
    ProductRecommendation[]
  >([]);
  const [recommendationsLoading, setRecommendationsLoading] =
    React.useState<boolean>(false);

  const [bmi, setBmi] = React.useState(0);
  const [previousBmi, setPreviousBmi] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const counterRef = React.useRef(null);
  const { toast } = useToast();
  const { mutate } = useSWRConfig();
  const session = useSession();

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

  const calculateBMI = (weight: number, height: number) => {
    const heightInM = height / 100;
    const bmi = weight / (heightInM * heightInM);
    setBmi(bmi);
    return bmi;
  };

  const fetchRecommendation = (bmi: number) => {
    setRecommendationsLoading(true);
    if (bmi === previousBmi) {
      setRecommendationsLoading(false);
      return;
    }
    fetch(`/api/recommendations?bmi=${bmi}`)
      .then((res) => res.json())
      .then((data: { data: ProductRecommendation[] }) => {
        setProductRecommendations(data.data);
        setPreviousBmi(bmi);
      })
      .finally(() => {
        setRecommendationsLoading(false);
      });
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

  return (
    <div className="mb-28 px-5 md:px-0">
      {loading && <LoadingBanner loading={loading} />}
      <div className={bmiSectionVariants({ isDashboard })}>
        <div className="flex flex-col gap-y-8">
          {isDashboard ? (
            <></>
          ) : (
            <div>
              <h2 className="uppercase font-redHat text-5xl">
                <span className="font-outline-2">Calculate</span>{" "}
                <span className="text-white font-bold">Your BMI</span>
              </h2>
            </div>
          )}
          <div>
            <p className="font-redHat text-[#b1b7b5] text-sm">
              The Body Mass Index (BMI) calculator calculates body mass index
              from your weight and height.
            </p>
          </div>
          <div className="flex flex-col gap-y-8">
            <div className="flex gap-4">
              <div className="flex gap-4 px-3 py-4 border-2 border-tertiaryColor">
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
              <div className="flex gap-4 px-3 py-4 border-2 border-tertiaryColor">
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
                  if (!session.data?.user) {
                    signIn();
                    return;
                  }
                  updateUserHeightAndWeight(height, weight);
                  update(calculateBMI(weight, height));
                  fetchRecommendation(calculateBMI(weight, height));
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
        </div>
        <div className="flex items-center justify-center">
          <Image
            src={adjustabeDumbell}
            alt="Adjustable dumbell"
            className="w-[300px] object-cover"
          />
        </div>
      </div>
      <div>
        <div
          className="text-white font-redHat text-4xl md:text-6xl mt-8 font-bold"
          ref={counterRef}
        />
        <div className="mt-4">
          <p className="text-white font-bold font-redHat">NOTE:</p>
          <p className="font-redHat text-xs text-[#b1b7b5]">
            BMI is a useful screening tool, but individual health may be
            influenced by various factors not considered in the BMI calculation.
            <br />
            Therefore, the BMI result should be interpreted cautiously, and
            consultation with a healthcare professional is recommended for a
            <br />
            comprehensive evaluation of health status.
          </p>
        </div>
        {recommendationsLoading ? (
          <div className="flex items-center justify-center my-10">
            <MoonLoader color="#fff" size={28} />
          </div>
        ) : productRecommendations && productRecommendations.length > 0 ? (
          <div>
            <h2 className="font-bold font-redHat text-lg text-white mt-10">
              Our Product Recommendations:
            </h2>
            <div className="grid grid-cols-3 gap-x-10 gap-y-10 mt-10">
              {productRecommendations.map((prod) => (
                <div
                  key={prod.id}
                  className="flex flex-col items-center justify-center overflow-hidden relative group"
                >
                  <div className="absolute  left-1/2 -translate-x-1/2 top-1/2 gap-x-2 -translate-y-1/2 flex items-center justify-center scale-0 group-hover:scale-100 transition-all duration-150">
                    <div
                      onClick={() => console.log("Clicked")}
                      className="rounded-full bg-primaryColor p-2 cursor-pointer"
                    >
                      <Link href={`/featured-items/${prod.id}`}>
                        <Eye className="text-white" />
                      </Link>
                    </div>
                    <AddToCartButton
                      productId={prod.id}
                      setLoading={setLoading}
                    />
                  </div>
                  <div className="w-[200px] h-[200px]">
                    <Image
                      src={`/images/${prod.image}`}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                      width={200}
                      height={200}
                    />
                  </div>
                  <p className="font-redHat text-white text-lg mt-4">
                    {prod.name}
                  </p>
                  <p className="font-redHat text-white text-lg mt-2">
                    KES {formatNumberWithCommas(prod.price)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BMICalculationSection;
