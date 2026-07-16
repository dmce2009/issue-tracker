"use client";
import dynamic from "next/dynamic";
import React from "react";
import IssueFormSkeleton from "./IssueFormSkeleton";
import { Issue } from "@prisma/client";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const IssueFormClientWrapper = ({ issue }: { issue: Issue }) => {
  return <IssueForm issue={issue}></IssueForm>;
};

export default IssueFormClientWrapper;
