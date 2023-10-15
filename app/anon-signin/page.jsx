"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


const AnonSingin = () => {
  const [submitting, setSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const router = useRouter();
  const {data:session} = useSession();

  const handleSignin = async (e) => {
    e.preventDefault();

    setErrMsg('');

    setSubmitting(true);

    try {

      const result = await signIn('credentials', { username: username, password: password, redirect: false });

      if (result.error) {
        setErrMsg('Invalid credentials provided');
      } else {
        router.push('/');
      }

    } catch (error) {
      setErrMsg(error);
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

  useEffect(() => {
    if (session?.user) {
      return router.push('/');
    }
  }, [session?.user]);

  return (
    <div className="max-w-[280px] mx-auto">
      <div className="flex flex-col items-center mt-[10vh]">
        <h2 className="mb-5 text-gray-900 font-mono font-bold text-xl">
          Log In
        </h2>
        <button className="flex items-center mb-2 justify-center transition ease-in-out delay-50 px-3 py-2.5 space-x-2 bg-white border border-slate-600 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 focus:ring-opacity-50">
          <Image
            alt="Google logo"
            src={"/assets/images/google.svg"}
            width={25}
            height={25}
          />
          <span
            className="text-gray-700 font-medium"
            onClick={() => signIn("google")}
          >
            Continue with Google
          </span>
        </button>
        <span className="mb-2 text-gray-900">Or</span>
        
        <div className="signup-err text-[#c2421a]">{errMsg}</div>
        
        <form onSubmit={handleSignin}>
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
            {submitting ? `Logging in...` : "Login"}
          </button>
        </form>
        <p className="text-center mt-3 text-[14px]">
          Don&#x27;t have an account?
          <a href="/signup" className="text-gray-600">
            Create one
          </a>
        </p>
        <p className="text-center mt-3 text-[14px]">
          By clicking continue, you agree to our
          <a href="/terms" className="text-gray-600">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-gray-600">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default AnonSingin;
