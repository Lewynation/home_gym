import { MpesaStkCallbackResponse } from "@/models/stk_callback_model";
import prisma from "../../../../prisma/client";
import nodemailer from "nodemailer";
import PaymentReceiptMail from "@/app/emails/payment_receipt";
import { render } from "@react-email/render";

const WEBHOOK_URL = process.env.SOCKET_GATEWAY_WEBHOOk_URL!;

const NODEMAIL_USER = process.env.NODEMAIL_USER;
const NODEMAIL_PASS = process.env.NODEMAIL_PASS;

function hidePhoneNumber(phoneNumber: string): string {
  // Extract the first five digits and the last digit of the phone number
  const prefix: string = phoneNumber.slice(0, 5);
  const suffix: string = phoneNumber.slice(-1);

  // Replace the middle digits with asterisks (*)
  const hiddenDigits = "******";

  // Combine the parts to form the hidden phone number
  const hiddenPhoneNumber = `${prefix}${hiddenDigits}${suffix}`;
  return hiddenPhoneNumber;
}

function calculateFutureDate(
  durationInDays: number,
  inputDate: Date | null
): Date {
  const currentDate = new Date();
  const inputDateTime = inputDate ? inputDate.getTime() : currentDate.getTime();
  const currentDateTime = currentDate.getTime();

  const targetDateTime =
    inputDateTime > currentDateTime ? inputDateTime : currentDateTime;
  const futureDateTime = targetDateTime + durationInDays * 24 * 60 * 60 * 1000;

  return new Date(futureDateTime);
}

export async function POST(
  request: Request,
  { params }: { params: { callbackId: string } }
) {
  const callbackId = params.callbackId;
  console.log("😊 Callback inititalied");
  console.log("callbackId🆔🪪🪪", callbackId);

  const callBackData = (await request.json()) as Map<string, unknown>;
  console.log("CallbackData");
  console.log(callBackData);

  const mpesaStkCallbackResponse =
    MpesaStkCallbackResponse.fromJSON(callBackData);
  console.log("😊 Callback Body deserialized");

  const paymentRequest = await prisma.mpesaPaymentRequest.findFirst({
    where: {
      id: callbackId,
    },
    select: {
      amount: true,
      cartId: true,
      type: true,
      subscriptionTierId: true,
      user: {
        select: {
          email: true,
          id: true,
        },
      },
    },
  });

  if (mpesaStkCallbackResponse.ResultCode !== 0) {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: paymentRequest?.user.id,
        userEmail: paymentRequest?.user.email,
        success: false,
      }),
    });
    return Response.json({ data: "ok" });
  }

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

  switch (paymentRequest?.type) {
    case "productPurchase":
      const order = await prisma.order.create({
        data: {
          ref: mpesaStkCallbackResponse.MpesaReceiptNumber,
          amount: mpesaStkCallbackResponse.Amount,
          user: {
            connect: {
              id: paymentRequest.user.id,
            },
          },
          product: {
            create: (
              await prisma.cart.findFirst({
                where: {
                  id: paymentRequest?.cartId!,
                },
                select: {
                  products: {
                    select: {
                      quantity: true,
                      productId: true,
                    },
                  },
                },
              })
            )?.products,
          },
        },
        select: {
          id: true,
          user: {
            select: {
              email: true,
              name: true,
              phoneNumber: true,
            },
          },
        },
      });

      //   Empty the cart
      await prisma.productToCart.deleteMany({
        where: {
          cartId: paymentRequest?.cartId!,
        },
      });
      // Send a webhook to the websocket server to notify the user of the purchase
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: paymentRequest?.user.id,
          userEmail: paymentRequest?.user.email,
          success: true,
        }),
      });

      const productEmailHtml = render(
        PaymentReceiptMail({
          itemPaidFor: "Product",
          mpesaRef: mpesaStkCallbackResponse.MpesaReceiptNumber!,
          paymentAmount: mpesaStkCallbackResponse.Amount!,
          phoneNumber: hidePhoneNumber(order.user.phoneNumber!),
          userName: order.user.name!,
        })
      );

      const productMailoptions = {
        from: NODEMAIL_USER,
        to: order.user.email!,
        subject: "Payment Successfull",
        text: `Hello ${order.user.name}, your payment was successful. Your order ref is ${mpesaStkCallbackResponse.MpesaReceiptNumber}`,
        html: productEmailHtml,
      };

      transporter
        .sendMail(productMailoptions)
        .then((info) => {
          console.log("😂😂Message sent: %s", info.messageId);
        })
        .catch((error) => {
          console.log("Error occurred", error);
        })
        .finally(() => {
          transporter.close();
        });

      console.log("😊 Success");
      return Response.json({ data: "ok" });
    case "subscriptionPayment":
      const subscription = await prisma.subscription.create({
        data: {
          ref: mpesaStkCallbackResponse.MpesaReceiptNumber,
          amountPaid: mpesaStkCallbackResponse.Amount,
          tier: {
            connect: {
              id: paymentRequest.subscriptionTierId!,
            },
          },
          user: {
            connect: {
              id: paymentRequest.user.id,
            },
          },
        },
        select: {
          user: {
            select: {
              subscriptionExpiry: true,
              email: true,
              name: true,
              phoneNumber: true,
            },
          },
          tier: {
            select: {
              duration: true,
            },
          },
        },
      });

      const newExpiryDate = calculateFutureDate(
        subscription.tier.duration,
        subscription.user.subscriptionExpiry
      );

      await prisma.user.update({
        where: {
          id: paymentRequest.user.id,
        },
        data: {
          subscriptionExpiry: newExpiryDate,
        },
      });
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: paymentRequest?.user.id,
          userEmail: paymentRequest?.user.email,
          success: true,
        }),
      });

      const subscriptionEmailHtml = render(
        PaymentReceiptMail({
          itemPaidFor: "Subscription",
          mpesaRef: mpesaStkCallbackResponse.MpesaReceiptNumber!,
          paymentAmount: mpesaStkCallbackResponse.Amount!,
          phoneNumber: hidePhoneNumber(subscription.user.phoneNumber!),
          userName: subscription.user.name!,
        })
      );

      const subscriptionMailoptions = {
        from: NODEMAIL_USER,
        to: subscription.user.email!,
        subject: "Payment Successfull",
        text: `Hello ${subscription.user.name}, your payment was successful. Your subsription payment ref is ${mpesaStkCallbackResponse.MpesaReceiptNumber}`,
        html: subscriptionEmailHtml,
      };

      transporter
        .sendMail(subscriptionMailoptions)
        .then((info) => {
          console.log("😂😂Message sent: %s", info.messageId);
        })
        .catch((error) => {
          console.log("Error occurred", error);
        })
        .finally(() => {
          transporter.close();
        });

      console.log("😊 Success");
      return Response.json({ data: "ok" });

    default:
      return Response.json({ data: "Error" });
  }
}
