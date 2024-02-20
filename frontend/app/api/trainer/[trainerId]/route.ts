import prisma from "../../../../prisma/client";
import { auth } from "@/auth";

export async function GET(
  request: Request,
  { params }: { params: { trainerId: string } }
) {
  const trainerId = params.trainerId;

  try {
    const trainer = await prisma.trainer.findFirst({
      where: {
        id: trainerId,
      },
      select: {
        id: true,
        name: true,
        bio: true,
        availability: true,
        email: true,
        rates: true,
        serialNo: true,
        servicesOffered: true,
        location: true,
        experience: true,
        phoneNumber: true,
        credentials: true,
      },
    });
    return Response.json({ data: trainer });
  } catch (error) {
    console.log("error", error);
    return Response.json({ error });
  }
}
