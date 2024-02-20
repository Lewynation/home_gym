import React from "react";
import prisma from "../../../prisma/client";
import FeaturedItem from "./featured_item";

async function getProducts() {
  const products = await prisma.product.findMany({
    where: {
      category: "featured",
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      image: true,
      category: true,
      shortDesc: true,
    },
  });
  return products;
}

const FeaturedItemsPage = async () => {
  const prods = (await getProducts()) as {
    id: string;
    name: string;
    description: string | null;
    shortDesc: string | null;
    price: number;
    image: string | null;
    category: string | null;
  }[];

  return (
    <div className="flex flex-col px-5 md:px-0">
      <div className="flex justify-center items-center flex-col mb-10">
        <h1 className="font-kaushanScript text-primaryColor text-4xl mt-10 mb-5 -rotate-3">
          Our Featured Items
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-14">
        {prods.map((prod, index) => (
          <FeaturedItem
            key={prod.id}
            prodId={prod.id}
            image={prod.image ?? ""}
            name={prod.name}
            price={prod.price}
            shortDesc={prod.shortDesc ?? ""}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedItemsPage;
