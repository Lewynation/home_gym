import { render } from "@react-email/render";
import prisma from "../../../../prisma/client";
import { auth } from "@/auth";
import TrainerContactRequestDeleted from "@/app/emails/trainer_contact_request_deleted";
import nodemailer from "nodemailer";

const NODEMAIL_USER = process.env.NODEMAIL_USER;
const NODEMAIL_PASS = process.env.NODEMAIL_PASS;

export async function GET() {
  const session = await auth();
  if (!session || !session.user) return Response.json("Not logged in");

  const trainers = await prisma.trainerRequests.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
    select: {
      id: true,
      status: true,
      trainer: {
        select: {
          name: true,
          experience: true,
          bio: true,
          credentials: true,
          availability: true,
          location: true,
          serialNo: true,
          servicesOffered: true,
          id: true,
          rates: true,
        },
      },
    },
  });

  return Response.json({ data: trainers });
}

interface DeleteParams {
  trainerRequestId: string;
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session || !session.user) return Response.json("Not logged in");

  const trainerRequestId = (await req.json()) as DeleteParams;
  if (!trainerRequestId.trainerRequestId)
    return Response.json("No trainerRequestId provided");

  const trainer = await prisma.trainerRequests.delete({
    where: {
      id: trainerRequestId.trainerRequestId,
    },
    select: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      trainer: {
        select: {
          name: true,
        },
      },
    },
  });

  const emailHtml = render(
    TrainerContactRequestDeleted({
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
    subject: "Trainer Contact Request Deleted",
    text: `Hello ${trainer.user.name}, you have successfully deleted your request to contact ${trainer.trainer.name}`,
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
    });

  console.log("deleted");

  return Response.json({ data: "ok" });
}
