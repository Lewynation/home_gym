import { auth } from "@/auth";
import prisma from "../../../prisma/client";

type NonNullableKeys<T> = {
  [K in keyof T]: Exclude<T[K], null>;
};

function removeNullKeys(obj: {
  address: string | null;
  phoneNumber: string | null;
  height: number | null;
  weight: number | null;
  [key: string]: string | null | number; // Add index signature
}): NonNullableKeys<typeof obj> {
  const result: NonNullableKeys<typeof obj> = {} as NonNullableKeys<typeof obj>;

  for (const key in obj) {
    if (obj[key] !== null) {
      result[key] = obj[key] as Exclude<typeof key, null>;
    }
  }

  return result;
}
export async function GET() {
  const session = await auth();
  if (!session || !session.user) return Response.json("Not logged in");

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email!,
    },
    select: {
      phoneNumber: true,
      address: true,
      name: true,
      image: true,
      height: true,
      weight: true,
    },
  });

  return Response.json({ data: user });
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session || !session.user) return Response.json("Not logged in");

  const data = (await req.json()) as {
    address: string | null;
    phoneNumber: string | null;
    height: number | null;
    weight: number | null;
  };

  const modifiedData = removeNullKeys(data);

  try {
    const user = await prisma.user.update({
      where: {
        email: session.user.email!,
      },
      data: modifiedData,
      select: {
        phoneNumber: true,
        address: true,
        name: true,
        image: true,
      },
    });

    return Response.json({ data: user });
  } catch (error) {
    return Response.json({ error });
  }
}
