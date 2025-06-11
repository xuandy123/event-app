import { prisma } from "@/lib/prisma";
import { executePublicApi } from "@/app/helpers/api-response";
import { GetEventsAdminRequest, GetEventsResponse } from "@/types/schema";

export const POST = executePublicApi<
  GetEventsResponse,
  typeof GetEventsAdminRequest
>(GetEventsAdminRequest, async () => {
  const events = await prisma.events.findMany({
    where: {
      live: true,
      archive: false,
    },
    orderBy: { startTime: "desc" },
  });

  return { events };
});
