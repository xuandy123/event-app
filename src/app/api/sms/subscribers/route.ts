import { executeApi } from "@/app/helpers/api-response";
import { SmsSubscriberRequest, SmsSubscriberResponse } from "@/types/schema";
import twilio from "twilio";
import { prisma } from "@/lib/prisma"; // adjust path if needed

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

// Define the admin-only phone numbers (without +1, assuming DB values match)
const ADMIN_PHONE_NUMBERS = ["7736989991", "4083148624"];

export const POST = executeApi<
  SmsSubscriberResponse,
  typeof SmsSubscriberRequest
>(SmsSubscriberRequest, async (_req, body) => {
  const { message, adminOnly } = body;

  // Fetch all subscribers from Prisma
  const subscribers = await prisma.subscriber.findMany({
    select: { phone: true },
  });

  // Filter if adminOnly is true
  if (adminOnly) {
    for (const phone of ADMIN_PHONE_NUMBERS) {
      try {
        await client.messages.create({
          to: `+1${phone}`,
          from: process.env.TWILIO_TOLL_FREE_NUMBER,
          body: message,
        });
      } catch (err) {
        console.error(`Failed to send to admin ${phone}:`, err);
      }
    }

    return { success: true };
  }

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

  const failed = results.filter((r) => r.status === "rejected");

  return { success: failed.length === 0 };
});
