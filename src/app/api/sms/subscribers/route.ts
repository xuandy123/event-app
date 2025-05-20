import { executeApi } from "@/app/helpers/api-response";
import { SmsSubscriberRequest, SmsSubscriberResponse } from "@/types/schema";
import twilio from "twilio";
import { prisma } from "@/lib/prisma"; // adjust path if needed

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

console.log("ACCOUNT", process.env.TWILIO_ACCOUNT_SID);
console.log("AUTH TOKEN", process.env.TWILIO_AUTH_TOKEN);


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
  const results = await Promise.allSettled(
    subscribers.map(async ({ phone }) => {
      try {
        await client.messages.create({
          to: `+1${phone}`,
          from: process.env.TWILIO_TOLL_FREE_NUMBER,
          body: message,
        });
      } catch (err) {
        console.error(`Failed to send to ${phone}:`, err);
      }
    }),
  );

  // Optional: collect failed sends
  const failed = results.filter(r => r.status === "rejected");

  return { success: failed.length === 0 };
});
