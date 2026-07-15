import IssueBadge from "@/app/components/IssueBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";

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
        <Heading as="h2">{issueFound.title}</Heading>

        <Flex gap={"3"}>
          <IssueBadge status={issueFound.status} />
          <Text>{issueFound.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt={"4"}>
          <Markdown>{issueFound.description}</Markdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issueFound.id}/edit`}>Edit issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
