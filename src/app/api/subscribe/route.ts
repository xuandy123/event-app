import { executePublicApi } from "@/app/helpers/api-response";
import { SubscribeRequest, SubscribeResponse } from "@/types/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const POST = executePublicApi<
  SubscribeResponse,
  typeof SubscribeRequest
>(SubscribeRequest, async (req, body) => {
  const { phone } = body;
  try {
    await prisma.user.create({
      data: {
        phone: parseInt(phone), 
      },
    });
  } catch (err) {
    return {
      success: false
    }
  }
  return {
    success: true,
  };
});
