import { z, ZodType } from "zod";

export const SubscribeRequest = z.object({
    phone: z.string()
});

export interface SubscribeResponse {
    success: boolean;
}