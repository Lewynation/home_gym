import React from "react";
// import { trainers } from "./sample_trainers";
import TrainerListItem from "./trainer_list_item";
import prisma from "../../../prisma/client";

const TrainersBody = async () => {
  const trainers = await prisma.trainer.findMany({
    select: {
      id: true,
      email: true,
      phoneNumber: true,
      bio: true,
      name: true,
      availability: true,
      rates: true,
      serialNo: true,
      servicesOffered: true,
      location: true,
      experience: true,
      credentials: true,
    },
    take: 10,
  });
  return (
    <div>
      <div className="flex items-center justify-center flex-col ">
        <h1 className="font-kaushanScript text-primaryColor text-3xl mt-10 mb-5 -rotate-3">
          Our Featured Trainers
        </h1>
        <h2 className="uppercase font-redHat text-5xl text-center">
          <span className="font-outline-2">Meet your</span>{" "}
          <span className="text-white font-bold">professional trainer</span>
        </h2>
      </div>
      <div className="flex items-center justify-center flex-col max-w-[700px] mx-auto my-10 px-5 md:px-0">
        {trainers.map((trainer, index) => (
          <TrainerListItem key={trainer.id} trainer={trainer} />
        ))}
      </div>
    </div>
  );
};

export default TrainersBody;
