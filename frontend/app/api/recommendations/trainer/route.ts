import prisma from "../../../../prisma/client";
import { NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  //   const trainer = await prisma.$queryRaw`SELECT * FROM "public"."Product"
  //       ORDER BY random()
  //       LIMIT 8;`;
  const limit = req.nextUrl.searchParams.get("limit");

  if (!limit) return Response.json("No limit provided");

  const trainer = await prisma.$queryRaw`SELECT * FROM "public"."Trainer"
      ORDER BY random()
      LIMIT 8;`;

  return Response.json({ data: trainer });
}
