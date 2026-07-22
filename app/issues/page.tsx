import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
// import Link from "next/link";
import { IssueActions, IssueStatusBadge } from "../components";
import Link from "../components/Link";
import { Status } from "@prisma/client";

const Issuespage = async ({
  searchParams,
}: {
  searchParams: { status: Status };
}) => {
  const { status } = await searchParams;
  const issueList = await prisma.issue.findMany({
    where: {
      status: status,
    },
  });

  return (
    <>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Id
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created by
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issueList.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell className="hidden md:table-cell">
                {issue.id}
              </Table.Cell>
              <Table.Cell>
                <Link href={"/issues/" + issue.id}>{issue.title}</Link>

                <div className="block md:hidden">
                  {" "}
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};
export const dynamic = "force-dynamic";

export default Issuespage;
