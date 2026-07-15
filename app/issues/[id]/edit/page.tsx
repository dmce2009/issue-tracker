import React from "react";
import IssueForm from "../../_components/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}
const IssueEditpage = async ({ params }: Props) => {
  const resultParams = await params;

  const issueId = Number(resultParams.id);
  if (Number.isNaN(issueId)) notFound();

  const issueFound = await prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  });

  if (!issueFound) notFound();
  return <IssueForm issue={issueFound}></IssueForm>;
};

export default IssueEditpage;
