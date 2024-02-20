import prisma from "../../../prisma/client";
import { auth } from "@/auth";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import TrainerContactRequest from "@/app/emails/trainer-contact_request";

interface PostParams {
  trainerId: string;
}

const NODEMAIL_USER = process.env.NODEMAIL_USER;
const NODEMAIL_PASS = process.env.NODEMAIL_PASS;

export async function GET(req: Request) {
  const session = await auth();
  if (!session || !session.user) return Response.json("Not logged in");

  const userContactRequests = await prisma.trainerRequests.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      createdAt: true,
      trainer: {
        select: {
          name: true,
          id: true,
          location: true,
          serialNo: true,
        },
      },
    },
  });

  return Response.json({ data: userContactRequests });
}

export async function POST(req: Request, res: Response) {
  const session = await auth();
  if (!session || !session.user) return Response.json("Not logged in");

  const trainerId = (await req.json()) as PostParams;

  if (!trainerId.trainerId) return Response.json("No product id provided");

  const userEmail = session.user.email!;

  const availableContact = await prisma.trainerRequests.findFirst({
    where: {
      user: {
        email: userEmail,
      },
      trainerId: trainerId.trainerId,
    },
    select: {
      id: true,
    },
  });
  if (availableContact) return Response.error();

  try {
    const trainer = await prisma.trainerRequests.create({
      data: {
        user: {
          connect: {
            email: userEmail,
          },
        },
        trainer: {
          connect: {
            id: trainerId.trainerId,
          },
        },
      },
      select: {
        trainerId: true,
        trainer: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    const emailHtml = render(
      TrainerContactRequest({
        userFirstname: trainer.user.name ?? "",
        trainerName: trainer.trainer.name,
      })
    );

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      service: "Outlook365",
      port: 587,
      secure: false,
      auth: {
        user: NODEMAIL_USER,
        pass: NODEMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    const mailoptions = {
      from: NODEMAIL_USER,
      to: trainer.user.email!,
      subject: "Trainer Contact Request",
      text: `Hello ${trainer.user.name}, you have successfully requested to contact a trainer. The trainer will be in touch with you shortly.`,
      html: emailHtml,
    };

    transporter
      .sendMail(mailoptions)
      .then((info) => {
        console.log("😂😂Message sent: %s", info.messageId);
      })
      .catch((error) => {
        console.log("Error occurred", error);
      })
      .finally(() => {
        transporter.close();
        console.log(trainer);
      });
    return Response.json({ data: trainer.trainerId });
  } catch (error) {
    console.log("error", error);
    return Response.error();
  }
  // Send confirmation email to the client
}
