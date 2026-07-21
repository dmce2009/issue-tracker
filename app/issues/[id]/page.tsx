import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box>
        <IssueDetails issue={issueFound} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={issueFound.id} />
          <DeleteIssueButton issueId={issueFound.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
