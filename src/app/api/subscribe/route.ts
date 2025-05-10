import { executePublicApi } from "@/app/helpers/api-response";
import { sendIntroText } from "@/lib/twilio";
import { SubscribeRequest, SubscribeResponse } from "@/types/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const POST = executePublicApi<
  SubscribeResponse,
  typeof SubscribeRequest
>(SubscribeRequest, async (req, body) => {
  const { phone } = body;
  try {
    await prisma.subscriber.create({
      data: {
        phone: parseInt(phone),
      },
    });

    const fakephone = "18777804236";
    await sendIntroText(`+1${fakephone}`); // Ensure correct format!
  } catch (err) {
    console.log(err);
    return {
      success: false,
    };
  }
  return {
    success: true,
  };
});
