// import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/app/ValidationSchema";
import prisma from "@/prisma/client";
// import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const awaited_params = await params;
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });

  const { title, description } = body;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(awaited_params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
    },
  });

  return NextResponse.json(updatedIssue);
}
