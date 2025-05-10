import { executePublicApi } from "@/app/helpers/api-response";
import { SignUpRequest, SignUpResponse } from "@/types/schema";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const saltRounds = 10; // Recommended rounds for bcrypt

export const POST = executePublicApi<SignUpResponse, typeof SignUpRequest>(
  SignUpRequest,
  async (req, body) => {
    const { email, password } = body;
    if (!email || !password) {
      throw new Error("Missing email and/or password.");
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error(`Existing user already exists with email "${email}".`);
    }

    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
    };
  },
);
