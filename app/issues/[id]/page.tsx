import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const resultParams = await params;
  const issueId = Number(resultParams.id);
  if (Number.isNaN(issueId)) notFound();

  const issueFound = await prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  });

  if (!issueFound) notFound();
  return (
    <div>
      <p>{issueFound.id}</p>
      <p>{issueFound.title}</p>
      <p>{issueFound.description}</p>
      <p>{issueFound.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
