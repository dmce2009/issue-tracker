"use client";

import React, { ReactNode } from "react";
import NextLink from "next/link";
import { Link as RadisUiLink } from "@radix-ui/themes";

interface Props {
  href: string;
  children: ReactNode;
}

const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadisUiLink>{children}</RadisUiLink>
    </NextLink>
  );
};

export default Link;
