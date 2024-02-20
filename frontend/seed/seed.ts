import prisma from "../prisma/client";
import orders from "./products_seed.json";
import subs from "./subscriptions_seed.json";
import { trainers_seed } from "./trainers_seed";

async function main() {
  const subscriptionTiers = await prisma.subscriptionTier.createMany({
    data: subs.map((sub) => ({
      id: sub.id,
      name: sub.name,
      duration: sub.duration,
      price: sub.price,
    })),
  });
  const products = await prisma.product.createMany({
    data: orders.map((order) => ({
      name: order.name,
      shortDesc: order.short_description,
      description: order.description,
      image: order.image,
      category: order.category as any,
      price: order.price,
    })),
  });

  const trainersData = await prisma.trainer.createMany({
    data: trainers_seed.map((trainer) => ({
      name: trainer.name,
      phoneNumber: trainer.phone_number,
      email: trainer.email,
      location: trainer.location,
      bio: trainer.bio,
      servicesOffered: trainer.services_offered,
      availability: trainer.availability,
      rates: trainer.rates,
      credentials: trainer.credentials,
      experience: trainer.experience,
    })),
  });

  console.log({ trainersData });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
