"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";


const Nav = () => {
  // const isUserLoggedIn = true;
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo_10.png"}
          alt="Thoughtstopia Logo"
          width={50}
          height={50}
          className="object-contain"
        />
      </Link>

      {/* For larger devices */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/share-thought"} className="black_btn">
              Share Thought
            </Link>

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="outline_btn"
            >
              Signout
            </button>

            <Link href={"/profile?uid=" + session?.user.id}>
              <Image
                alt="profile logo"
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {/* {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  {provider.name}
                </button>
              ))} */}
            <button type="button" className="black_btn ml-3" key="anon" onClick={()=>{router.push('/anon-signin')}}>
              Sign in
            </button>

            <button type="button" className="black_btn ml-3" key="signup" onClick={()=>{router.push('/anon-signup')}}>
              Sign up
            </button>
          </>
        )}
      </div>

      {/* For mobile devices */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                {/* profile link */}
                <Link
                  href={"/profile?uid=" + session?.user.id}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My profile
                </Link>

                {/* Share a Thought link */}
                <Link
                  href={"/share-thought"}
                  className="dropdown_link"
                  f
                  onClick={() => setToggleDropdown(false)}
                >
                  Share a Thought
                </Link>

                {/* signout button */}
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="outline_btn"
                >
                  Signout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Google
                </button>
              ))}

            <button type="button" className="black_btn" key="anon" onClick={()=>{router.push('/anon-signin')}}>
              Anonymous
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
