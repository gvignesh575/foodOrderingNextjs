"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  const handleFormSubmit = async (e) => {
    setError(false);
    e.preventDefault();
    setCreatingUser(true);
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      setCreatingUser(false);
      setError(true);
    }
    if (response.ok) {
      setCreatingUser(false);
      setUserCreated(true);
      setError(false);
    }
  };

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User created. Now you can <Link href="/login">Login &raquo;</Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center text-red-500">
          Error! Please try again later.....
        </div>
      )}
      <form
        action=""
        className="block max-w-sm mx-auto"
        onSubmit={handleFormSubmit}
      >
        <input
          type="email"
          placeholder="email"
          value={email}
          disabled={creatingUser}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          disabled={creatingUser}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={creatingUser} type="submit">
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          type="button"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/",
            })
          }
          className="flex gap-4 justify-center items-center"
        >
          <Image src="/google.png" alt={""} width={24} height={24} />
          Login with google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link className="underline" href="/login">
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
