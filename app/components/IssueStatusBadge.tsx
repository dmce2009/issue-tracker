import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const badgeMapping: Record<
  Status,
  { label: string; color: "red" | "green" | "orange" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In progress", color: "orange" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={badgeMapping[status].color}>
      {badgeMapping[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
