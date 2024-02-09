"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  // const router = useRouter();
  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoggingIn(true);
    const res = await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/",
    });
    console.log(res);
    if (res.error) {
      setLoggingIn(false);
      return;
    }
    // router.replace("/");
    setLoggingIn(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          name="email"
          disabled={loggingIn}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          disabled={loggingIn}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loggingIn}>
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          type="button"
          className="flex gap-4 justify-center items-center"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/",
            })
          }
        >
          <Image src="/google.png" alt={""} width={24} height={24} />
          Login with google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Dont Have an account?{" "}
          <Link className="underline" href="/register">
            Register here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
