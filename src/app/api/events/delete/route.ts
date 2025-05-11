// app/api/events/delete/route.ts
import { prisma } from "@/lib/prisma";
import { executeApi } from "@/app/helpers/api-response";
import { DeleteEventRequest, DeleteEventResponse } from "@/types/schema";

export const DELETE = executeApi<
  DeleteEventResponse,
  typeof DeleteEventRequest
>(DeleteEventRequest, async (_req, body) => {
  await prisma.events.delete({
    where: { id: body.id },
  });

  return { success: true };
});
