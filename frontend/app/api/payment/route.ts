import prisma from "../../../prisma/client";
import axios from "axios";
import { auth } from "@/auth";

const businessShortCode = process.env.MPESA_BUSINESS_SHORT_CODE;
const transactionType = process.env.MPESA_TRANSACTION_TYPE;
const mpesaCallbackBaseUrl = process.env.MPESA_CALLBACK_BASE_URL;
const passkey = process.env.MPESA_PASSKEY;
const stkPushUrl = process.env.MPESA_STK_PUSH_URL;
// Consumer Auth
const consumerKey = process.env.MPESA_CONSUMER_KEY;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
const safaricomAuthCredentialsUrl = process.env.MPESA_AUTH_URL;

const checkIfAccessTokenExpired = (expiryTime: Date): boolean => {
  if (expiryTime < new Date()) {
    return true;
  } else {
    return false;
  }
};

type GeneratePasswordDto = {
  businessShortCode: string;
  passkey: string;
  timestamp: string;
};

function convertDateToTimestamp(date: Date): string {
  console.log(date);
  const year = date.getFullYear().toString().padStart(4, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

const getAccessToken = async () => {
  let headers = new Headers();
  headers.append(
    "Authorization",
    `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`
  );
  const res = await fetch(safaricomAuthCredentialsUrl!, { headers });

  const response = await res.json();
  if (response["errorCode"]) {
    throw new Error(response["errorMessage"]);
  }
  const responseData: {
    accessToken: string;
    expiresIn: number;
  } = {
    accessToken: response.access_token,
    expiresIn: response.expires_in,
  };
  return responseData;
};

const getAccessTokenFromDb = async () => {
  const at = await prisma.mpesaAccessToken.findMany({
    orderBy: {
      expiresAt: "desc",
    },
    take: 1,
  });

  return at[0];
};

const generatePassword = (generatePasswordDto: GeneratePasswordDto): string => {
  console.log(generatePasswordDto);
  return Buffer.from(
    `${generatePasswordDto.businessShortCode}${generatePasswordDto.passkey}${generatePasswordDto.timestamp}`,
    "utf-8"
  ).toString("base64");
};

const getTokenExpiryTime = (expiresIn: number): Date => {
  return new Date(new Date().getTime() + expiresIn * 1000);
};

interface PostParams {
  cartId?: string;
  subscriptionTierId?: number;
  paymentType: "productPurchase" | "subscriptionPurchase";
}

type MpesaResponseBody = {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
};

export async function POST(req: Request) {
  const session = await auth();
  if (!session || !session.user) return Response.json("Not logged in");

  const data = (await req.json()) as PostParams;

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email!,
    },
    select: {
      phoneNumber: true,
      address: true,
      name: true,
      image: true,
    },
  });

  let payload;

  if (data.paymentType === "productPurchase") {
    // Handle this
    const hypotheticalPaymentAmount = await prisma.productToCart.aggregate({
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

    const mpesaPaymentRequest = await prisma.mpesaPaymentRequest.create({
      data: {
        amount: hypotheticalPaymentAmount._sum.quantity ?? 0,
        type: "productPurchase",
        cartId: data.cartId,
        user: {
          connect: {
            email: session.user.email!,
          },
        },
      },
      select: {
        amount: true,
        createdAt: true,
        cartId: true,
        id: true,
      },
    });

    // send payment to mpesa

    const timestamp = new Date();
    const userPhoneNumber = user?.phoneNumber?.substring(1);
    payload = {
      BusinessShortCode: businessShortCode,
      Password: generatePassword({
        timestamp: convertDateToTimestamp(timestamp),
        businessShortCode: businessShortCode!,
        passkey: passkey!,
      }),
      Timestamp: convertDateToTimestamp(timestamp),
      TransactionType: transactionType,
      Amount: hypotheticalPaymentAmount._sum.quantity ?? 1,
      PartyA: userPhoneNumber,
      PartyB: businessShortCode,
      PhoneNumber: userPhoneNumber,
      CallBackURL: `${mpesaCallbackBaseUrl}/${mpesaPaymentRequest.id}`,
      AccountReference: "Test",
      TransactionDesc: "Test",
    };
    console.log(mpesaPaymentRequest.id);
  } else if (data.paymentType === "subscriptionPurchase") {
    // Handle
    const hypotheticalPaymentAmount = data.subscriptionTierId;

    const mpesaPaymentRequest = await prisma.mpesaPaymentRequest.create({
      data: {
        amount: Number(hypotheticalPaymentAmount ?? 1),
        subscriptionTierId: hypotheticalPaymentAmount,
        type: "subscriptionPayment",
        user: {
          connect: {
            email: session.user.email!,
          },
        },
      },
      select: {
        amount: true,
        createdAt: true,
        id: true,
      },
    });
    const userPhoneNumber = user?.phoneNumber?.substring(1);
    const timestamp = new Date();
    payload = {
      BusinessShortCode: businessShortCode,
      Password: generatePassword({
        timestamp: convertDateToTimestamp(timestamp),
        businessShortCode: businessShortCode!,
        passkey: passkey!,
      }),
      Timestamp: convertDateToTimestamp(timestamp),
      TransactionType: transactionType,
      Amount: Number(hypotheticalPaymentAmount ?? 1) ?? 1,
      PartyA: userPhoneNumber,
      PartyB: businessShortCode,
      PhoneNumber: userPhoneNumber,
      CallBackURL: `${mpesaCallbackBaseUrl}/${mpesaPaymentRequest.id}`,
      AccountReference: "Test",
      TransactionDesc: "Test",
    };
    console.log(mpesaPaymentRequest.id);
  }

  let at: string;
  try {
    console.log("trying to get access token🥷🥷");
    const accessToken = await getAccessTokenFromDb();
    if (!accessToken || checkIfAccessTokenExpired(accessToken.expiresAt)) {
      const authToken = await getAccessToken();
      await prisma.mpesaAccessToken.create({
        data: {
          accessToken: authToken.accessToken,
          expiresAt: getTokenExpiryTime(authToken.expiresIn),
        },
      });
      console.log("access token🔑🔐🗝️", authToken);
      at = authToken.accessToken;
    } else {
      at = accessToken.accessToken;
    }

    console.log("sending payment request to mpesa📞📞");
    console.log(payload);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${at}`);

    const res = await fetch(stkPushUrl!, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    console.log("📞📞");

    const response = await res.json();
    console.log("response from mpesa📞📞", response);

    if (response.ResponseCode === "0") {
      const res = {
        message: "Payment request sent successfully",
        data: response as MpesaResponseBody,
        sent: true,
      };
      console.log("Payment request sent successfully🥳🥳🥳");
      return Response.json(res);
    } else {
      const res = {
        message: "Payment request not sent",
        data: null,
        sent: false,
      };
      console.log("Payment request not sent.📩📩😟😟😔");
      return Response.json(res);
    }
  } catch (error) {
    console.log("Payment request not sent. There is a caught error😟😟😔");
    console.log(error);
    const res = {
      message: "Payment request not sent",
      data: null,
      sent: false,
    };
    return Response.json(res);
  }
}
