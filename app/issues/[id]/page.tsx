import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

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
    <Grid columns={{ initial: "1", md: "2" }} gap={"4"}>
      <Box>
        <IssueDetails issue={issueFound} />
      </Box>
      <Box>
        <EditIssueButton issueId={issueFound.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
