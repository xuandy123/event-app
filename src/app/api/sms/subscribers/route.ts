import { executeApi } from "@/app/helpers/api-response";
import { SmsSubscriberRequest, SmsSubscriberResponse } from "@/types/schema";
import twilio from "twilio";
import { prisma } from "@/lib/prisma"; // adjust path if needed

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

export const POST = executeApi<
  SmsSubscriberResponse,
  typeof SmsSubscriberRequest
>(SmsSubscriberRequest, async (_req, body) => {
  const { message } = body;

  // Fetch all subscribers from Prisma
  const subscribers = await prisma.subscriber.findMany({
    select: { phone: true },
  });

  // Send message to each subscriber
  await Promise.all(
    subscribers.map(({ phone }) =>
      client.messages.create({
        to: `+1${phone}`,
        from: process.env.TWILIO_TOLL_FREE_NUMBER,
        body: message,
      }),
    ),
  );

  return { success: true };
});
