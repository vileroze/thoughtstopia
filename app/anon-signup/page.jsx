"use client";

import { PageWrapper } from "@components/page-wrapper";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AnonSingup = () => {
  const [submitting, setSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  useEffect(() => {
    if (session?.user) {
      return router.push("/");
    }
  }, [session?.user]);

  const handleSignup = async (e) => {
    e.preventDefault();

    setErrMsg("");

    setSubmitting(true);

    try {
      const response = await fetch("api/auth/anon", {
        method: "POST",
        body: JSON.stringify({
          email: "anonuser." + generateRandomString(4) + "@ponderland.guava",
          username: username,
          password: password,
          // authType: 'signup'
        }),
      });

      if (response.ok) {
        signIn("credentials", {
          username: username,
          password: password,
          callbackUrl: `${window.location.origin}/`,
        });
      } else if (response.status == 409) {
        setErrMsg("Username already exists");
      }
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <PageWrapper>
      <div className="max-w-[280px] mx-auto">
        <div className="flex flex-col items-center mt-[10vh]">
          <h2 className="mb-5 text-gray-900 font-mono font-bold text-xl">
            Sign up
          </h2>
          <div className="signup-err text-[#c2421a]">{errMsg}</div>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
              name="username"
              placeholder="username"
              onChange={handleUsernameChange}
              value={username}
              required
            />
            <input
              type="password"
              className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
              name="password"
              placeholder="password"
              onChange={handlePasswordChange}
              value={password}
              required
            />
            <button className="black_btn w-full" disabled={submitting}>
              {submitting ? `Signing up...` : "Singnup"}
            </button>
          </form>
          <p className="text-center mt-3 text-[14px]">
            By clicking continue, you agree to our{" "}
            <Link href={"/terms-and-condition"} className="text-gray-600">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href={"/privacy-policy"} className="text-gray-600">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AnonSingup;
