import { APP_NAME } from "@/app/constants";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!,
);

export const sendIntroText = async (phone: string) => {
  try {
    await client.messages.create({
      body: `🎉Welcome to ${APP_NAME}🎉`,
      from: process.env.TWILIO_TOLL_FREE_NUMBER, // Your Twilio number
      to: phone, // E.164 format, e.g., +14083148624
    });
  } catch (error) {
    console.error("Twilio error:", error);
    throw error; // Optionally rethrow for higher-level error handling
  }
};
