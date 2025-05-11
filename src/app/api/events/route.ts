// app/api/events/route.ts
import { prisma } from "@/lib/prisma";
import { executeApi } from "@/app/helpers/api-response";
import { CreateEventRequest, CreateEventResponse } from "@/types/schema";

export const POST = executeApi<CreateEventResponse, typeof CreateEventRequest>(
  CreateEventRequest,
  async (_req, body) => {
    const event = await prisma.events.create({
      data: {
        name: body.name,
        info: body.info,
        headerImage: body.headerImage,
        startTime: body.startTime,
        endTime: body.endTime,
        where: body.where,
        price: body.price,
        instagram: body.instagram,
        tiktok: body.tiktok,
        facebook: body.facebook,
        details: body.details,
        expect: body.expect,
      },
    });

    return {
      success: true,
      eventId: event.id,
    };
  },
);
