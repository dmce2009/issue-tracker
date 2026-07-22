// import authOptions from "@/app/auth/authOptions";
import authOptions from "@/app/auth/authOptions";
import { issueSchema, patchIssueSchema } from "@/app/ValidationSchema";
import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { getServerSession } from "next-auth";
// import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });

  const awaited_params = await params;
  const body = await request.json().catch((error) => {
    console.error(error);
    // return NextResponse.json("Request body not in proper format", {
    //   status: 400,
    // });
  });
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });

  const { title, description, assignedToUserId } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) return NextResponse.json("User Id not found", { status: 400 });
  }

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
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const awaited_params = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(awaited_params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}
