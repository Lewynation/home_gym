import prisma from "../../../prisma/client";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session || !session.user) return Response.json("Not logged in");

  const data = await prisma.productToCart.aggregate({
    where: {
      cart: {
        user: {
          email: session?.user.email!,
        },
      },
    },
    _sum: {
      quantity: true,
    },
  });
  return Response.json({ data: data._sum.quantity });
}

interface PostParams {
  productId: string;
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session || !session.user) return Response.json("Not logged in");

  const productId = (await req.json()) as PostParams;

  if (!productId.productId) return Response.json("No product id provided");

  const availableItemInCart = await prisma.productToCart.findFirst({
    where: {
      cart: {
        user: {
          email: session.user.email!,
        },
      },
      productId: productId.productId,
    },
    select: {
      id: true,
      quantity: true,
      cart: {
        select: {
          id: true,
        },
      },
    },
  });

  if (availableItemInCart) {
    await prisma.productToCart.update({
      where: {
        id: availableItemInCart.id,
      },
      data: {
        quantity: availableItemInCart.quantity + 1,
      },
    });
    return Response.json({ data: "ok" });
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email!,
    },
    select: {
      Cart: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!user?.Cart) {
    // Create the cart and add the items
    const cart = await prisma.cart.create({
      data: {
        user: {
          connect: {
            email: session.user.email!,
          },
        },
      },
      select: {
        id: true,
      },
    });
    await prisma.productToCart.create({
      data: {
        product: {
          connect: {
            id: productId.productId,
          },
        },
        cart: {
          connect: {
            id: cart.id,
          },
        },
      },
    });
  } else {
    await prisma.productToCart.create({
      data: {
        product: {
          connect: {
            id: productId.productId,
          },
        },
        cart: {
          connect: {
            id: user.Cart.id,
          },
        },
      },
    });
  }

  return Response.json({ data: "ok" });
}

interface DeleteParams {
  productToCartId: string;
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session || !session.user) return Response.json("Not logged in");

  const cartId = (await req.json()) as DeleteParams;
  await prisma.productToCart.delete({
    where: {
      id: cartId.productToCartId,
    },
  });

  console.log("deleted");

  return Response.json({ data: "ok" });
}

interface PatchParams {
  quantity: number;
  productToCartId: string;
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session || !session.user) return Response.json("Not logged in");

  const patchParams = (await req.json()) as PatchParams;

  const cartItem = await prisma.productToCart.findFirst({
    where: {
      id: patchParams.productToCartId,
    },
    select: {
      quantity: true,
    },
  });

  if (patchParams.quantity === -1) {
    if (cartItem?.quantity === 1) return Response.json({ data: "ok" });
    await prisma.productToCart.update({
      where: {
        id: patchParams.productToCartId,
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
    return Response.json({ data: "ok" });
  } else if (patchParams.quantity === 1) {
    if (cartItem?.quantity === 10) return Response.json({ data: "ok" });
    await prisma.productToCart.update({
      where: {
        id: patchParams.productToCartId,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });
    return Response.json({ data: "ok" });
  }
}
