import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const createIssueZodSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(1),
});
export async function POST(res: NextRequest) {
  const body = await res.json();
  const validation = createIssueZodSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const createdIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(createdIssue, { status: 201 });
}
