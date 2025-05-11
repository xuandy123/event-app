import { z } from "zod";
import { Events } from "@prisma/client";

export const SubscribeRequest = z.object({
  phone: z.string(),
});

export interface SubscribeResponse {
  success: boolean;
}

export const SignUpRequest = z.object({
  email: z.string(),
  password: z.string(),
});

export interface SignUpResponse {
  success: boolean;
}

export const CreateEventRequest = z.object({
  name: z.string().min(1),
  info: z.string().min(1),
  headerImage: z.array(z.string().url()),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  where: z.string().min(1),
  price: z.string().min(1),
  tiktok: z.string().url().optional().or(z.literal("")),
  facebook: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  details: z.string().min(1),
  expect: z.any(), // You can replace with a stricter shape if needed
});

// Event response interface
export interface CreateEventResponse {
  success: boolean;
  eventId?: string;
}

export const GetEventsRequest = z.object({});

export type GetEventsResponse = {
  events: Events[];
};
