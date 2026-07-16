import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueFormClientWrapper from "../../_components/IssueFormClientWrapper";
// import IssueForm from "@/app/issues/_components/IssueForm";

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
  return <IssueFormClientWrapper issue={issueFound}></IssueFormClientWrapper>;
};

export default IssueEditpage;
