import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z, ZodType } from "zod";
import { User } from "@prisma/client";

export type ApiResponse<Res> =
  | {
      type: "error";
      message: string;
    }
  | {
      type: "success";
      data: Res;
    };

export const executePublicApi =
  <Res, Req extends ZodType>(
    schema: Req,
    handler: (req: Request, body: z.infer<Req>) => Promise<Res>,
  ) =>
  async (req: Request) => {
    try {
      const payload = await req.json();
      const parsed = schema.parse(payload);
      const data = await handler(req, parsed);
      return NextResponse.json({
        type: "success",
        data: data,
      });
    } catch (err) {
      return NextResponse.json(
        { type: "error", message: (err as Error).message },
        {
          status: 500,
        },
      );
    }
  };

export const executeApi =
  <Res, Req extends ZodType>(
    schema: Req,
    handler: (req: Request, body: z.infer<Req>, user: User) => Promise<Res>,
  ) =>
  async (req: Request) => {
    try {
      const session = await auth(); // Check authentication
      if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email as string,
        },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found." }, { status: 404 });
      }

      const payload = await req.json();
      const parsed = schema.parse(payload);
      const data = await handler(req, parsed, user);
      return NextResponse.json({
        type: "success",
        data: data,
      });
    } catch (err) {
      return NextResponse.json(
        { type: "error", message: (err as Error).message },
        {
          status: 500,
        },
      );
    }
  };
