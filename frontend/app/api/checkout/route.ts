import prisma from "../../../prisma/client";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session || !session.user) return Response.json("Not logged in");

  const items = await prisma.cart.findFirst({
    where: {
      user: {
        email: session.user.email!,
      },
    },
    select: {
      id: true,
      userId: true,
      products: {
        orderBy: {
          id: "asc",
        },
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              image: true,
              shortDesc: true,
            },
          },
        },
      },
    },
  });
  return Response.json({ data: items });
}
