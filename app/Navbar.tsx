"use client";

import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

const Navbar = () => {
  const { status, data: session } = useSession();
  const currentPath = usePathname();
  const navItem = [
    {
      id: 1,
      href: "/",
      name: "Dashboard",
    },
    {
      id: 2,
      href: "/issues",
      name: "Issues",
    },
  ];
  // console.log("status", status);
  return (
    <nav className="p-5 border-b mb-4">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link className="" href={"/"}>
              {/* logo */}
              <FaBug className="align-center" size={16} />
            </Link>
            <ul className="flex list-none gap-4 p-5">
              {navItem.map((item) => (
                <li
                  className={classnames({
                    "text-zinc-500 ": currentPath != item.href,
                    "text-zinc-900 ": currentPath == item.href,
                    "hover:text-zinc-800 transition-colors": true,
                  })}
                  key={item.id}
                >
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "loading" && (
              <Link href={"/api/auth/signin"}>Login</Link>
            )}
            {status === "authenticated" && (
              <Link href={"/api/auth/signout"}> Logout</Link>
            )}
            {status === "unauthenticated" && (
              <Link href={"/api/auth/signin"}> Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
