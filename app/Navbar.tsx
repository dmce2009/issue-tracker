import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex gap-4 p-4">
      <Link className="" href={"/"}>
        <FaBug size={16} />
      </Link>
      <ul className="flex list-none gap-4 p-4">
        <li>
          <Link href={"/"}>Dashboard</Link>
        </li>
        <li>
          <Link href={"/issues"}>Issues</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
