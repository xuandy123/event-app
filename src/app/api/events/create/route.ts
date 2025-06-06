// app/api/events/route.ts
import { prisma } from "@/lib/prisma";
import { executeApi } from "@/app/helpers/api-response";
import { z } from "zod";
import { CreateEventResponse } from "@/types/schema";

const UpsertEventRequest = z.object({
  id: z.string().optional(), // Optional ID for updates
  name: z.string(),
  slug: z.string(),
  url: z.string().optional(),
  info: z.string(),
  headerImage: z.array(z.string()),
  startTime: z.string(),
  endTime: z.string(),
  where: z.string(),
  price: z.string(),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  facebook: z.string().optional(),
  details: z.string(),
  expect: z.any(), // Consider tightening this schema
  featured: z.boolean(),
  venue: z.string(),
});

export const POST = executeApi<CreateEventResponse, typeof UpsertEventRequest>(
  UpsertEventRequest,
  async (_req, body) => {
    const data = {
      name: body.name,
      slug: body.slug,
      url: body.url ?? null,
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
      featured: body.featured,
      venue: body.venue,
    };

    let event;

    if (body.id) {
      event = await prisma.events.update({
        where: { id: body.id },
        data,
      });
    } else {
      event = await prisma.events.create({
        data,
      });
    }

    return {
      success: true,
      eventId: event.id,
    };
  },
);
