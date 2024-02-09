"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const UserTabs = ({ isAdmin }) => {
  const path = usePathname();
  return (
    <div className="flex gap-2 tabs justify-center">
      <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            className={path === "/categories" ? "active" : ""}
            href="/categories"
          >
            Categories
          </Link>
          <Link
            className={path === "/menu-items" ? "active" : ""}
            href={"/menu-items"}
          >
            Items
          </Link>
          <Link className={path === "/admins" ? "active" : ""} href="/admins">
            Users
          </Link>
        </>
      )}
    </div>
  );
};

export default UserTabs;
