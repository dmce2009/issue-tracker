import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const Issuespage = () => {
  return (
    <div>
      <Button>
        <Link href={"/issues/new"}>Create issue</Link>
      </Button>
    </div>
  );
};

export default Issuespage;
