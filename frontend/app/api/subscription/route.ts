import prisma from "../../../prisma/client";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session || !session.user) return Response.json("Not logged in");

  const subscriptions = await prisma.user.findFirst({
    where: {
      email: session.user.email!,
    },
    select: {
      subscriptionExpiry: true,
      Subscription: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          ref: true,
          createdAt: true,
          amountPaid: true,
          tier: {
            select: {
              name: true,
              duration: true,
              price: true,
            },
          },
        },
      },
    },
  });

  return Response.json({ data: subscriptions });
}
