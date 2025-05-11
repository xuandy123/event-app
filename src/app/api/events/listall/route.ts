import { prisma } from "@/lib/prisma";
import { executeApi } from "@/app/helpers/api-response";
import { GetEventsRequest, GetEventsResponse } from "@/types/schema";

export const POST = executeApi<GetEventsResponse, typeof GetEventsRequest>(
  GetEventsRequest, // Request validation schema
  async () => {
    // Fetch events from the database
    const events = await prisma.events.findMany({
      orderBy: { startTime: "asc" }, // Optional: sort by start time (ascending)
    });

    // Return the events or an empty array if no events are found
    return { events };
  },
);
