import IssueBadge from "@/app/components/IssueBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import Markdown from "react-markdown";

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
      <Heading as="h2">{issueFound.title}</Heading>

      <Flex gap={"3"}>
        <IssueBadge status={issueFound.status} />
        <Text>{issueFound.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt={"4"}>
        <Markdown>{issueFound.description}</Markdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
