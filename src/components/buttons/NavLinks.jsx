"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = ({ href, children }) => {
  const path = usePathname();
  return (
    <Link
      className={`${path.startsWith(href) && "text-orange-500"} font-medium`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLinks;
