import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa";

const Navbar = () => {
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
  return (
    <nav className="flex gap-4 p-4 border-b mb-4 items-center">
      <Link className="" href={"/"}>
        {/* logo */}
        <FaBug className="align-center" size={16} />
      </Link>
      <ul className="flex list-none gap-4 p-4">
        {navItem.map((item) => (
          <li
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
            key={item.id}
          >
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
