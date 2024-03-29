"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "../AppContext";
const Header = () => {
  const session = useSession();
  const userData = session?.data?.user;
  let userName = userData?.name || userData?.email;
  const status = session?.status;
  const { cartProducts } = useContext(CartContext);
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
          <Link href={`/menu`}>Menu</Link>
          <Link href={`/#about`}>About</Link>
          <Link href={`/#contact`}>Contact</Link>
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
          <Link href={"/cart"}>Cart ({cartProducts.length})</Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
