"use client";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
const Header = () => {
  const session = useSession();
  const userData = session?.data?.user;
  let userName = userData?.name || userData?.email;
  const status = session?.status;

  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <>
      <header className="flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href="/">
            ST PIZZA
          </Link>
          <Link href={`/`}>Home</Link>
          <Link href={``}>Menu</Link>
          <Link href={``}>About</Link>
          <Link href={``}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          {status === "authenticated" && (
            <>
              <Link href="/profile" className="whitespace-nowrap">
                Hello, {userName}
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-primary text-white px-8 py-2 rounded-full"
              >
                Logout
              </button>
            </>
          )}
          {status !== "authenticated" && (
            <>
              <Link href={"/login"}>Login</Link>
              <Link
                href={`/register`}
                className="bg-primary text-white px-8 py-2 rounded-full"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;