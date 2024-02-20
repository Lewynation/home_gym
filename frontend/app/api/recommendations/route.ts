import prisma from "../../../prisma/client";
import { NextRequest } from "next/server";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const bmi = req.nextUrl.searchParams.get("bmi");

  if (!bmi) return Response.json("No BMI provided");

  const recommendations =
    await prisma.$queryRaw`SELECT * FROM "public"."Product"
      ORDER BY random()
      LIMIT 6;`;

  return Response.json({ data: recommendations });
}
