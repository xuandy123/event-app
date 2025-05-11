import { executePublicApi } from "@/app/helpers/api-response";
import { GetEventRequest, GetEventResponse } from "@/types/schema";

import { prisma } from "@/lib/prisma";

export const POST = executePublicApi<GetEventResponse, typeof GetEventRequest>(
  GetEventRequest,
  async (req, body) => {
    const { id } = body;
    const event = await prisma.events.findFirst({
      where: {
        id,
      },
    });

    if (!event) {
      throw new Error("Speech not found or does not belong to the user.");
    }

    return { event };
  },
);
