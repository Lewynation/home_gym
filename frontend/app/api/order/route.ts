import prisma from "../../../prisma/client";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session || !session.user) return Response.json("Not logged in");

  const orders = await prisma.user.findFirst({
    where: {
      email: session.user.email!,
    },
    select: {
      Order: {
        orderBy: {
          serialNo: "asc",
        },
        select: {
          id: true,
          ref: true,
          serialNo: true,
          createdAt: true,
          amount: true,
          product: {
            //ProductToOrder
            select: {
              quantity: true,
              product: {
                select: {
                  name: true,
                  image: true,
                  id: true,
                  price: true,
                  shortDesc: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return Response.json({ data: orders });
}
