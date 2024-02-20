import prisma from "../../../../prisma/client";
import { auth } from "@/auth";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const productId = params.productId;

  try {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        shortDesc: true,
        createdAt: true,
        category: true,
      },
    });
    return Response.json({ data: product });
  } catch (error) {
    console.log("error", error);
    return Response.json({ error });
  }
}
