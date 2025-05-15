import { executePublicApi } from "@/app/helpers/api-response";
import { sendIntroText } from "@/lib/twilio";
import { SubscribeRequest, SubscribeResponse } from "@/types/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = executePublicApi<
  SubscribeResponse,
  typeof SubscribeRequest
>(SubscribeRequest, async (_req, body) => {
  const { phone } = body;
  const numericPhone = parseInt(phone);

  try {
    // Check if the phone number already exists
    const existing = await prisma.subscriber.findUnique({
      where: { phone: numericPhone },
    });

    if (!existing) {
      // Only create a new subscriber if it doesn't exist
      await prisma.subscriber.create({
        data: { phone: numericPhone },
      });

      await sendIntroText(`+1${phone}`); // Ensure correct format!
    }
  } catch (err) {
    console.error("Subscription error:", err);
    return {
      success: false,
    };
  }

  return {
    success: true,
  };
});
