import { executePublicApi } from "@/app/helpers/api-response";
import { z } from "zod";
import { GetEventResponse } from "@/types/schema";
import { prisma } from "@/lib/prisma";

// Define the request schema with `slug` instead of `id`
const GetEventBySlugRequest = z.object({
  slug: z.string(),
});

export const POST = executePublicApi<
  GetEventResponse,
  typeof GetEventBySlugRequest
>(GetEventBySlugRequest, async (_req, body) => {
  const { slug } = body;
  const event = await prisma.events.findFirst({
    where: {
      slug,
    },
  });

  if (!event) {
    throw new Error("Event not found.");
  }

  return { event };
});
