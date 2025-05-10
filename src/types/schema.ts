import { z } from "zod";

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
