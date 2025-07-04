import { prisma } from "@/lib/prisma";
import { executePublicApi } from "@/app/helpers/api-response";
import { GetEventsRequest, GetEventsResponse } from "@/types/schema";

export const POST = executePublicApi<
  GetEventsResponse,
  typeof GetEventsRequest
>(GetEventsRequest, async (req, body) => {
  const { live, archive } = body;

  const events = await prisma.events.findMany({
    where: {
      live,
      archive,
    },
    orderBy: { startTime: "desc" },
  });

  return { events };
});
