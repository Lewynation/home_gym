import React from "react";
import Image from "next/image";
import dumbellIcon from "@/assets/icons/dumbbellicon.jpg";
import { aboutElements } from "./about_elements";
import SingleAboutElement from "./single_about_item";

const AboutLanding = () => {
  return (
    <div>
      <div className="flex items-center justify-center flex-col ">
        <h1 className="font-kaushanScript text-primary text-3xl mt-10 mb-5 -rotate-3">
          About
        </h1>
        <h2 className="uppercase font-redHat text-5xl">
          <span className="font-outline-2">Learn more</span>{" "}
          <span className="text-white font-bold">about us</span>
        </h2>
      </div>
      <div>
        <p className="font-redHat text-[#b1b7b5] mt-8">
          The pandemic of COVID-19 led to the temporary closure of health clubs
          and gyms owing to worldwide lockdown, impacting the demand for workout
          equipment in 2020. As a result of decreasing demand for fitness
          centers, the sector faced a temporary slowdown. Several people avoided
          going to the gyms owing to the virus. On the other hand, this aspect
          led to a rise in the revenue of fitness equipment companies as the
          demand for workouts from home soared. For safety reasons, individuals
          chose to practice indoors with their own fitness equipment. Home
          fitness companies have entered the fitness industry and are here to
          stay. The market is expected to expand from 2021 to 2027 at a CAGR of
          7.8%. In order to encourage users to take an active interest in their
          own health, these interactive platforms use real-time customized
          health data. Moreover, they also provide a social connection with
          friends and other platform users, which encourages those who are in
          need of social motivation and accountability. Importantly, this
          health-based data may be combined with some advanced wearable
          technology such as Apple watches and Fitbit for an accurate
          reading.There is a multitude of firms entering the fitness market
          which offer various equipment that helps you to carry out your fitness
          regime from home including cyclists, cross-fit, yoga, and dance
          courses. The various home-based equipment range from costly stationary
          cycles and treadmills to cheaper choices like yoga and bodyweight
          strength training. Let’s dive deep into the industry to see the top
          fitness companies who are leaving quite an indelible mark in the home
          fitness market.
          <br />
          Current market trends led to the spike in demand for at-home fitness
          equipment and the profits of workout companies. With the emergence of
          a budding ecosystem that includes customers, service and workout
          companies, complementary sectors, and government initiatives, the
          fitness industry in the United States is developing at a fast pace.
          Let’s have a look at the factors revolutionizing the industry.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-12 my-28">
        {aboutElements.map(({ description, image, title }, index) => (
          <SingleAboutElement
            description={description}
            image={image}
            title={title}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutLanding;
